/**
 * Dual-Mode Web Audio & Media Stream Engine.
 * Supports HTML5 streaming Audio with sub-millisecond timer gating,
 * AudioContext spectrum analysis, and strict original audio playback.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  // HTML5 Audio element for streaming (immune to CORS arrayBuffer restrictions)
  private audioElement: HTMLAudioElement | null = null;
  private mediaSourceNode: MediaElementAudioSourceNode | null = null;

  // Web Audio buffer cache
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private currentBufferSource: AudioBufferSourceNode | null = null;

  private isPlaying: boolean = false;
  private playStartTime: number = 0;
  private activeDuration: number = 0;
  private animationFrameId: number | null = null;
  private stopTimeoutId: number | null = null;

  private onProgressCallback: ((currentSec: number, totalSec: number, ratio: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.crossOrigin = 'anonymous';

      try {
        if (this.ctx && this.masterGain && !this.mediaSourceNode) {
          this.mediaSourceNode = this.ctx.createMediaElementSource(this.audioElement);
          this.mediaSourceNode.connect(this.masterGain);
        }
      } catch {
        // Media element routing fallback
      }
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = Math.max(0, Math.min(1, val));
    }
  }

  /**
   * Pre-load an audio URL and verify it can be played.
   * Throws an error if the URL is dead/404 so GameContext can seamlessly switch tracks.
   */
  public async loadAudio(url: string): Promise<void> {
    this.init();
    if (!url || !url.startsWith('http')) {
      throw new Error('Invalid audio URL');
    }

    if (this.bufferCache.has(url)) return;

    // Try Web Audio buffer prefetch
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx!.decodeAudioData(arrayBuffer);
      this.bufferCache.set(url, audioBuffer);
      return;
    } catch {
      // If Web Audio fetch has CORS, verify using HTML5 Audio element
      return new Promise<void>((resolve, reject) => {
        const testAudio = new Audio();
        testAudio.preload = 'auto';
        testAudio.crossOrigin = 'anonymous';
        testAudio.src = url;

        const onCanPlay = () => {
          cleanup();
          resolve();
        };

        const onError = () => {
          cleanup();
          reject(new Error(`Failed to load audio stream from ${url}`));
        };

        const cleanup = () => {
          testAudio.removeEventListener('canplaythrough', onCanPlay);
          testAudio.removeEventListener('loadeddata', onCanPlay);
          testAudio.removeEventListener('error', onError);
        };

        testAudio.addEventListener('canplaythrough', onCanPlay, { once: true });
        testAudio.addEventListener('loadeddata', onCanPlay, { once: true });
        testAudio.addEventListener('error', onError, { once: true });

        testAudio.load();

        // 3-second timeout guard
        setTimeout(() => {
          cleanup();
          resolve(); // Resolve on timeout to not block UI if slow connection
        }, 3000);
      });
    }
  }

  /**
   * Play snippet of specified duration (e.g. 0.1s, 0.5s, 1.5s, 3.0s, 8.0s)
   * Strictly plays the original song audio preview.
   */
  public async playSnippet(
    url: string,
    duration: number,
    offsetSeconds: number = 0,
    onProgress?: (currentSec: number, totalSec: number, ratio: number) => void,
    onEnded?: () => void
  ) {
    this.init();
    this.stop();

    this.onProgressCallback = onProgress || null;
    this.onEndedCallback = onEnded || null;
    this.activeDuration = duration;

    // Check if we have decoded AudioBuffer
    const buffer = this.bufferCache.get(url);
    if (buffer) {
      this.playViaAudioBuffer(buffer, duration, offsetSeconds);
      return;
    }

    // Play via HTML5 Audio streaming element directly
    if (url && url.startsWith('http')) {
      try {
        const audio = this.audioElement || new Audio();
        this.audioElement = audio;

        if (audio.src !== url) {
          audio.src = url;
        }

        audio.currentTime = offsetSeconds;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        this.isPlaying = true;
        this.playStartTime = performance.now();
        this.trackProgress();

        // High-precision stop timer
        this.stopTimeoutId = window.setTimeout(() => {
          this.handlePlaybackComplete();
        }, duration * 1000);

        return;
      } catch (err) {
        console.error('[AudioEngine] HTMLAudioElement playback error', err);
        this.handlePlaybackComplete();
      }
    }
  }

  private playViaAudioBuffer(buffer: AudioBuffer, duration: number, offsetSeconds: number) {
    if (!this.ctx || !this.masterGain) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    const fadeTime = 0.005; // 5ms micro-fade

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + fadeTime);
    gain.gain.setValueAtTime(1, now + duration - fadeTime);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    source.connect(gain);
    gain.connect(this.masterGain);

    const safeOffset = Math.min(offsetSeconds, Math.max(0, buffer.duration - duration));
    source.start(now, safeOffset, duration);

    this.currentBufferSource = source;
    this.isPlaying = true;
    this.playStartTime = performance.now();

    this.trackProgress();

    source.onended = () => {
      this.handlePlaybackComplete();
    };
  }

  /**
   * Play full 30-second original song preview
   */
  public async playFullPreview(
    url: string,
    onProgress?: (currentSec: number, totalSec: number, ratio: number) => void,
    onEnded?: () => void
  ) {
    this.init();
    this.stop();

    this.onProgressCallback = onProgress || null;
    this.onEndedCallback = onEnded || null;

    if (url && url.startsWith('http')) {
      try {
        const audio = this.audioElement || new Audio();
        this.audioElement = audio;
        audio.src = url;
        audio.currentTime = 0;
        await audio.play();

        this.isPlaying = true;
        this.playStartTime = performance.now();
        this.activeDuration = 30.0;
        this.trackProgress();

        audio.onended = () => {
          this.handlePlaybackComplete();
        };
        return;
      } catch (e) {
        console.warn('Full preview audio play error', e);
      }
    }

    const buffer = this.bufferCache.get(url);
    if (buffer) {
      this.playViaAudioBuffer(buffer, buffer.duration, 0);
    }
  }

  public stop() {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch {
        // paused
      }
    }
    if (this.currentBufferSource) {
      try {
        this.currentBufferSource.stop();
        this.currentBufferSource.disconnect();
      } catch {
        // stopped
      }
      this.currentBufferSource = null;
    }
    if (this.stopTimeoutId) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isPlaying = false;
    if (this.onProgressCallback) {
      this.onProgressCallback(0, this.activeDuration, 0);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private handlePlaybackComplete() {
    if (this.isPlaying) {
      this.stop();
      if (this.onEndedCallback) {
        this.onEndedCallback();
      }
    }
  }

  private trackProgress() {
    const loop = () => {
      if (!this.isPlaying) return;
      const elapsedMs = performance.now() - this.playStartTime;
      const elapsedSec = elapsedMs / 1000;
      const ratio = Math.min(1.0, elapsedSec / this.activeDuration);

      if (this.onProgressCallback) {
        this.onProgressCallback(elapsedSec, this.activeDuration, ratio);
      }

      if (ratio < 1.0) {
        this.animationFrameId = requestAnimationFrame(loop);
      } else {
        this.handlePlaybackComplete();
      }
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }
}

export const audioEngine = new AudioEngine();

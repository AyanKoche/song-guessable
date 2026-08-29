/**
 * Web Audio API synthesized sound effects engine for zero-latency,
 * dependency-free interactive audio feedback.
 */
class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Tactile subtle button click
   */
  public playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio context policy fallback
    }
  }

  /**
   * Rewarding major triad chime for correct guess
   */
  public playVictory() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const start = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start + idx * 0.08);

        gain.gain.setValueAtTime(0, start + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, start + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start + idx * 0.08);
        osc.stop(start + idx * 0.08 + 0.5);
      });
    } catch {
      // Audio context fallback
    }
  }

  /**
   * Gentle buzzer for incorrect guess
   */
  public playWrong() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.setValueAtTime(110, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio context fallback
    }
  }

  /**
   * Crisp tick sound for skipping a turn
   */
  public playSkip() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio context fallback
    }
  }

  /**
   * Exciting level-up fanfare
   */
  public playLevelUp() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      const start = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start + idx * 0.06);

        gain.gain.setValueAtTime(0, start + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.2, start + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start + idx * 0.06);
        osc.stop(start + idx * 0.06 + 0.6);
      });
    } catch {
      // Audio context fallback
    }
  }
}

export const soundEffects = new SoundEffectsEngine();

import React from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { GUESS_DURATIONS } from '../types/game';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentGuessIndex: number;
  onPlay: () => void;
  onStop: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  currentGuessIndex,
  onPlay,
  onStop,
}) => {
  const currentDuration = GUESS_DURATIONS[currentGuessIndex] || 8.0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        margin: '1rem 0 1.5rem',
      }}
    >
      <button
        onClick={isPlaying ? onStop : onPlay}
        className={isPlaying ? 'btn-secondary' : 'btn-primary pulse-button'}
        style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isPlaying
            ? '0 0 25px rgba(255, 0, 85, 0.4)'
            : '0 0 35px var(--accent-emerald-glow)',
          background: isPlaying
            ? 'linear-gradient(135deg, #ff0055 0%, #ff5500 100%)'
            : undefined,
        }}
        title={isPlaying ? 'Stop Playback' : `Play ${currentDuration}s Snippet`}
      >
        {isPlaying ? (
          <Square size={28} color="#fff" fill="#fff" />
        ) : currentGuessIndex > 0 ? (
          <RotateCcw size={30} color="#05130e" />
        ) : (
          <Play size={32} color="#05130e" fill="#05130e" style={{ marginLeft: '4px' }} />
        )}
      </button>

      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: '1.05rem',
            letterSpacing: '-0.01em',
            color: isPlaying ? 'var(--accent-emerald)' : 'var(--text-primary)',
          }}
        >
          {isPlaying
            ? `Playing from start (0.0s → ${currentDuration}s)...`
            : currentGuessIndex === 0
            ? 'Play Snippet (0.1s)'
            : `Replay from Start (0.0s → ${currentDuration}s)`}
        </p>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.2rem',
          }}
        >
          <span className="hide-on-mobile">Press <kbd style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.1rem 0.4rem',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}>SPACE</kbd> or </span>Tap button to listen
        </span>
      </div>
    </div>
  );
};

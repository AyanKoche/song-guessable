import React from 'react';
import { Lock, Unlock, PlayCircle, RotateCcw } from 'lucide-react';
import { GUESS_DURATIONS } from '../types/game';

interface ProgressiveTimelineProps {
  currentGuessIndex: number; // 0 to 4
  playbackRatio: number;     // 0 to 1
  playbackCurrentSec: number;
  isPlaying: boolean;
}

const SEGMENT_COLORS = [
  'var(--tier-1-color)', // 0.1s (Red)
  'var(--tier-2-color)', // 0.5s (Orange)
  'var(--tier-3-color)', // 1.5s (Yellow)
  'var(--tier-4-color)', // 3.0s (Cyan)
  'var(--tier-5-color)', // 8.0s (Purple)
];

const SEGMENT_INTERVALS = [
  { start: 0.0, end: 0.1 },
  { start: 0.1, end: 0.5 },
  { start: 0.5, end: 1.5 },
  { start: 1.5, end: 3.0 },
  { start: 3.0, end: 8.0 },
];

export const ProgressiveTimeline: React.FC<ProgressiveTimelineProps> = ({
  currentGuessIndex,
  playbackCurrentSec,
  isPlaying,
}) => {
  const currentDuration = GUESS_DURATIONS[currentGuessIndex] || 8.0;

  return (
    <div style={{ width: '100%', margin: '1.5rem 0' }}>
      {/* Header Info */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
          fontSize: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Guess {currentGuessIndex + 1} of 5</span>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              color: SEGMENT_COLORS[currentGuessIndex],
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {currentDuration}s total clip
          </span>
        </div>

        {/* Live playhead timer showing playing from 0.00s */}
        <div style={{ fontFamily: 'var(--font-mono)' }}>
          {isPlaying ? (
            <span
              style={{
                color: 'var(--accent-emerald)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(0, 245, 155, 0.12)',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(0, 245, 155, 0.25)',
                fontSize: '0.8rem',
              }}
            >
              <RotateCcw size={12} className="animate-spin-slow" />
              <span>{playbackCurrentSec.toFixed(2)}s / {currentDuration.toFixed(1)}s</span>
            </span>
          ) : (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              0.0s &rarr; {currentDuration}s
            </span>
          )}
        </div>
      </div>

      {/* 5-Segment Progressive Bar */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          height: '16px',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: isPlaying ? '1px solid rgba(0, 245, 155, 0.4)' : '1px solid var(--border-subtle)',
          boxShadow: isPlaying
            ? '0 0 15px rgba(0, 245, 155, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.6)'
            : 'inset 0 2px 4px rgba(0, 0, 0, 0.6)',
          transition: 'all var(--transition-fast)',
        }}
      >
        {GUESS_DURATIONS.map((_dur, idx) => {
          const isUnlocked = idx <= currentGuessIndex;
          const isCurrent = idx === currentGuessIndex;
          const color = SEGMENT_COLORS[idx];
          const interval = SEGMENT_INTERVALS[idx];

          // Calculate precise fill from start (0.0s) across all segments
          let fillPercent = 0;
          if (isPlaying) {
            if (playbackCurrentSec <= interval.start) {
              fillPercent = 0;
            } else if (playbackCurrentSec >= interval.end) {
              fillPercent = 100;
            } else {
              fillPercent = ((playbackCurrentSec - interval.start) / (interval.end - interval.start)) * 100;
            }
            fillPercent = Math.max(0, Math.min(100, fillPercent));
          } else {
            // Idle state: show subtle filled background for previously unlocked segments
            fillPercent = isUnlocked ? 100 : 0;
          }

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: '100%',
                borderRadius: 'var(--radius-full)',
                background: isUnlocked
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.02)',
                position: 'relative',
                overflow: 'hidden',
                border: isCurrent
                  ? `1px solid ${color}`
                  : isUnlocked
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid transparent',
                transition: 'border 0.2s ease',
              }}
              title={`Guess ${idx + 1}: ${interval.start}s - ${interval.end}s ${isUnlocked ? '(Unlocked)' : '(Locked)'}`}
            >
              {/* Dynamic Fill sweeping from 0.0s */}
              {isUnlocked && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${fillPercent}%`,
                    background: isPlaying
                      ? color
                      : 'rgba(255, 255, 255, 0.15)', // idle unlocked tint
                    boxShadow: isPlaying && fillPercent > 0 && fillPercent < 100
                      ? `0 0 12px ${color}`
                      : 'none',
                    transition: isPlaying ? 'width 0.04s linear' : 'background 0.3s ease',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Segment Labels with Interval Range */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.45rem',
          padding: '0 2px',
        }}
      >
        {GUESS_DURATIONS.map((dur, idx) => {
          const isUnlocked = idx <= currentGuessIndex;
          const isCurrent = idx === currentGuessIndex;
          const color = SEGMENT_COLORS[idx];

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: isCurrent
                  ? color
                  : isUnlocked
                  ? 'var(--text-secondary)'
                  : 'var(--text-dim)',
                fontWeight: isCurrent ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
              }}
            >
              {isUnlocked ? (
                isCurrent ? <Unlock size={10} color={color} /> : <PlayCircle size={10} color="var(--text-muted)" />
              ) : (
                <Lock size={10} />
              )}
              <span>{dur}s</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

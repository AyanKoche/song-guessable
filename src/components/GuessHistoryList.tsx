import React from 'react';
import { Check, X, SkipForward, HelpCircle } from 'lucide-react';
import type { GuessAttempt } from '../types/game';

interface GuessHistoryListProps {
  guesses: GuessAttempt[];
  currentGuessIndex: number;
}

export const GuessHistoryList: React.FC<GuessHistoryListProps> = ({
  guesses,
  currentGuessIndex,
}) => {
  const totalSlots = 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', margin: '1rem 0' }}>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const attempt = guesses[index];
        const isCurrent = index === currentGuessIndex && !attempt;
        const isFuture = index > currentGuessIndex;

        if (attempt) {
          if (attempt.isCorrect) {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 1rem',
                  background: 'rgba(0, 245, 155, 0.12)',
                  border: '1px solid rgba(0, 245, 155, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-emerald)',
                  animation: 'scaleUp 0.25s ease-out',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#05130e',
                    fontWeight: 800,
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{attempt.text}</span>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-emerald)',
                    fontWeight: 700,
                  }}
                >
                  SOLVED ({attempt.duration}s)
                </span>
              </div>
            );
          }

          if (attempt.isSkip) {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 1rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-muted)',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SkipForward size={14} />
                </div>
                <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Skipped turn</span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                  }}
                >
                  {attempt.duration}s
                </span>
              </div>
            );
          }

          // Incorrect guess
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 1rem',
                background: 'rgba(255, 0, 85, 0.1)',
                border: '1px solid rgba(255, 0, 85, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#ff4d79',
                animation: 'scaleUp 0.25s ease-out',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 0, 85, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} strokeWidth={2.5} color="#ff3366" />
              </div>
              <div style={{ flex: 1, minWidth: 0, textDecoration: 'line-through', opacity: 0.85 }}>
                <span style={{ fontSize: '0.95rem' }}>{attempt.text}</span>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#ff4d79',
                  fontWeight: 600,
                }}
              >
                WRONG
              </span>
            </div>
          );
        }

        // Empty / Current Slot
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 1rem',
              background: isCurrent
                ? 'rgba(0, 245, 155, 0.04)'
                : 'rgba(255, 255, 255, 0.02)',
              border: isCurrent
                ? '1px dashed rgba(0, 245, 155, 0.4)'
                : '1px dashed rgba(255, 255, 255, 0.07)',
              borderRadius: 'var(--radius-md)',
              color: isCurrent ? 'var(--accent-emerald)' : 'var(--text-dim)',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              {index + 1}
            </div>
            <span style={{ fontSize: '0.85rem' }}>
              {isCurrent ? 'Current Guess' : isFuture ? 'Locked' : ''}
            </span>
            <HelpCircle size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />
          </div>
        );
      })}
    </div>
  );
};

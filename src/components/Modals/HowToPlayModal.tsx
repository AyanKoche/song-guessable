import React from 'react';
import { X, Play, Search, Trophy, FastForward, HelpCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { GUESS_DURATIONS } from '../../types/game';

export const HowToPlayModal: React.FC = () => {
  const { showHowToPlayModal, setShowHowToPlayModal } = useGame();

  if (!showHowToPlayModal) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowHowToPlayModal(false)}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <HelpCircle size={22} color="var(--accent-cyan)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
              How to Play BeatGuess
            </h2>
          </div>
          <button
            onClick={() => setShowHowToPlayModal(false)}
            className="btn-secondary"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Test your music recognition instinct! Guess the song in as few audio slices as possible.
        </p>

        {/* Step-by-Step Guide */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(0, 245, 155, 0.15)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Play size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                1. Listen to the 0.1s Micro-Hook
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Hit Play or press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>Spacebar</kbd> to listen to the first fraction-of-a-second slice.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(0, 229, 255, 0.15)',
                color: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Search size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                2. Type & Autocomplete Your Guess
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Type at least 3 characters into the search bar. Select the track from the suggestions list and submit.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 183, 3, 0.15)',
                color: '#ffb703',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FastForward size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                3. Unlock Longer Audio Slices
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Wrong guesses and skips unlock more sound: <strong>0.1s &rarr; 0.5s &rarr; 1.5s &rarr; 3.0s &rarr; 8.0s</strong>.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(168, 85, 247, 0.15)',
                color: 'var(--accent-violet)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Trophy size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                4. Build Your Streak & Level Up
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Guess in fewer tries to earn higher score multipliers and climb through the listener ranks!
              </p>
            </div>
          </div>
        </div>

        {/* Snippet Tiers Preview */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
            5 PROGRESSIVE TIERS:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {GUESS_DURATIONS.map((dur, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.4rem 0.2rem',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-emerald)',
                }}
              >
                {dur}s
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowHowToPlayModal(false)}
          className="btn-primary"
          style={{ width: '100%', padding: '0.85rem' }}
        >
          Got it, Let's Play!
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Trophy, Award } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const StatsModal: React.FC = () => {
  const { stats, showStatsModal, setShowStatsModal } = useGame();

  if (!showStatsModal) return null;

  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const maxGuessCount = Math.max(
    1,
    ...Object.values(stats.guessDistribution)
  );

  const xpInCurrentLevel = stats.xp % 500;
  const xpProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / 500) * 100));

  return (
    <div className="modal-overlay" onClick={() => setShowStatsModal(false)}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px' }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Trophy size={22} color="var(--accent-amber)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
              Player Statistics
            </h2>
          </div>
          <button
            onClick={() => setShowStatsModal(false)}
            className="btn-secondary"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Level & XP Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(0, 229, 255, 0.15) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} color="var(--accent-violet)" />
              <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Level {stats.level} Listener</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {xpInCurrentLevel} / 500 XP
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${xpProgressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-violet) 0%, var(--accent-cyan) 100%)',
                boxShadow: '0 0 10px var(--accent-cyan-glow)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.75rem',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 0.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800 }}>
              {stats.gamesPlayed}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Played</div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 0.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {winRate}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Win Rate</div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 0.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#ffb703' }}>
              {stats.currentStreak}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Streak</div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 0.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#00e5ff' }}>
              {stats.maxStreak}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Max Streak</div>
          </div>
        </div>

        {/* Guess Distribution Horizontal Bar Chart */}
        <div>
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}
          >
            Guess Distribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((guessNum) => {
              const count = stats.guessDistribution[guessNum as 1 | 2 | 3 | 4 | 5] || 0;
              const barWidth = stats.gamesWon > 0
                ? Math.max(8, Math.round((count / maxGuessCount) * 100))
                : 8;

              const isFirstGuess = guessNum === 1;

              return (
                <div key={guessNum} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ width: '15px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {guessNum}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '24px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: `${barWidth}%`,
                        height: '100%',
                        background: isFirstGuess
                          ? 'var(--accent-emerald)'
                          : 'linear-gradient(90deg, rgba(0, 229, 255, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        color: isFirstGuess ? '#05130e' : '#fff',
                        transition: 'width 0.3s ease',
                      }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

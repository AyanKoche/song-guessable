import React from 'react';
import { Volume2, VolumeX, BarChart3, HelpCircle, User, Flame, Disc3, ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { DIFFICULTY_CONFIG } from '../types/game';

export const Header: React.FC = () => {
  const {
    status,
    difficulty,
    gameMode,
    stats,
    username,
    isMuted,
    toggleMute,
    setShowStatsModal,
    setShowHowToPlayModal,
    setShowAuthModal,
    returnToLobby,
  } = useGame();

  const currentDiff = DIFFICULTY_CONFIG[difficulty];

  return (
    <header className="header-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {status !== 'idle' && (
          <button
            onClick={returnToLobby}
            className="btn-secondary"
            style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-full)' }}
            title="Return to Menu"
          >
            <ArrowLeft size={18} />
            <span style={{ fontSize: '0.85rem' }}>Menu</span>
          </button>
        )}

        <div
          onClick={returnToLobby}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00f59b 0%, #00e5ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0, 245, 155, 0.4)',
            }}
          >
            <Disc3 size={24} color="#05130e" className={status === 'playing' ? 'animate-spin-slow' : ''} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Beat<span style={{ color: 'var(--accent-emerald)' }}>Guess</span>
            </h1>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
              SONG TRIVIA
            </span>
          </div>
        </div>

        {status !== 'idle' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginLeft: '0.5rem',
            }}
          >
            <span
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: currentDiff.badgeBg,
                color: currentDiff.color,
                border: `1px solid ${currentDiff.color}40`,
              }}
            >
              {currentDiff.name}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textTransform: 'capitalize',
              }}
            >
              • {gameMode} mode
            </span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Streak Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 183, 3, 0.12)',
            border: '1px solid rgba(255, 183, 3, 0.25)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            color: '#ffb703',
            fontSize: '0.85rem',
            fontWeight: 700,
          }}
          title={`Current Streak: ${stats.currentStreak} (Max: ${stats.maxStreak})`}
        >
          <Flame size={16} color="#ffb703" fill="#ffb703" />
          <span>{stats.currentStreak}</span>
        </div>

        {/* How To Play */}
        <button
          onClick={() => setShowHowToPlayModal(true)}
          className="btn-secondary"
          style={{ padding: '0.5rem', borderRadius: '50%', width: '38px', height: '38px' }}
          title="How to Play"
        >
          <HelpCircle size={18} />
        </button>

        {/* Stats */}
        <button
          onClick={() => setShowStatsModal(true)}
          className="btn-secondary"
          style={{ padding: '0.5rem', borderRadius: '50%', width: '38px', height: '38px' }}
          title="Statistics & Streaks"
        >
          <BarChart3 size={18} />
        </button>

        {/* Mute/Volume */}
        <button
          onClick={toggleMute}
          className="btn-secondary"
          style={{ padding: '0.5rem', borderRadius: '50%', width: '38px', height: '38px' }}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={18} color="#ff3366" /> : <Volume2 size={18} />}
        </button>

        {/* User / Profile button */}
        <button
          onClick={() => setShowAuthModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7 0%, #00e5ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={12} color="#fff" />
          </div>
          <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {username}
          </span>
        </button>
      </div>
    </header>
  );
};

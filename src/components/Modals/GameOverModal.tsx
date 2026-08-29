import React from 'react';
import { Skull, Play, Square, ArrowRight, ExternalLink } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const GameOverModal: React.FC = () => {
  const {
    status,
    currentSong,
    isPlayingAudio,
    playFullPreview,
    stopAudio,
    nextRound,
    returnToLobby,
  } = useGame();

  if (status !== 'lost' || !currentSong) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '500px', textAlign: 'center' }}>
        {/* Header Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 0, 85, 0.15)',
            border: '1px solid rgba(255, 0, 85, 0.3)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            color: '#ff3366',
            fontSize: '0.85rem',
            fontWeight: 800,
            marginBottom: '1.25rem',
          }}
        >
          <Skull size={16} />
          <span>OUT OF GUESSES</span>
        </div>

        {/* Album Artwork */}
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '16px',
            overflow: 'hidden',
            margin: '0 auto 1.25rem',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#151b28',
          }}
        >
          {currentSong.artworkUrl && (
            <img
              src={currentSong.artworkUrl}
              alt={currentSong.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>

        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
          The correct track was:
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 900,
            marginBottom: '0.2rem',
          }}
        >
          {currentSong.title}
        </h2>
        <p style={{ color: 'var(--accent-cyan)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          {currentSong.artist}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          {currentSong.album} • {currentSong.year} • {currentSong.genre}
        </p>

        {/* Full Track Preview Player Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
          }}
        >
          <button
            onClick={isPlayingAudio ? stopAudio : playFullPreview}
            className="btn-secondary"
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: isPlayingAudio ? 'rgba(255, 0, 85, 0.2)' : 'rgba(0, 229, 255, 0.15)',
              color: isPlayingAudio ? '#ff3366' : 'var(--accent-cyan)',
              fontWeight: 700,
              fontSize: '0.85rem',
              gap: '0.4rem',
            }}
          >
            {isPlayingAudio ? <Square size={16} fill="#ff3366" /> : <Play size={16} fill="var(--accent-cyan)" />}
            <span>{isPlayingAudio ? 'Pause Track' : 'Listen to Track'}</span>
          </button>

          {currentSong.spotifyUrl && (
            <a
              href={currentSong.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                gap: '0.35rem',
                textDecoration: 'none',
              }}
            >
              <span>Spotify</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <button
            onClick={returnToLobby}
            className="btn-secondary"
            style={{ flex: 1, padding: '0.85rem', borderRadius: 'var(--radius-md)' }}
          >
            <span>Back to Menu</span>
          </button>

          <button
            onClick={nextRound}
            className="btn-primary"
            style={{ flex: 1.3, padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-md)' }}
          >
            <span>Try Another</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

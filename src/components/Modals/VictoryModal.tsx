import React, { useState } from 'react';
import {
  Trophy,
  Play,
  Square,
  Share2,
  ArrowRight,
  Check,
  Disc3,
  ExternalLink,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { DIFFICULTY_CONFIG } from '../../types/game';

export const VictoryModal: React.FC = () => {
  const {
    status,
    currentSong,
    guesses,
    difficulty,
    stats,
    scoreBreakdown,
    isPlayingAudio,
    playFullPreview,
    stopAudio,
    nextRound,
    returnToLobby,
  } = useGame();

  const [copied, setCopied] = useState(false);

  if (status !== 'won' || !currentSong) return null;

  const diffConfig = DIFFICULTY_CONFIG[difficulty];
  const correctGuess = guesses.find((g) => g.isCorrect);
  const guessNum = correctGuess ? correctGuess.guessNumber : guesses.length;
  const durationUsed = correctGuess ? correctGuess.duration : 8.0;

  // Generate share emoji grid
  const generateShareText = () => {
    let grid = '';
    for (let i = 0; i < 5; i++) {
      const g = guesses[i];
      if (!g) {
        grid += '⬜';
      } else if (g.isCorrect) {
        grid += '🟩';
      } else if (g.isSkip) {
        grid += '⬛';
      } else {
        grid += '🟥';
      }
    }

    return `🎵 BeatGuess [${diffConfig.name} Mode]\n${grid} (${durationUsed}s solve!)\n🔥 Streak: ${stats.currentStreak} | ⚡ Score: ${scoreBreakdown?.totalScore || 0}\nPlay at: https://beatguess.app`;
  };

  const handleCopyShare = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '540px', textAlign: 'center' }}>
        {/* Header Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0, 245, 155, 0.15)',
            border: '1px solid rgba(0, 245, 155, 0.3)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--accent-emerald)',
            fontSize: '0.85rem',
            fontWeight: 800,
            marginBottom: '1rem',
          }}
        >
          <Trophy size={16} />
          <span>VICTORY! YOU GUESSED IT!</span>
        </div>

        {/* Album Artwork & Spinning Vinyl Record Presentation */}
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Vinyl Disc that slides out */}
          <div
            className={isPlayingAudio ? 'animate-spin-slow' : ''}
            style={{
              position: 'absolute',
              right: '-25px',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #2b2b2b 0%, #111111 60%, #000 100%)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: diffConfig.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Disc3 size={24} color="#05130e" />
            </div>
          </div>

          {/* Album Cover Art */}
          <div
            style={{
              position: 'relative',
              width: '160px',
              height: '160px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              zIndex: 2,
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
        </div>

        {/* Song Info */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: '0.25rem',
          }}
        >
          {currentSong.title}
        </h2>
        <p style={{ color: 'var(--accent-emerald)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
          {currentSong.artist}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          {currentSong.album} • {currentSong.year} • {currentSong.genre}
        </p>

        {/* Full Track Preview Player Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.05)',
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
              background: isPlayingAudio ? 'rgba(255, 0, 85, 0.2)' : 'rgba(0, 245, 155, 0.2)',
              color: isPlayingAudio ? '#ff3366' : 'var(--accent-emerald)',
              fontWeight: 700,
              fontSize: '0.85rem',
              gap: '0.4rem',
            }}
          >
            {isPlayingAudio ? <Square size={16} fill="#ff3366" /> : <Play size={16} fill="var(--accent-emerald)" />}
            <span>{isPlayingAudio ? 'Pause Track' : 'Listen to Full 30s Track'}</span>
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

        {/* Score Breakdown Grid */}
        {scoreBreakdown && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
            }}
          >
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Solve Time</div>
              <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {durationUsed}s (Guess #{guessNum})
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Multiplier</div>
              <div style={{ fontWeight: 800, color: '#ffb703', fontFamily: 'var(--font-mono)' }}>
                {diffConfig.multiplier}x diff • {scoreBreakdown.streakMultiplier}x streak
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Round Score</div>
              <div style={{ fontWeight: 900, color: 'var(--accent-emerald)', fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>
                +{scoreBreakdown.totalScore} pts
              </div>
            </div>
          </div>
        )}

        {/* Wordle-style Emoji Share Block */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <button
            onClick={handleCopyShare}
            className="btn-secondary"
            style={{ flex: 1, padding: '0.85rem', borderRadius: 'var(--radius-md)' }}
          >
            {copied ? <Check size={18} color="var(--accent-emerald)" /> : <Share2 size={18} />}
            <span>{copied ? 'Copied Results!' : 'Share Results'}</span>
          </button>

          <button
            onClick={nextRound}
            className="btn-primary"
            style={{ flex: 1.3, padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-md)' }}
          >
            <span>Next Track</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <button
          onClick={returnToLobby}
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textDecoration: 'underline',
            marginTop: '0.5rem',
          }}
        >
          Change Mode or Difficulty
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { useGame } from '../context/GameContext';
import { ProgressiveTimeline } from './ProgressiveTimeline';
import { VisualizerCanvas } from './VisualizerCanvas';
import { PlaybackControls } from './PlaybackControls';
import { GuessHistoryList } from './GuessHistoryList';
import { SearchBar } from './SearchBar';
import { Loader2, Music } from 'lucide-react';
import { DIFFICULTY_CONFIG } from '../types/game';

export const AudioPlayerArena: React.FC = () => {
  const {
    status,
    currentGuessIndex,
    guesses,
    difficulty,
    category,
    era,
    isPlayingAudio,
    playbackRatio,
    playbackCurrentSec,
    playSnippet,
    stopAudio,
    submitGuess,
    skipTurn,
  } = useGame();

  const diffConfig = DIFFICULTY_CONFIG[difficulty];

  if (status === 'loading') {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '4rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          minHeight: '420px',
        }}
      >
        <Loader2 size={48} className="animate-spin-slow" color="var(--accent-emerald)" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
          Buffering Audio Track...
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Calibrating 0.1s slice & frequency harmonics
        </p>
      </div>
    );
  }

  return (
    <div
      className="glass-panel arena-card"
    >
      {/* Top Arena Info Badges */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: diffConfig.badgeBg,
              color: diffConfig.color,
              border: `1px solid ${diffConfig.color}40`,
            }}
          >
            {diffConfig.name} Mode ({diffConfig.multiplier}x)
          </span>

          {category !== 'all' && (
            <span
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                textTransform: 'capitalize',
              }}
            >
              {category}
            </span>
          )}

          {era !== 'all' && (
            <span
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
              }}
            >
              {era}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <Music size={14} />
          <span>5 Guesses</span>
        </div>
      </div>

      {/* Center Audio Visualizer Canvas */}
      <div style={{ position: 'relative' }}>
        <VisualizerCanvas isPlaying={isPlayingAudio} activeColor={diffConfig.color} />
      </div>

      {/* Big Play / Replay Control */}
      <PlaybackControls
        isPlaying={isPlayingAudio}
        currentGuessIndex={currentGuessIndex}
        onPlay={playSnippet}
        onStop={stopAudio}
      />

      {/* Progressive 5-Segment Audio Timeline */}
      <ProgressiveTimeline
        currentGuessIndex={currentGuessIndex}
        playbackRatio={playbackRatio}
        playbackCurrentSec={playbackCurrentSec}
        isPlaying={isPlayingAudio}
      />

      {/* Guess History Slots (1 to 5) */}
      <GuessHistoryList guesses={guesses} currentGuessIndex={currentGuessIndex} />

      {/* Smart Search Bar with Autocomplete (>= 3 chars) & Skip */}
      <SearchBar
        currentGuessIndex={currentGuessIndex}
        onSubmitGuess={submitGuess}
        onSkipTurn={skipTurn}
        disabled={status !== 'playing'}
      />
    </div>
  );
};

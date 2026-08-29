import React from 'react';
import {
  Sparkles,
  Flame,
  Zap,
  ShieldAlert,
  Skull,
  Play,
  Calendar,
  Infinity as InfinityIcon,
  Compass,
  Trophy,
  CheckCircle2,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import type { Difficulty, Category, Era, GameMode } from '../types/game';
import { DIFFICULTY_CONFIG } from '../types/game';

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'all', label: 'All Genres', icon: '✨' },
  { id: 'pop', label: 'Pop & Chart Hits', icon: '🎧' },
  { id: 'rock', label: 'Rock & Metal', icon: '🎸' },
  { id: 'hiphop', label: 'Hip-Hop & R&B', icon: '🎤' },
  { id: 'edm', label: 'EDM & Dance', icon: '⚡' },
  { id: '80s90s', label: '80s & 90s Classics', icon: '📼' },
  { id: 'bollywood', label: 'Bollywood & Hindi', icon: '🎬' },
  { id: 'kpop', label: 'K-Pop & Asian Pop', icon: '🌸' },
  { id: 'latin', label: 'Latin & Reggaeton', icon: '🌴' },
];

const ERAS: { id: Era; label: string }[] = [
  { id: 'all', label: 'All Decades' },
  { id: '2020s', label: '2020s' },
  { id: '2010s', label: '2010s' },
  { id: '2000s', label: '2000s (Y2K)' },
  { id: '90s', label: '90s' },
  { id: '80s', label: '80s' },
];

const DIFFICULTY_ICONS: Record<Difficulty, React.ReactNode> = {
  easy: <Sparkles size={22} color="#00f59b" />,
  medium: <Flame size={22} color="#00e5ff" />,
  hard: <Zap size={22} color="#ffb703" />,
  expert: <ShieldAlert size={22} color="#fb8500" />,
  impossible: <Skull size={22} color="#ff0055" />,
};

export const ModeSelector: React.FC = () => {
  const {
    difficulty,
    category,
    era,
    gameMode,
    setDifficulty,
    setCategory,
    setEra,
    setGameMode,
    startNewGame,
  } = useGame();

  const handleStart = () => {
    startNewGame();
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', width: '100%' }}>
      {/* Hero Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(22, 30, 48, 0.7) 0%, rgba(15, 20, 32, 0.9) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0, 245, 155, 0.12)',
            border: '1px solid rgba(0, 245, 155, 0.3)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--accent-emerald)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          <Sparkles size={14} />
          <span>MICRO-SNIPPET MUSIC GUESSING GAME</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}
        >
          Can you identify the song in <span className="shimmer-text">0.1 seconds?</span>
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '620px',
            margin: '0 auto 1.75rem',
            lineHeight: 1.6,
          }}
        >
          Listen to progressive audio slices (0.1s &rarr; 0.5s &rarr; 1.5s &rarr; 3.0s &rarr; 8.0s).
          Test your musical instinct across iconic genres and decades.
        </p>

        {/* Quick Launch Button */}
        <button
          onClick={handleStart}
          className="btn-primary pulse-button"
          style={{
            padding: '1.1rem 2.75rem',
            fontSize: '1.15rem',
            gap: '0.75rem',
          }}
        >
          <Play size={22} fill="#05130e" />
          <span>PLAY NOW</span>
        </button>
      </div>

      {/* Game Mode Tabs */}
      <div style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Compass size={18} color="var(--accent-emerald)" />
          <span>1. Select Game Mode</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            {
              id: 'arcade' as GameMode,
              title: 'Arcade Streak',
              desc: 'Endless song progression, score multipliers & streak climb',
              icon: <InfinityIcon size={20} />,
            },
            {
              id: 'daily' as GameMode,
              title: 'Daily Challenge',
              desc: 'The same mystery song for everyone worldwide today',
              icon: <Calendar size={20} />,
            },
            {
              id: 'practice' as GameMode,
              title: 'Free Practice',
              desc: 'Casual guessing with instant skips and no streak loss',
              icon: <Trophy size={20} />,
            },
          ].map((mode) => {
            const isSelected = gameMode === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => setGameMode(mode.id)}
                className={`glass-panel-interactive`}
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent-emerald)' : undefined,
                  background: isSelected ? 'rgba(0, 245, 155, 0.08)' : undefined,
                  boxShadow: isSelected ? '0 0 20px rgba(0, 245, 155, 0.15)' : undefined,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: isSelected ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? '#05130e' : '#fff',
                    }}
                  >
                    {mode.icon}
                  </div>
                  {isSelected && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{mode.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{mode.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty Level Cards */}
      <div style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Flame size={18} color="var(--accent-amber)" />
          <span>2. Choose Difficulty Level</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.85rem' }}>
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diffKey) => {
            const config = DIFFICULTY_CONFIG[diffKey];
            const isSelected = difficulty === diffKey;

            return (
              <div
                key={diffKey}
                onClick={() => setDifficulty(diffKey)}
                className="glass-panel-interactive"
                style={{
                  padding: '1.25rem 1rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? config.color : undefined,
                  background: isSelected ? config.badgeBg : undefined,
                  boxShadow: isSelected ? `0 0 20px ${config.color}30` : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.75rem' }}>
                  {DIFFICULTY_ICONS[diffKey]}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: config.color,
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {config.multiplier}x pts
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: config.color, marginBottom: '0.35rem' }}>
                  {config.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35, marginTop: 'auto' }}>
                  {config.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Genre / Category & Decade Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Genre Selector */}
        <div>
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}
          >
            Genre & Mood
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: isSelected ? 'rgba(0, 245, 155, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                    color: isSelected ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Era / Decade Selector */}
        <div>
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}
          >
            Era & Decade
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {ERAS.map((eraItem) => {
              const isSelected = era === eraItem.id;
              return (
                <button
                  key={eraItem.id}
                  onClick={() => setEra(eraItem.id)}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: isSelected ? 'rgba(0, 229, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {eraItem.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

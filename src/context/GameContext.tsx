import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import confetti from 'canvas-confetti';
import type {
  Song,
  Difficulty,
  GameMode,
  Category,
  Era,
  Region,
  GuessAttempt,
  GameStatus,
  PlayerStats,
  ScoreBreakdown,
} from '../types/game';
import {
  GUESS_DURATIONS,
  DIFFICULTY_CONFIG,
} from '../types/game';
import { musicService } from '../services/musicService';
import { audioEngine } from '../services/audioEngine';
import { soundEffects } from '../services/soundEffects';

interface GameContextType {
  // Game session
  status: GameStatus;
  currentSong: Song | null;
  gameMode: GameMode;
  difficulty: Difficulty;
  category: Category;
  era: Era;
  region: Region;
  currentGuessIndex: number;
  guesses: GuessAttempt[];
  currentDuration: number;
  scoreBreakdown: ScoreBreakdown | null;

  // Audio Playback
  isPlayingAudio: boolean;
  playbackRatio: number;
  playbackCurrentSec: number;
  isMuted: boolean;
  volume: number;

  // Player & Stats
  stats: PlayerStats;
  username: string;

  // Modals
  showStatsModal: boolean;
  showHowToPlayModal: boolean;
  showAuthModal: boolean;

  // Actions
  setGameMode: (m: GameMode) => void;
  setDifficulty: (d: Difficulty) => void;
  setCategory: (c: Category) => void;
  setEra: (e: Era) => void;
  setRegion: (r: Region) => void;
  setUsername: (name: string) => void;

  setShowStatsModal: (show: boolean) => void;
  setShowHowToPlayModal: (show: boolean) => void;
  setShowAuthModal: (show: boolean) => void;

  startNewGame: (overrideSong?: Song) => Promise<void>;
  playSnippet: () => void;
  playFullPreview: () => void;
  stopAudio: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;

  submitGuess: (guessText: string, matchedSong?: Song) => void;
  skipTurn: () => void;
  nextRound: () => void;
  returnToLobby: () => void;
}

const DEFAULT_STATS: PlayerStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, failed: 0 },
  totalScore: 0,
  level: 1,
  xp: 0,
  dailyStreak: 0,
  completedDailies: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Preferences & Mode
  const [gameMode, setGameMode] = useState<GameMode>('arcade');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [category, setCategory] = useState<Category>('all');
  const [era, setEra] = useState<Era>('all');
  const [region, setRegion] = useState<Region>('global');

  // Game Session
  const [status, setStatus] = useState<GameStatus>('idle');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [guesses, setGuesses] = useState<GuessAttempt[]>([]);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playbackRatio, setPlaybackRatio] = useState<number>(0);
  const [playbackCurrentSec, setPlaybackCurrentSec] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.85);

  // Profile & Stats
  const [username, setUsernameState] = useState<string>(() => {
    return localStorage.getItem('beatguess_username') || 'Guest Groove Master';
  });

  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem('beatguess_stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  // Session history to avoid repeating tracks
  const [playedSongIds, setPlayedSongIds] = useState<string[]>([]);

  // Modals
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Sync stats to localStorage
  useEffect(() => {
    localStorage.setItem('beatguess_stats', JSON.stringify(stats));
  }, [stats]);

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem('beatguess_username', name);
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    audioEngine.setVolume(val);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEffects.setMuted(nextMuted);
    audioEngine.setVolume(nextMuted ? 0 : volume);
  };

  const currentDuration = GUESS_DURATIONS[currentGuessIndex] || 8.0;

  /**
   * Start a new round dynamically
   */
  const startNewGame = useCallback(async (overrideSong?: Song) => {
    audioEngine.stop();
    setStatus('loading');
    setCurrentGuessIndex(0);
    setGuesses([]);
    setScoreBreakdown(null);
    setPlaybackRatio(0);
    setPlaybackCurrentSec(0);

    let chosenSong: Song | null = null;
    let attempts = 0;
    const attemptedIds = new Set<string>(playedSongIds);

    while (!chosenSong && attempts < 5) {
      attempts++;
      try {
        let candidate: Song;
        if (overrideSong) {
          candidate = overrideSong;
        } else if (gameMode === 'daily') {
          candidate = musicService.getDailySong();
        } else {
          candidate = await musicService.getDynamicRandomSong({
            difficulty,
            category,
            era,
            region,
            excludeIds: Array.from(attemptedIds),
          });
        }

        attemptedIds.add(candidate.id);

        // 1. Resolve fresh live preview stream directly from iTunes API
        const verifiedSong = await musicService.ensureLiveSongPreview(candidate);

        // 2. Preload & verify audio stream actually responds with real playable audio
        await audioEngine.loadAudio(verifiedSong.previewUrl);

        chosenSong = verifiedSong;
      } catch (err) {
        console.warn(`[startNewGame] Song failed audio pre-flight check (attempt ${attempts}), retrying next track...`, err);
      }
    }

    if (!chosenSong) {
      // Fallback
      chosenSong = await musicService.ensureLiveSongPreview(musicService.getDailySong());
    }

    setCurrentSong(chosenSong);
    setPlayedSongIds((prev) => [...prev.slice(-100), chosenSong!.id]);
    setStatus('playing');
  }, [gameMode, difficulty, category, era, region, playedSongIds]);

  /**
   * Play snippet up to current unlocked duration
   */
  const playSnippet = useCallback(() => {
    if (!currentSong || status !== 'playing') return;

    soundEffects.playClick();
    setIsPlayingAudio(true);

    audioEngine.playSnippet(
      currentSong.previewUrl,
      currentDuration,
      0, // Always play from 0.0s natural start
      (currentSec, _totalSec, ratio) => {
        setPlaybackCurrentSec(currentSec);
        setPlaybackRatio(ratio);
      },
      () => {
        setIsPlayingAudio(false);
        setPlaybackRatio(0);
        setPlaybackCurrentSec(0);
      }
    );
  }, [currentSong, status, currentDuration]);

  /**
   * Play full preview (victory / defeat)
   */
  const playFullPreview = useCallback(() => {
    if (!currentSong) return;
    setIsPlayingAudio(true);
    audioEngine.playFullPreview(
      currentSong.previewUrl,
      (currentSec, _totalSec, ratio) => {
        setPlaybackCurrentSec(currentSec);
        setPlaybackRatio(ratio);
      },
      () => {
        setIsPlayingAudio(false);
        setPlaybackRatio(0);
      }
    );
  }, [currentSong]);

  const stopAudio = useCallback(() => {
    audioEngine.stop();
    setIsPlayingAudio(false);
    setPlaybackRatio(0);
    setPlaybackCurrentSec(0);
  }, []);

  /**
   * Calculate score on victory
   */
  const calculateScore = (guessNum: number, diff: Difficulty, currentStreak: number): ScoreBreakdown => {
    const basePoints = 1000;
    // Guess bonus: Guess 1 = 500pts, Guess 2 = 400pts, ..., Guess 5 = 100pts
    const guessBonus = Math.max(100, (6 - guessNum) * 100);
    const difficultyMultiplier = DIFFICULTY_CONFIG[diff].multiplier;
    const streakMultiplier = 1 + Math.min(2.0, (currentStreak * 0.1));
    const totalScore = Math.round((basePoints + guessBonus) * difficultyMultiplier * streakMultiplier);

    return {
      basePoints,
      guessBonus,
      difficultyMultiplier,
      streakMultiplier: parseFloat(streakMultiplier.toFixed(2)),
      totalScore,
    };
  };

  /**
   * Submit guess
   */
  const submitGuess = useCallback((guessText: string, matchedSong?: Song) => {
    if (!currentSong || status !== 'playing') return;

    stopAudio();
    const isCorrect = musicService.isGuessCorrect(guessText, currentSong);
    const guessNum = currentGuessIndex + 1;

    const newAttempt: GuessAttempt = {
      guessNumber: guessNum,
      duration: currentDuration,
      text: guessText,
      isCorrect,
      isSkip: false,
      matchedSong: matchedSong || (isCorrect ? currentSong : undefined),
    };

    const nextGuesses = [...guesses, newAttempt];
    setGuesses(nextGuesses);

    if (isCorrect) {
      // Victory!
      setStatus('won');
      soundEffects.playVictory();

      // Confetti effect
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f59b', '#00e5ff', '#a855f7', '#ffb703', '#ffffff'],
      });

      const newStreak = stats.currentStreak + 1;
      const breakdown = calculateScore(guessNum, difficulty, stats.currentStreak);
      setScoreBreakdown(breakdown);

      const addedXp = Math.round(breakdown.totalScore / 10);
      const newXp = stats.xp + addedXp;
      const newLevel = Math.floor(newXp / 500) + 1;

      if (newLevel > stats.level) {
        setTimeout(() => soundEffects.playLevelUp(), 800);
      }

      setStats((prev) => {
        const guessDist = { ...prev.guessDistribution };
        const key = guessNum as 1 | 2 | 3 | 4 | 5;
        guessDist[key] = (guessDist[key] || 0) + 1;

        return {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          gamesWon: prev.gamesWon + 1,
          currentStreak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak),
          guessDistribution: guessDist,
          totalScore: prev.totalScore + breakdown.totalScore,
          xp: newXp,
          level: newLevel,
        };
      });
    } else {
      // Incorrect guess
      soundEffects.playWrong();

      if (currentGuessIndex >= 4) {
        // Out of guesses -> Game Over
        setStatus('lost');
        setStats((prev) => {
          const guessDist = { ...prev.guessDistribution };
          guessDist.failed = (guessDist.failed || 0) + 1;
          return {
            ...prev,
            gamesPlayed: prev.gamesPlayed + 1,
            currentStreak: 0,
            guessDistribution: guessDist,
          };
        });
      } else {
        // Advance to next duration tier
        setCurrentGuessIndex((prev) => prev + 1);
      }
    }
  }, [currentSong, status, stopAudio, currentGuessIndex, currentDuration, guesses, difficulty, stats]);

  /**
   * Skip turn to unlock longer snippet without guessing
   */
  const skipTurn = useCallback(() => {
    if (!currentSong || status !== 'playing') return;

    stopAudio();
    soundEffects.playSkip();

    const newAttempt: GuessAttempt = {
      guessNumber: currentGuessIndex + 1,
      duration: currentDuration,
      text: 'Skipped',
      isCorrect: false,
      isSkip: true,
    };

    const nextGuesses = [...guesses, newAttempt];
    setGuesses(nextGuesses);

    if (currentGuessIndex >= 4) {
      // Defeat on last skip
      setStatus('lost');
      setStats((prev) => {
        const guessDist = { ...prev.guessDistribution };
        guessDist.failed = (guessDist.failed || 0) + 1;
        return {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          currentStreak: 0,
          guessDistribution: guessDist,
        };
      });
    } else {
      const nextIndex = currentGuessIndex + 1;
      setCurrentGuessIndex(nextIndex);

      // Auto-play the new extended duration from the beginning (0.0s)
      const nextDur = GUESS_DURATIONS[nextIndex];

      setTimeout(() => {
        setIsPlayingAudio(true);
        audioEngine.playSnippet(
          currentSong.previewUrl,
          nextDur,
          0,
          (currentSec, _totalSec, ratio) => {
            setPlaybackCurrentSec(currentSec);
            setPlaybackRatio(ratio);
          },
          () => {
            setIsPlayingAudio(false);
            setPlaybackRatio(0);
            setPlaybackCurrentSec(0);
          }
        );
      }, 150);
    }
  }, [currentSong, status, stopAudio, currentGuessIndex, currentDuration, guesses]);

  const nextRound = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  const returnToLobby = useCallback(() => {
    stopAudio();
    setStatus('idle');
  }, [stopAudio]);

  // Spacebar global listener to replay snippet while in game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        if (status === 'playing') {
          if (isPlayingAudio) {
            stopAudio();
          } else {
            playSnippet();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, isPlayingAudio, playSnippet, stopAudio]);

  return (
    <GameContext.Provider
      value={{
        status,
        currentSong,
        gameMode,
        difficulty,
        category,
        era,
        region,
        currentGuessIndex,
        guesses,
        currentDuration,
        scoreBreakdown,
        isPlayingAudio,
        playbackRatio,
        playbackCurrentSec,
        isMuted,
        volume,
        stats,
        username,
        showStatsModal,
        showHowToPlayModal,
        showAuthModal,
        setGameMode,
        setDifficulty,
        setCategory,
        setEra,
        setRegion,
        setUsername,
        setShowStatsModal,
        setShowHowToPlayModal,
        setShowAuthModal,
        startNewGame,
        playSnippet,
        playFullPreview,
        stopAudio,
        toggleMute,
        setVolume,
        submitGuess,
        skipTurn,
        nextRound,
        returnToLobby,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

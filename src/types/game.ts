export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'impossible';

export type GameMode = 'arcade' | 'daily' | 'campaign' | 'practice';

export type Category = 
  | 'all' 
  | 'pop' 
  | 'rock' 
  | 'hiphop' 
  | 'edm' 
  | '80s90s' 
  | 'bollywood' 
  | 'kpop' 
  | 'latin';

export type Era = 'all' | '80s' | '90s' | '2000s' | '2010s' | '2020s';

export type Region = 'global' | 'bollywood' | 'kpop' | 'latin' | 'uk' | 'japan';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  category: Category;
  era: Era;
  region: Region;
  difficulty: Difficulty;
  previewUrl: string;
  artworkUrl: string;
  offsetSeconds?: number;
  popularity?: number;
  spotifyUrl?: string;
  appleMusicUrl?: string;
}

export interface GuessAttempt {
  guessNumber: number; // 1 to 5
  duration: number;    // 0.1, 0.5, 1.5, 3.0, 8.0
  text: string;
  isCorrect: boolean;
  isSkip: boolean;
  matchedSong?: Song;
}

export type GameStatus = 'idle' | 'loading' | 'playing' | 'won' | 'lost';

export const GUESS_DURATIONS: number[] = [0.1, 0.5, 1.5, 3.0, 8.0];

export const DIFFICULTY_CONFIG: Record<Difficulty, {
  name: string;
  description: string;
  color: string;
  badgeBg: string;
  multiplier: number;
  icon: string;
}> = {
  easy: {
    name: 'Easy',
    description: 'Worldwide Mega-Hits & Global #1s (Billion+ streams, instantly recognizable)',
    color: '#00f59b',
    badgeBg: 'rgba(0, 245, 155, 0.15)',
    multiplier: 1.0,
    icon: 'Sparkles',
  },
  medium: {
    name: 'Medium',
    description: 'Popular radio singles and well-known catalog anthems',
    color: '#00e5ff',
    badgeBg: 'rgba(0, 229, 255, 0.15)',
    multiplier: 1.5,
    icon: 'Flame',
  },
  hard: {
    name: 'Hard',
    description: 'Moderately known hits, deeper chart singles & genre favorites',
    color: '#ffb703',
    badgeBg: 'rgba(255, 183, 3, 0.15)',
    multiplier: 2.2,
    icon: 'Zap',
  },
  expert: {
    name: 'Expert',
    description: 'Cult classics, critically acclaimed cuts & album tracks',
    color: '#fb8500',
    badgeBg: 'rgba(251, 133, 0, 0.15)',
    multiplier: 3.2,
    icon: 'ShieldAlert',
  },
  impossible: {
    name: 'Impossible',
    description: 'Niche B-sides, rare tracks & deep underground discography',
    color: '#ff0055',
    badgeBg: 'rgba(255, 0, 85, 0.15)',
    multiplier: 5.0,
    icon: 'Skull',
  },
};

export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    failed: number;
  };
  totalScore: number;
  level: number;
  xp: number;
  dailyStreak: number;
  lastPlayedDate?: string;
  completedDailies: string[]; // YYYY-MM-DD
}

export interface ScoreBreakdown {
  basePoints: number;
  guessBonus: number;
  difficultyMultiplier: number;
  streakMultiplier: number;
  totalScore: number;
}

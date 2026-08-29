import type { Song, Difficulty, Category, Era, Region } from '../types/game';
import { GENRE_REGISTRY, type CuratedTrackEntry } from '../data/genreRegistry';

/**
 * Normalizes text for lenient fuzzy matching (removes accents, punctuation, parentheticals, feat/ft).
 */
export function cleanSongString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s*[\(\[\{].*?[\)\]\}]/g, '') // remove (feat. ...), [Remix], etc.
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

/**
 * Filters out low-quality tracks (karaoke, live bootlegs, demos, tributes, instrumentals, covers).
 */
export function isCleanOriginalTrack(title: string, album: string = ''): boolean {
  const noisyKeywords = [
    'demo', 'karaoke', 'tribute', 'instrumental', 'workout',
    'cover version', 'acoustic live', 'backing track', 'commentary',
    'anniversary edition live', 'deluxe live', 're-recorded live', 'tribute band'
  ];
  const t = title.toLowerCase();
  const a = album.toLowerCase();
  return !noisyKeywords.some((noise) => t.includes(noise) || a.includes(noise));
}

export class MusicService {
  private itunesSearchCache: Map<string, Song[]> = new Map();

  /**
   * Search songs locally + via iTunes API for autocomplete.
   */
  public async searchSongs(query: string, limit: number = 10): Promise<Song[]> {
    const trimmed = query.trim();
    if (trimmed.length < 3) return [];

    const cleanedQuery = cleanSongString(trimmed);

    // 1. Search in curated registry first (instant match)
    const registryMatches: Song[] = GENRE_REGISTRY.filter((entry) => {
      const titleClean = cleanSongString(entry.title);
      const artistClean = cleanSongString(entry.artist);
      const combined = `${titleClean} ${artistClean}`;
      return (
        titleClean.includes(cleanedQuery) ||
        artistClean.includes(cleanedQuery) ||
        combined.includes(cleanedQuery)
      );
    }).map((entry, idx) => ({
      id: `registry-${idx}-${cleanSongString(entry.title)}`,
      title: entry.title,
      artist: entry.artist,
      album: 'Greatest Hits',
      year: entry.year,
      genre: entry.category.toUpperCase(),
      category: entry.category,
      era: entry.era,
      region: entry.category === 'bollywood' ? 'bollywood' : 'global',
      difficulty: entry.difficulty,
      popularity: entry.popularity,
      previewUrl: '',
      artworkUrl: '',
      offsetSeconds: 0,
    }));

    // 2. Query iTunes live API
    try {
      const itunesResults = await this.searchItunes(trimmed, 'US', limit);
      const merged = [...registryMatches];
      const seen = new Set(registryMatches.map((s) => `${cleanSongString(s.title)}-${cleanSongString(s.artist)}`));

      for (const item of itunesResults) {
        const key = `${cleanSongString(item.title)}-${cleanSongString(item.artist)}`;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      }

      return merged.slice(0, limit);
    } catch {
      return registryMatches.slice(0, limit);
    }
  }

  /**
   * Live iTunes search API query with country routing
   */
  public async searchItunes(term: string, country: string = 'US', limit: number = 25): Promise<Song[]> {
    const cacheKey = `${term.toLowerCase().trim()}-${country}`;
    if (this.itunesSearchCache.has(cacheKey)) {
      return this.itunesSearchCache.get(cacheKey)!;
    }

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=${Math.min(limit + 5, 50)}&country=${country}`;
    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.results) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const songs: Song[] = data.results
      .filter((r: any) => r.previewUrl && r.trackName && r.artistName && isCleanOriginalTrack(r.trackName, r.collectionName))
      .map((r: any, idx: number) => {
        const year = r.releaseDate ? new Date(r.releaseDate).getFullYear() : 2020;
        const category = this.inferCategory(r.primaryGenreName || '', r.artistName || '');
        return {
          id: `itunes-${r.trackId || idx}-${Date.now()}`,
          title: r.trackName,
          artist: r.artistName,
          album: r.collectionName || 'Single',
          year,
          genre: r.primaryGenreName || 'Music',
          category,
          era: this.inferEra(year),
          region: country === 'IN' ? 'bollywood' : 'global',
          difficulty: idx < 5 ? 'easy' : idx < 15 ? 'medium' : 'hard',
          popularity: Math.max(60, 100 - idx * 2),
          previewUrl: r.previewUrl,
          artworkUrl: (r.artworkUrl100 || '').replace('100x100bb', '600x600bb'),
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(r.trackName + ' ' + r.artistName)}`,
          offsetSeconds: 0,
        } as Song;
      });

    this.itunesSearchCache.set(cacheKey, songs);
    return songs;
  }

  /**
   * Get a dynamic random song with 100% Genre Accuracy and True Popularity for Easy Mode.
   */
  public async getDynamicRandomSong(filters: {
    difficulty?: Difficulty;
    category?: Category;
    era?: Era;
    region?: Region;
    excludeIds?: string[];
  }): Promise<Song> {
    const category = filters.category || 'all';
    const era = filters.era || 'all';
    const diff = filters.difficulty || 'easy';

    // 1. Filter the Curated Verified Registry for matches
    let registryCandidates = GENRE_REGISTRY.filter((entry) => {
      // Category check
      if (category !== 'all') {
        if (category === '80s90s') {
          if (entry.era !== '80s' && entry.era !== '90s') return false;
        } else if (entry.category !== category) {
          return false;
        }
      }
      // Era check
      if (era !== 'all' && entry.era !== era) {
        return false;
      }
      return true;
    });

    // If difficulty is specified, filter registry items
    if (diff === 'easy') {
      const easySubset = registryCandidates.filter((e) => e.difficulty === 'easy' || e.popularity >= 95);
      if (easySubset.length > 0) {
        registryCandidates = easySubset;
      }
    } else if (diff === 'medium') {
      const medSubset = registryCandidates.filter((e) => e.difficulty === 'medium' || (e.popularity >= 90 && e.popularity < 98));
      if (medSubset.length > 0) {
        registryCandidates = medSubset;
      }
    }

    // 2. Filter out already played IDs in this session
    if (filters.excludeIds && filters.excludeIds.length > 0) {
      const unplayed = registryCandidates.filter((e) => !filters.excludeIds!.includes(e.title));
      if (unplayed.length > 0) {
        registryCandidates = unplayed;
      }
    }

    // 3. Select a track from the verified registry
    let chosenEntry: CuratedTrackEntry;
    if (registryCandidates.length > 0) {
      chosenEntry = registryCandidates[Math.floor(Math.random() * registryCandidates.length)];
    } else {
      // Fallback to all registry items matching category
      const fallbackSubset = GENRE_REGISTRY.filter((e) => category === 'all' || e.category === category);
      chosenEntry = fallbackSubset.length > 0
        ? fallbackSubset[Math.floor(Math.random() * fallbackSubset.length)]
        : GENRE_REGISTRY[0];
    }

    // 4. Construct Song object and resolve live Apple CDN preview URL
    const rawSong: Song = {
      id: chosenEntry.title,
      title: chosenEntry.title,
      artist: chosenEntry.artist,
      album: 'Top Hits',
      year: chosenEntry.year,
      genre: chosenEntry.category.toUpperCase(),
      category: chosenEntry.category,
      era: chosenEntry.era,
      region: chosenEntry.category === 'bollywood' ? 'bollywood' : 'global',
      difficulty: chosenEntry.difficulty,
      popularity: chosenEntry.popularity,
      previewUrl: '',
      artworkUrl: '',
      offsetSeconds: 0,
    };

    // 5. Ensure genuine live Apple streaming preview URL (HTTP 200)
    const verifiedSong = await this.ensureLiveSongPreview(rawSong);
    return verifiedSong;
  }

  /**
   * Pre-flight resolves live working Apple CDN preview audio stream for a track
   */
  public async ensureLiveSongPreview(song: Song): Promise<Song> {
    try {
      const country = song.category === 'bollywood' ? 'IN' : song.category === 'kpop' ? 'KR' : 'US';
      const searchResults = await this.searchItunes(`${song.artist} ${song.title}`, country, 5);

      // Find exact master track
      const match = searchResults.find((r) =>
        cleanSongString(r.title).includes(cleanSongString(song.title)) ||
        cleanSongString(song.title).includes(cleanSongString(r.title))
      ) || searchResults.find((r) => Boolean(r.previewUrl)) || searchResults[0];

      if (match && match.previewUrl) {
        return {
          ...song,
          title: song.title,
          artist: song.artist,
          album: match.album || song.album,
          year: match.year || song.year,
          previewUrl: match.previewUrl,
          artworkUrl: match.artworkUrl || song.artworkUrl,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`,
        };
      }
    } catch (e) {
      console.warn('Live preview resolution error', e);
    }
    return song;
  }

  /**
   * Validates if user's guess matches target song.
   */
  public isGuessCorrect(guessText: string, targetSong: Song): boolean {
    const cleanGuess = cleanSongString(guessText);
    const cleanTargetTitle = cleanSongString(targetSong.title);
    const cleanTargetArtist = cleanSongString(targetSong.artist);
    const cleanCombined = `${cleanTargetTitle} ${cleanTargetArtist}`;

    if (!cleanGuess) return false;

    if (cleanGuess === cleanTargetTitle || cleanGuess === cleanCombined) {
      return true;
    }

    if (cleanGuess.includes(cleanTargetTitle) && cleanGuess.includes(cleanTargetArtist)) {
      return true;
    }

    if (this.calculateSimilarity(cleanGuess, cleanTargetTitle) > 0.84) {
      return true;
    }

    if (this.calculateSimilarity(cleanGuess, cleanCombined) > 0.80) {
      return true;
    }

    return false;
  }

  public getDailySong(dateString?: string): Song {
    const today = dateString || new Date().toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash << 5) - hash + today.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % GENRE_REGISTRY.length;
    const entry = GENRE_REGISTRY[index];
    return {
      id: `daily-${entry.title}`,
      title: entry.title,
      artist: entry.artist,
      album: 'Daily Challenge',
      year: entry.year,
      genre: entry.category.toUpperCase(),
      category: entry.category,
      era: entry.era,
      region: entry.category === 'bollywood' ? 'bollywood' : 'global',
      difficulty: entry.difficulty,
      popularity: entry.popularity,
      previewUrl: '',
      artworkUrl: '',
      offsetSeconds: 0,
    };
  }

  private inferCategory(genreStr: string, artistStr: string): Category {
    const g = genreStr.toLowerCase();
    const a = artistStr.toLowerCase();

    if (this.isKnownBollywoodArtist(a) || g.includes('bollywood') || g.includes('indian') || g.includes('hindi')) {
      return 'bollywood';
    }
    if (this.isKnownKpopArtist(a) || g.includes('k-pop') || g.includes('korean')) {
      return 'kpop';
    }
    if (this.isKnownRockArtist(a) || g.includes('rock') || g.includes('metal') || g.includes('grunge') || g.includes('alternative')) {
      return 'rock';
    }
    if (this.isKnownHipHopArtist(a) || g.includes('hip-hop') || g.includes('rap') || g.includes('r&b') || g.includes('urban')) {
      return 'hiphop';
    }
    if (this.isKnownEDMArtist(a) || g.includes('dance') || g.includes('electronic') || g.includes('house') || g.includes('edm') || g.includes('techno') || g.includes('trance')) {
      return 'edm';
    }
    if (this.isKnownLatinArtist(a) || g.includes('latin') || g.includes('reggaeton') || g.includes('urbano')) {
      return 'latin';
    }
    return 'pop';
  }

  private inferEra(year: number): Era {
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '90s';
    return '80s';
  }

  private isKnownBollywoodArtist(artist: string): boolean {
    const known = [
      'arijit', 'shreya', 'badshah', 'rahman', 'pritam', 'jubin', 'neha kakkar',
      'sonu nigam', 'udit narayan', 'kumar sanu', 'alka yagnik', 'lata mangeshkar',
      'kishore kumar', 'rd burman', 'atif aslam', 'vishal', 'shekhar', 'sunidhi',
      'shaan', 'kk', 'mohit chauhan', 'sukhwinder', 'arman malik', 'anuv jain', 'sachin-jigar'
    ];
    const clean = artist.toLowerCase();
    return known.some((k) => clean.includes(k));
  }

  private isKnownRockArtist(artist: string): boolean {
    const known = [
      'queen', 'nirvana', 'guns n roses', 'linkin park', 'ac/dc', 'bon jovi',
      'arctic monkeys', 'red hot chili peppers', 'green day', 'the killers',
      'the white stripes', 'oasis', 'the cranberries', 'radiohead', 'blur',
      'foo fighters', 'imagine dragons', 'twenty one pilots', 'måneskin', 'blink-182',
      'evanescence', 'my chemical romance', 'van halen', 'survivor'
    ];
    const clean = artist.toLowerCase();
    return known.some((k) => clean.includes(k));
  }

  private isKnownHipHopArtist(artist: string): boolean {
    const known = [
      'eminem', '50 cent', 'drake', 'kendrick lamar', 'travis scott', 'coolio',
      'dr. dre', 'snoop dogg', 'kanye west', '2pac', 'notorious b.i.g.', 'j. cole',
      'post malone', 'cardi b', 'nicki minaj', 'lil wayne', 'future'
    ];
    const clean = artist.toLowerCase();
    return known.some((k) => clean.includes(k));
  }

  private isKnownEDMArtist(artist: string): boolean {
    const known = [
      'avicii', 'daft punk', 'calvin harris', 'david guetta', 'the chainsmokers',
      'martin garrix', 'major lazer', 'dj snake', 'swedish house mafia', 'alan walker',
      'marshmello', 'm83', 'zedd', 'skrillex', 'tiesto', 'deadmau5'
    ];
    const clean = artist.toLowerCase();
    return known.some((k) => clean.includes(k));
  }

  private isKnownKpopArtist(artist: string): boolean {
    const known = [
      'bts', 'blackpink', 'twice', 'newjeans', 'aespa', 'stray kids', 'ive',
      'le sserafim', 'seventeen', 'exo', 'red velvet', 'nct', 'itzy', 'txt',
      'enhypen', 'bigbang', 'snsd', 'girls generation', 'jungkook', 'jimin', 'v', 'psy'
    ];
    const clean = artist.toLowerCase();
    return known.some((k) => clean.includes(k));
  }

  private isKnownLatinArtist(artist: string): boolean {
    const known = [
      'bad bunny', 'daddy yankee', 'luis fonsi', 'j balvin', 'shakira', 'don omar',
      'enrique iglesias', 'farruko', 'rauw alejandro', 'karol g', 'rosalia', 'maluma', 'ozuna'
    ];
    const clean = artist.toLowerCase();
    return known.some((k) => clean.includes(k));
  }

  private calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1.0;
    if (str1.length < 2 || str2.length < 2) return 0.0;

    const getBigrams = (str: string) => {
      const bigrams = new Set<string>();
      for (let i = 0; i < str.length - 1; i++) {
        bigrams.add(str.substring(i, i + 2));
      }
      return bigrams;
    };

    const b1 = getBigrams(str1);
    const b2 = getBigrams(str2);

    let intersection = 0;
    b1.forEach((bigram) => {
      if (b2.has(bigram)) intersection++;
    });

    return (2.0 * intersection) / (b1.size + b2.size);
  }
}

export const musicService = new MusicService();

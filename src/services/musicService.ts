import type { Song, Difficulty, Category, Era, Region } from '../types/game';
import { SONG_DATABASE } from '../data/songDatabase';

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
 * Filters out low-quality tracks (karaoke, live bootlegs, demos, tributes, instrumentals).
 */
export function isCleanOriginalTrack(title: string, album: string = ''): boolean {
  const noisyKeywords = [
    'demo', 'karaoke', 'tribute', 'instrumental', 'workout',
    'cover version', 'acoustic live', 'backing track', 'commentary',
    'anniversary edition live', 'deluxe live', 're-recorded live'
  ];
  const t = title.toLowerCase();
  const a = album.toLowerCase();
  return !noisyKeywords.some((noise) => t.includes(noise) || a.includes(noise));
}

/**
 * Specific search queries matrix tailored to genre + era combinations
 * for high-precision track discovery.
 */
const TARGETED_QUERY_MATRIX: Record<Category, Partial<Record<Era, { query: string; country: string }>>> = {
  all: {
    all: { query: 'billboard greatest hits all time hot 100', country: 'US' },
    '2020s': { query: '2020s top billboard streaming hits', country: 'US' },
    '2010s': { query: '2010s greatest hits billboard', country: 'US' },
    '2000s': { query: '2000s y2k billboard greatest hits', country: 'US' },
    '90s': { query: '90s greatest billboard hits', country: 'US' },
    '80s': { query: '80s greatest hits billboard number one', country: 'US' },
  },
  bollywood: {
    all: { query: 'bollywood greatest hits arijit shreya rahman', country: 'IN' },
    '2020s': { query: '2020s bollywood hits arijit singh badshah pritam jubin', country: 'IN' },
    '2010s': { query: '2010s bollywood hits arijit atif aslam shreya rahman pritam', country: 'IN' },
    '2000s': { query: '2000s bollywood hits sonu nigam kk shaan udit sunidhi', country: 'IN' },
    '90s': { query: '1990s 90s bollywood classics kumar sanu udit narayan alka yagnik', country: 'IN' },
    '80s': { query: '1980s 80s bollywood classics kishore kumar lata mangeshkar r d burman', country: 'IN' },
  },
  pop: {
    all: { query: 'top pop hits billboard hot 100 all time', country: 'US' },
    '2020s': { query: '2020s pop hits dua lipa the weeknd olivia rodrigo billie', country: 'US' },
    '2010s': { query: '2010s pop hits taylor swift bruno mars katy perry ed sheeran', country: 'US' },
    '2000s': { query: '2000s pop hits britney spears rihanna lady gaga justin timberlake', country: 'US' },
    '90s': { query: '90s pop hits backstreet boys spice girls madonna celine dion', country: 'US' },
    '80s': { query: '80s pop hits michael jackson madonna wham cyndi lauper prince', country: 'US' },
  },
  rock: {
    all: { query: 'classic rock greatest anthems queen nirvana guns n roses', country: 'US' },
    '2020s': { query: '2020s modern rock alternative hits', country: 'US' },
    '2010s': { query: '2010s indie rock alternative arctic monkeys imagine dragons', country: 'US' },
    '2000s': { query: '2000s alt rock linkin park green day blink 182 foo fighters', country: 'US' },
    '90s': { query: '90s grunge rock nirvana pearl jam red hot chili peppers oasis', country: 'US' },
    '80s': { query: '80s hard rock guns n roses queen acdc bon jovi def leppard', country: 'US' },
  },
  hiphop: {
    all: { query: 'top hip hop rap hits eminem drake kendrick 50 cent', country: 'US' },
    '2020s': { query: '2020s hip hop drake travis scott jack harlow lil baby', country: 'US' },
    '2010s': { query: '2010s hip hop kendrick lamar drake j cole future kanye', country: 'US' },
    '2000s': { query: '2000s hip hop eminem 50 cent kanye west snoop dogg nelly', country: 'US' },
    '90s': { query: '90s hip hop 2pac notorious big snoop dogg dr dre wu tang', country: 'US' },
    '80s': { query: '80s hip hop run dmc beastie boys public enemy ll cool j', country: 'US' },
  },
  edm: {
    all: { query: 'top edm electronic dance hits avicii daft punk calvin harris', country: 'US' },
    '2020s': { query: '2020s dance electronic hits fred again calvin harris tiesto', country: 'US' },
    '2010s': { query: '2010s edm avicii calvin harris swedish house mafia zedd skrillex', country: 'US' },
    '2000s': { query: '2000s club dance daft punk deadmau5 david guetta benny benassi', country: 'US' },
    '90s': { query: '90s eurodance electronic daft punk prodigy fatboy slim', country: 'US' },
    '80s': { query: '80s synthwave electronic new order depeche mode pet shop boys', country: 'US' },
  },
  '80s90s': {
    all: { query: '80s 90s billboard number one greatest hits', country: 'US' },
    '90s': { query: '90s greatest hits billboard number one', country: 'US' },
    '80s': { query: '80s greatest hits billboard number one', country: 'US' },
  },
  kpop: {
    all: { query: 'kpop greatest hits bts blackpink twice newjeans', country: 'KR' },
    '2020s': { query: '2020s kpop hits newjeans ive aespa le sserafim stray kids bts', country: 'KR' },
    '2010s': { query: '2010s kpop bts blackpink exo twice bigbang snsd', country: 'KR' },
    '2000s': { query: '2000s kpop bigbang super junior girls generation shinee wonder girls', country: 'KR' },
  },
  latin: {
    all: { query: 'top latin reggaeton hits despacito bad bunny daddy yankee', country: 'US' },
    '2020s': { query: '2020s latin bad bunny rauw alejandro feid karol g peso pluma', country: 'US' },
    '2010s': { query: '2010s latin reggaeton despacito j balvin ozuna maluma daddy yankee', country: 'US' },
    '2000s': { query: '2000s reggaeton daddy yankee don omar shakira wisin yandel', country: 'US' },
    '90s': { query: '90s latin pop ricky martin enrique iglesias selena gloria estefan', country: 'US' },
  },
};

export class MusicService {
  private localSongs: Song[] = SONG_DATABASE;
  private itunesSearchCache: Map<string, Song[]> = new Map();
  private dynamicPoolByKey: Map<string, Song[]> = new Map();

  constructor() {
    // Dynamic pools will be loaded on-demand from live Apple charts
  }

  /**
   * Search songs locally + via iTunes API for autocomplete.
   */
  public async searchSongs(query: string, limit: number = 10): Promise<Song[]> {
    const trimmed = query.trim();
    if (trimmed.length < 3) return [];

    const cleanedQuery = cleanSongString(trimmed);

    // 1. Search in local & cached dynamic songs
    const allKnownSongs = this.getAllKnownSongs();
    const localMatches = allKnownSongs.filter((song) => {
      const titleClean = cleanSongString(song.title);
      const artistClean = cleanSongString(song.artist);
      const combined = `${titleClean} ${artistClean}`;
      return (
        titleClean.includes(cleanedQuery) ||
        artistClean.includes(cleanedQuery) ||
        combined.includes(cleanedQuery)
      );
    });

    if (localMatches.length >= limit) {
      return localMatches.slice(0, limit);
    }

    // 2. Query iTunes live API
    try {
      const itunesResults = await this.searchItunes(trimmed, 'US', limit);
      const merged = [...localMatches];
      const seen = new Set(localMatches.map((s) => `${cleanSongString(s.title)}-${cleanSongString(s.artist)}`));

      for (const item of itunesResults) {
        const key = `${cleanSongString(item.title)}-${cleanSongString(item.artist)}`;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      }

      return merged.slice(0, limit);
    } catch {
      return localMatches.slice(0, limit);
    }
  }

  /**
   * Live iTunes search API query with country routing
   */
  public async searchItunes(term: string, country: string = 'US', limit: number = 30): Promise<Song[]> {
    const cacheKey = `${term.toLowerCase().trim()}-${country}`;
    if (this.itunesSearchCache.has(cacheKey)) {
      return this.itunesSearchCache.get(cacheKey)!;
    }

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=${Math.min(limit + 10, 50)}&country=${country}`;
    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.results) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const songs: Song[] = data.results
      .filter((r: any) => r.previewUrl && r.trackName && r.artistName && isCleanOriginalTrack(r.trackName, r.collectionName))
      .map((r: any, idx: number) => {
        const year = r.releaseDate ? new Date(r.releaseDate).getFullYear() : 2020;
        return {
          id: `itunes-${r.trackId || idx}-${Date.now()}`,
          title: r.trackName,
          artist: r.artistName,
          album: r.collectionName || 'Single',
          year,
          genre: r.primaryGenreName || 'Pop',
          category: this.inferCategory(r.primaryGenreName || ''),
          era: this.inferEra(year),
          region: country === 'IN' ? 'bollywood' : 'global',
          difficulty: idx < 10 ? 'easy' : idx < 25 ? 'medium' : idx < 40 ? 'hard' : 'expert',
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
   * Fetch Live Targeted Chart Songs strictly matching category and era
   */
  public async fetchFilteredSongPool(category: Category, era: Era = 'all'): Promise<Song[]> {
    const poolKey = `${category}-${era}`;
    const cached = this.dynamicPoolByKey.get(poolKey);
    if (cached && cached.length >= 15) {
      return cached;
    }

    let rawSongs: Song[] = [];

    // 1. Check if we have an Apple Top 100 RSS feed for this
    if (era === 'all' && (category === 'all' || category === 'pop' || category === 'rock' || category === 'hiphop' || category === 'edm' || category === 'latin' || category === 'bollywood')) {
      const rssMap: Record<string, string> = {
        all: 'https://itunes.apple.com/us/rss/topsongs/limit=100/json',
        pop: 'https://itunes.apple.com/us/rss/topsongs/limit=100/genre=14/json',
        rock: 'https://itunes.apple.com/us/rss/topsongs/limit=100/genre=21/json',
        hiphop: 'https://itunes.apple.com/us/rss/topsongs/limit=100/genre=18/json',
        edm: 'https://itunes.apple.com/us/rss/topsongs/limit=100/genre=17/json',
        latin: 'https://itunes.apple.com/us/rss/topsongs/limit=100/genre=12/json',
        bollywood: 'https://itunes.apple.com/in/rss/topsongs/limit=100/json',
      };
      const rssUrl = rssMap[category];
      if (rssUrl) {
        rawSongs = await this.fetchAppleRssChart(rssUrl, category);
      }
    }

    // 2. Query targeted search terms
    if (rawSongs.length < 15) {
      const target = TARGETED_QUERY_MATRIX[category]?.[era] ||
                     TARGETED_QUERY_MATRIX[category]?.all ||
                     TARGETED_QUERY_MATRIX.all[era] ||
                     TARGETED_QUERY_MATRIX.all.all!;

      const searchResults = await this.searchItunes(target.query, target.country, 40);
      rawSongs = [...rawSongs, ...searchResults];
    }

    // 3. Strict Post-Filter Verification for Era & Category
    const validatedSongs = rawSongs.filter((song) => {
      if (!song.previewUrl) return false;
      return this.validateSongMatchesFilters(song, category, era);
    });

    // 4. Prioritize live dynamic songs from Apple charts, using local curated songs as backup
    const localMatching = this.localSongs.filter((song) =>
      this.validateSongMatchesFilters(song, category, era)
    );

    const merged = validatedSongs.length >= 10 
      ? validatedSongs 
      : [...validatedSongs, ...localMatching];

    const seen = new Set<string>();
    const deduplicated: Song[] = [];

    for (const s of merged) {
      const key = `${cleanSongString(s.title)}-${cleanSongString(s.artist)}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(s);
      }
    }

    const finalPool = deduplicated.length > 0 ? deduplicated : this.localSongs;
    this.dynamicPoolByKey.set(poolKey, finalPool);
    return finalPool;
  }

  /**
   * Strict validation rule enforcing that the song satisfies the selected filters
   */
  public validateSongMatchesFilters(song: Song, category: Category, era: Era): boolean {
    // 1. Validate Era
    if (era !== 'all') {
      const y = song.year;
      if (era === '2020s' && (y < 2020 || y > 2029)) return false;
      if (era === '2010s' && (y < 2010 || y > 2019)) return false;
      if (era === '2000s' && (y < 2000 || y > 2009)) return false;
      if (era === '90s' && (y < 1990 || y > 1999)) return false;
      if (era === '80s' && (y < 1980 || y > 1989)) return false;
    }

    // 2. Validate Category / Genre
    if (category !== 'all') {
      const g = (song.genre || '').toLowerCase();
      const a = (song.artist || '').toLowerCase();

      if (category === 'bollywood') {
        const isBolly = g.includes('bollywood') || g.includes('indian') || g.includes('hindi') || song.region === 'bollywood' || song.category === 'bollywood';
        if (!isBolly && !this.isKnownBollywoodArtist(a)) return false;
      } else if (category === 'kpop') {
        const isKpop = g.includes('k-pop') || g.includes('korean') || song.category === 'kpop';
        if (!isKpop && !this.isKnownKpopArtist(a)) return false;
      } else if (category === 'rock') {
        if (!g.includes('rock') && !g.includes('metal') && !g.includes('alternative') && !g.includes('punk') && !g.includes('grunge')) return false;
      } else if (category === 'edm') {
        if (!g.includes('dance') && !g.includes('electronic') && !g.includes('house') && !g.includes('edm') && !g.includes('techno') && !g.includes('trance')) return false;
      } else if (category === 'hiphop') {
        if (!g.includes('hip-hop') && !g.includes('rap') && !g.includes('r&b') && !g.includes('urban')) return false;
      } else if (category === 'latin') {
        if (!g.includes('latin') && !g.includes('reggaeton') && !g.includes('urbano')) return false;
      } else if (category === 'pop') {
        if (!g.includes('pop') && song.category !== 'pop') return false;
      }
    }

    return true;
  }

  /**
   * Get a dynamic random song tailored to current filters, strictly sorted by POPULARITY.
   * All modes start from 0.0s (natural start of the song).
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

    // 1. Fetch targeted song pool strictly matching category & era
    const pool = await this.fetchFilteredSongPool(category, era);

    // 2. Filter unplayed
    let candidates = pool.filter((s) => Boolean(s.previewUrl));

    if (filters.excludeIds && filters.excludeIds.length > 0) {
      const unplayed = candidates.filter((s) => !filters.excludeIds!.includes(s.id));
      if (unplayed.length > 0) {
        candidates = unplayed;
      }
    }

    if (candidates.length === 0) {
      candidates = pool;
    }

    // 3. Sort candidates strictly by Popularity (descending)
    candidates.sort((a, b) => (b.popularity || 75) - (a.popularity || 75));

    let chosen: Song;

    if (diff === 'easy') {
      // EASY: Strictly the Top 20% most popular / iconic mega-hits in that category (popularity >= 90)
      const topCount = Math.max(3, Math.ceil(candidates.length * 0.25));
      const topSlice = candidates.slice(0, topCount);
      chosen = topSlice[Math.floor(Math.random() * topSlice.length)];
    } else if (diff === 'medium') {
      // MEDIUM: Upper-mid popular singles (20% to 55% slice)
      const startIdx = Math.min(candidates.length - 1, Math.floor(candidates.length * 0.15));
      const endIdx = Math.max(startIdx + 3, Math.ceil(candidates.length * 0.55));
      const midSlice = candidates.slice(startIdx, endIdx);
      chosen = midSlice.length > 0 ? midSlice[Math.floor(Math.random() * midSlice.length)] : candidates[0];
    } else if (diff === 'hard') {
      // HARD: Mid-to-lower tier chart tracks (45% to 80% slice)
      const startIdx = Math.min(candidates.length - 1, Math.floor(candidates.length * 0.45));
      const endIdx = Math.max(startIdx + 3, Math.ceil(candidates.length * 0.80));
      const hardSlice = candidates.slice(startIdx, endIdx);
      chosen = hardSlice.length > 0 ? hardSlice[Math.floor(Math.random() * hardSlice.length)] : candidates[0];
    } else if (diff === 'expert') {
      // EXPERT: Deep cuts & cult favorites (65% to 95% slice)
      const startIdx = Math.min(candidates.length - 1, Math.floor(candidates.length * 0.65));
      const expertSlice = candidates.slice(startIdx);
      chosen = expertSlice.length > 0 ? expertSlice[Math.floor(Math.random() * expertSlice.length)] : candidates[0];
    } else {
      // IMPOSSIBLE: The most obscure / niche tracks in the bottom 20%
      const startIdx = Math.min(candidates.length - 1, Math.floor(candidates.length * 0.80));
      const impSlice = candidates.slice(startIdx);
      chosen = impSlice.length > 0 ? impSlice[Math.floor(Math.random() * impSlice.length)] : candidates[candidates.length - 1];
    }

    // 4. Always play all difficulties from 0.0s (start of the track)
    return {
      ...chosen,
      offsetSeconds: 0,
    };
  }

  /**
   * Helper to parse Apple Top 100 RSS JSON
   */
  private async fetchAppleRssChart(rssUrl: string, defaultCategory: Category): Promise<Song[]> {
    try {
      const response = await fetch(rssUrl);
      if (!response.ok) return [];

      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entries = data.feed?.entry || [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return entries
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((e: any) => isCleanOriginalTrack(e['im:name']?.label || '', e['im:collection']?.['im:name']?.label || ''))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((e: any, idx: number) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const audioLink = e.link?.find((l: any) => l.attributes?.type?.includes('audio'))?.attributes?.href;
          const title = e['im:name']?.label || 'Track';
          const artist = e['im:artist']?.label || 'Artist';
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const artwork = e['im:image']?.[2]?.label || e['im:image']?.[0]?.label || '';
          const releaseYear = e['im:releaseDate']?.label ? new Date(e['im:releaseDate'].label).getFullYear() : 2020;
          const genre = e.category?.attributes?.label || 'Pop';

          return {
            id: `chart-${idx}-${cleanSongString(title)}`,
            title,
            artist,
            album: e['im:collection']?.['im:name']?.label || 'Top Hits',
            year: releaseYear,
            genre,
            category: defaultCategory,
            era: this.inferEra(releaseYear),
            region: defaultCategory === 'bollywood' ? 'bollywood' : 'global',
            difficulty: idx < 15 ? 'easy' : idx < 45 ? 'medium' : 'hard',
            popularity: Math.max(65, 100 - idx),
            previewUrl: audioLink || '',
            artworkUrl: artwork.replace(/\/\d+x\d+bb/, '/600x600bb'),
            spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(title + ' ' + artist)}`,
            offsetSeconds: 0,
          } as Song;
        }).filter((s: Song) => Boolean(s.previewUrl));
    } catch {
      return [];
    }
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
    const index = Math.abs(hash) % this.localSongs.length;
    return this.localSongs[index];
  }

  public async ensureLiveSongPreview(song: Song): Promise<Song> {
    try {
      const country = song.region === 'bollywood' ? 'IN' : 'US';
      const results = await this.searchItunes(`${song.artist} ${song.title}`, country, 5);
      
      const exactMatch = results.find((r) => 
        cleanSongString(r.title) === cleanSongString(song.title) &&
        Boolean(r.previewUrl)
      ) || results.find((r) => Boolean(r.previewUrl));

      if (exactMatch && exactMatch.previewUrl) {
        return {
          ...song,
          title: exactMatch.title || song.title,
          artist: exactMatch.artist || song.artist,
          previewUrl: exactMatch.previewUrl,
          artworkUrl: exactMatch.artworkUrl || song.artworkUrl,
          album: exactMatch.album || song.album,
          year: exactMatch.year || song.year,
        };
      }
    } catch (e) {
      console.warn('Could not live resolve song preview', e);
    }
    return song;
  }

  private getAllKnownSongs(): Song[] {
    const all = [...this.localSongs];
    this.dynamicPoolByKey.forEach((list) => {
      all.push(...list);
    });
    return all;
  }

  private inferCategory(genreStr: string): Category {
    const g = genreStr.toLowerCase();
    if (g.includes('rock') || g.includes('metal')) return 'rock';
    if (g.includes('hip-hop') || g.includes('rap') || g.includes('r&b')) return 'hiphop';
    if (g.includes('dance') || g.includes('electronic') || g.includes('house') || g.includes('edm')) return 'edm';
    if (g.includes('latin') || g.includes('reggaeton')) return 'latin';
    if (g.includes('k-pop') || g.includes('korean') || g.includes('j-pop')) return 'kpop';
    if (g.includes('indian') || g.includes('bollywood')) return 'bollywood';
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
      'shaan', 'kk', 'mohit chauhan', 'sukhwinder', 'arman malik', 'anuv jain'
    ];
    const clean = artist.toLowerCase();
    return known.some((k) => clean.includes(k));
  }

  private isKnownKpopArtist(artist: string): boolean {
    const known = [
      'bts', 'blackpink', 'twice', 'newjeans', 'aespa', 'stray kids', 'ive',
      'le sserafim', 'seventeen', 'exo', 'red velvet', 'nct', 'itzy', 'txt',
      'enhypen', 'bigbang', 'snsd', 'girls generation', 'jungkook', 'jimin', 'v'
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

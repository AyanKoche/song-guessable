import React, { useState, useEffect, useRef } from 'react';
import { Search, FastForward, Music2, Disc, Loader2, ArrowRight } from 'lucide-react';
import type { Song } from '../types/game';
import { GUESS_DURATIONS } from '../types/game';
import { musicService } from '../services/musicService';

interface SearchBarProps {
  currentGuessIndex: number;
  onSubmitGuess: (guessText: string, matchedSong?: Song) => void;
  onSkipTurn: () => void;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentGuessIndex,
  onSubmitGuess,
  onSkipTurn,
  disabled = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextDuration = GUESS_DURATIONS[currentGuessIndex + 1] || null;

  // Query suggestions when query >= 3 chars
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const results = await musicService.searchSongs(trimmed, 8);
        if (isMounted) {
          setSuggestions(results);
          setIsOpen(results.length > 0);
          setSelectedIndex(-1);
        }
      } catch (err) {
        console.error('Search error', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  // Click outside to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSong = (song: Song) => {
    onSubmitGuess(`${song.title} - ${song.artist}`, song);
    setQuery('');
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (disabled) return;

    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelectSong(suggestions[selectedIndex]);
      return;
    }

    const trimmed = query.trim();
    if (!trimmed) return;

    // Check if query matches any current suggestion exactly
    const exactMatch = suggestions.find(
      (s) => s.title.toLowerCase() === trimmed.toLowerCase() ||
             `${s.title} ${s.artist}`.toLowerCase() === trimmed.toLowerCase()
    );

    onSubmitGuess(trimmed, exactMatch);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectSong(suggestions[selectedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', margin: '1rem 0' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.65rem', width: '100%' }}>
        {/* Search Input Container */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin-slow" color="var(--accent-emerald)" />
            ) : (
              <Search size={18} />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.trim().length >= 3 && suggestions.length > 0) {
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Know it? Search song or artist (type 3+ chars)..."
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 2.8rem',
              background: 'rgba(18, 24, 38, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'all var(--transition-fast)',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-emerald)';
              e.currentTarget.style.boxShadow = '0 0 15px var(--accent-emerald-glow)';
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.4)';
            }}
          />

          {query.length > 0 && query.length < 3 && (
            <span
              style={{
                position: 'absolute',
                right: '1rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            >
              Type {3 - query.length} more...
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <button
          type="button"
          onClick={onSkipTurn}
          disabled={disabled}
          className="btn-secondary"
          style={{
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.88rem',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
          title={nextDuration ? `Skip turn and unlock ${nextDuration}s clip` : 'Skip turn'}
        >
          <FastForward size={16} />
          <span>{nextDuration ? `Skip (+${nextDuration}s)` : 'Give Up'}</span>
        </button>

        <button
          type="submit"
          disabled={disabled || query.trim().length === 0}
          className="btn-primary"
          style={{
            padding: '0.85rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.92rem',
            whiteSpace: 'nowrap',
            opacity: disabled || query.trim().length === 0 ? 0.4 : 1,
            cursor: disabled || query.trim().length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <span>Guess</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-modal)',
            zIndex: 100,
            overflow: 'hidden',
            maxHeight: '320px',
            overflowY: 'auto',
            animation: 'scaleUp 0.15s ease-out',
          }}
        >
          <div
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-subtle)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Suggestions ({suggestions.length})
          </div>

          {suggestions.map((song, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={song.id || idx}
                onClick={() => handleSelectSong(song)}
                onMouseEnter={() => setSelectedIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  background: isSelected
                    ? 'rgba(0, 245, 155, 0.12)'
                    : 'transparent',
                  borderLeft: isSelected
                    ? '3px solid var(--accent-emerald)'
                    : '3px solid transparent',
                  transition: 'background 0.1s ease',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#1a2233',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {song.artworkUrl ? (
                    <img
                      src={song.artworkUrl}
                      alt={song.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ) : (
                    <Music2 size={20} color="var(--text-muted)" />
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: isSelected ? 'var(--accent-emerald)' : 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {song.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {song.artist} • {song.year}
                  </div>
                </div>

                <Disc size={16} color="var(--text-dim)" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

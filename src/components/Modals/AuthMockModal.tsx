import React, { useState } from 'react';
import { X, User, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const AuthMockModal: React.FC = () => {
  const { username, setUsername, showAuthModal, setShowAuthModal } = useGame();
  const [nameInput, setNameInput] = useState(username);
  const [saved, setSaved] = useState(false);

  if (!showAuthModal) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed) {
      setUsername(trimmed);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setShowAuthModal(false);
      }, 1000);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <User size={22} color="var(--accent-violet)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
              Player Profile
            </h2>
          </div>
          <button
            onClick={() => setShowAuthModal(false)}
            className="btn-secondary"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Guest Mode Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0, 245, 155, 0.1)',
            border: '1px solid rgba(0, 245, 155, 0.25)',
            padding: '0.65rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--accent-emerald)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}
        >
          <ShieldCheck size={18} />
          <span>Guest Mode Active — stats are saved to your browser!</span>
        </div>

        {/* Edit Nickname Form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                marginBottom: '0.4rem',
              }}
            >
              Your Nickname / Gamer Tag
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={25}
              placeholder="Enter your listener name..."
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                background: 'rgba(18, 24, 38, 0.85)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              width: '100%',
              marginTop: '0.5rem',
            }}
          >
            {saved ? (
              <>
                <Check size={18} />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Update Nickname</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

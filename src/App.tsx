import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { AudioPlayerArena } from './components/AudioPlayerArena';
import { VictoryModal } from './components/Modals/VictoryModal';
import { GameOverModal } from './components/Modals/GameOverModal';
import { StatsModal } from './components/Modals/StatsModal';
import { HowToPlayModal } from './components/Modals/HowToPlayModal';
import { AuthMockModal } from './components/Modals/AuthMockModal';

const GameMain: React.FC = () => {
  const { status } = useGame();

  return (
    <div className="app-container">
      <Header />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {status === 'idle' ? <ModeSelector /> : <AudioPlayerArena />}
      </main>

      {/* Global Modals */}
      <VictoryModal />
      <GameOverModal />
      <StatsModal />
      <HowToPlayModal />
      <AuthMockModal />

      {/* Footer */}
      <footer
        style={{
          marginTop: '3rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.25rem',
        }}
      >
        <p>BeatGuess &bull; Progressive 0.1s - 8.0s Music Trivia Engine</p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="ambient-bg" />
      <GameMain />
    </GameProvider>
  );
};

export default App;

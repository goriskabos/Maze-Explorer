import { useState } from 'react';
import LevelSelect from '@/components/LevelSelect';
import GameCanvas from '@/components/GameCanvas';
import { LEVELS } from '@/game/levels';

type Screen = 'menu' | 'game';

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentLevelId, setCurrentLevelId] = useState(1);

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setScreen('game');
  };

  const handleMenu = () => {
    setScreen('menu');
  };

  const handleNextLevel = () => {
    const nextId = currentLevelId + 1;
    if (nextId <= LEVELS.length) {
      setCurrentLevelId(nextId);
    } else {
      setScreen('menu');
    }
  };

  return (
    <div className="w-full h-screen" style={{ overflowX: 'hidden', overflowY: screen === 'menu' ? 'auto' : 'hidden' }}>
      {screen === 'menu' && (
        <LevelSelect onSelectLevel={handleSelectLevel} />
      )}
      {screen === 'game' && (
        <GameCanvas
          key={`level-${currentLevelId}-${Date.now()}`}
          levelId={currentLevelId}
          onMenu={handleMenu}
          onNextLevel={handleNextLevel}
        />
      )}
    </div>
  );
}

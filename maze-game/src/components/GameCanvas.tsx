import { useEffect, useRef, useState, useCallback } from 'react';
import { MazeGame } from '../game/MazeGame';
import { LEVELS } from '../game/levels';
import { saveBestTime, getBestTimes } from '../game/storage';
import GameHUD from './GameHUD';
import WinScreen from './WinScreen';

interface Props {
  levelId: number;
  onMenu: () => void;
  onNextLevel: () => void;
}

const themeData: Record<string, { bg: string; accent: string; icon: string }> = {
  grass:  { bg: 'from-green-950 to-black',    accent: '#00ff66', icon: '🌿' },
  office: { bg: 'from-slate-950 to-black',    accent: '#4499ff', icon: '🏢' },
  wood:   { bg: 'from-amber-950 to-black',    accent: '#ffcc00', icon: '🌲' },
  ice:    { bg: 'from-cyan-950 to-black',     accent: '#44eeff', icon: '❄️' },
  fire:   { bg: 'from-red-950 to-black',      accent: '#ff8800', icon: '🔥' },
  space:  { bg: 'from-violet-950 to-black',   accent: '#cc00ff', icon: '🚀' },
};

function getMaxSprays(difficulty: string): number {
  switch (difficulty) {
    case 'hard':       return 2;
    case 'very-hard':  return 3;
    case 'legendary':  return 4;
    case 'deadly':     return 5;
    case 'hell':       return 6;
    default:           return 1; // easy & medium
  }
}

function getDiffLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy':      return 'Kolay';
    case 'medium':    return 'Orta';
    case 'hard':      return 'Zor';
    case 'very-hard': return 'Çok Zor';
    case 'legendary': return 'Efsanevi';
    case 'deadly':    return 'Ölümcül';
    case 'hell':      return 'Cehennem';
    default:          return 'Kolay';
  }
}

function getDiffColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':      return '#44ff88';
    case 'medium':    return '#ff9944';
    case 'hard':      return '#ff4444';
    case 'very-hard': return '#cc44ff';
    case 'legendary': return '#ffd700';
    case 'deadly':    return '#dc143c';
    case 'hell':      return '#e040fb';
    default:          return '#44ff88';
  }
}

export default function GameCanvas({ levelId, onMenu, onNextLevel }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<MazeGame | null>(null);
  const startTimeRef = useRef<number>(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [hudStartTime, setHudStartTime] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [proximity, setProximity] = useState(999);
  const [sprayRemaining, setSprayRemaining] = useState(1);
  const [sprayMax, setSprayMax] = useState(1);
  const [speedMult, setSpeedMult] = useState(1);
  const completedRef = useRef(false);

  const level = LEVELS.find(l => l.id === levelId)!;
  const td = themeData[level?.theme ?? 'grass'];
  const maxSprays = getMaxSprays(level?.difficulty ?? 'easy');

  const registerCompletion = useCallback((game: MazeGame) => {
    game.onLevelComplete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      const elapsed = Date.now() - startTimeRef.current;
      setElapsedMs(elapsed);
      const prevBest = getBestTimes()[levelId];
      if (!prevBest || elapsed < prevBest) setIsNewBest(true);
      saveBestTime(levelId, elapsed);
      game.unlockPointer();
      setLevelComplete(true);
    };
    game.onDistanceUpdate = (dist: number) => setProximity(dist);
    game.onSprayUpdate = (remaining: number, max: number) => {
      setSprayRemaining(remaining);
      setSprayMax(max);
    };
  }, [levelId]);

  useEffect(() => {
    if (!containerRef.current) return;
    const game = new MazeGame(containerRef.current);
    gameRef.current = game;
    game.loadLevel(level);
    game.setSprayCount(maxSprays);
    setSprayRemaining(maxSprays);
    setSprayMax(maxSprays);
    registerCompletion(game);

    const handlePointerLock = () => {
      const canvas = containerRef.current?.querySelector('canvas');
      setIsPointerLocked(document.pointerLockElement === canvas);
    };
    document.addEventListener('pointerlockchange', handlePointerLock);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') game.unlockPointer();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLock);
      window.removeEventListener('keydown', handleKey);
      game.destroy();
      gameRef.current = null;
    };
  }, [levelId, registerCompletion, level, maxSprays]);

  const handleStart = useCallback(() => {
    if (!containerRef.current) return;
    setGameStarted(true);
    const now = Date.now();
    startTimeRef.current = now;
    setHudStartTime(now);
    const canvas = containerRef.current.querySelector('canvas');
    if (canvas) canvas.requestPointerLock();
  }, []);

  useEffect(() => {
    gameRef.current?.setSpeed(speedMult);
  }, [speedMult]);

  const handleReplay = useCallback(() => {
    if (!gameRef.current) return;
    completedRef.current = false;
    setLevelComplete(false);
    setIsNewBest(false);
    setProximity(999);
    setGameStarted(false);
    gameRef.current.loadLevel(level);
    gameRef.current.setSprayCount(maxSprays);
    setSprayRemaining(maxSprays);
    setSprayMax(maxSprays);
    registerCompletion(gameRef.current);
  }, [level, registerCompletion, maxSprays]);

  const isClose = proximity < 14;
  const isVeryClose = proximity < 7;

  const diffLabel = getDiffLabel(level.difficulty);
  const diffColor = getDiffColor(level.difficulty);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div ref={containerRef} className="absolute inset-0" />

      {/* START SCREEN */}
      {!gameStarted && !levelComplete && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b ${td.bg}`}
          style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(12px)' }}
        >
          <div className="text-center max-w-sm px-6">
            <div className="text-5xl mb-4">{td.icon}</div>

            <div
              className="text-xs font-mono uppercase tracking-[0.3em] mb-1"
              style={{ color: diffColor }}
            >
              {diffLabel} Zorluk
            </div>

            <h2 className="text-3xl font-black text-white mb-2">{level.name}</h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">{level.description}</p>

            <div className="text-xs text-white/30 mb-6 space-y-1">
              <div>WASD — Hareket &nbsp;·&nbsp; Mouse — Kamera</div>
              <div>
                <span style={{ color: diffColor }} className="font-bold">T</span>
                {' '}— Duvar Etiketi &nbsp;·&nbsp;
                <span style={{ color: diffColor }} className="font-bold">{maxSprays}</span> hak
              </div>
              <div>ESC — Ana Menü</div>
            </div>

            <button
              onClick={handleStart}
              className="
                w-full py-4 rounded-2xl font-black text-black text-xl
                transition-all duration-200 hover:scale-105 active:scale-95
                shadow-2xl
              "
              style={{
                background: `linear-gradient(135deg, ${td.accent}, ${td.accent}99)`,
                boxShadow: `0 0 40px ${td.accent}66`,
              }}
            >
              START
            </button>

            <button
              onClick={onMenu}
              className="mt-4 w-full py-2.5 rounded-xl text-white/40 hover:text-white text-sm transition-colors hover:bg-white/5"
            >
              ← Ana Menüye Dön
            </button>
          </div>
        </div>
      )}

      {/* IN-GAME HUD */}
      {gameStarted && !levelComplete && (
        <GameHUD
          levelName={level.name}
          startTime={hudStartTime}
          onMenu={onMenu}
          isPointerLocked={isPointerLocked}
          sprayRemaining={sprayRemaining}
          sprayMax={sprayMax}
        />
      )}

      {/* SPEED BAR — right side */}
      {gameStarted && !levelComplete && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto select-none"
          onMouseDown={e => e.stopPropagation()}
        >
          <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Hız</div>
          <div
            className="text-sm font-black font-mono"
            style={{ color: speedMult >= 4 ? '#ff4444' : speedMult >= 2 ? '#ffcc00' : '#88ff88' }}
          >
            {speedMult.toFixed(1)}x
          </div>
          <div className="relative h-32 flex items-center justify-center">
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={speedMult}
              onChange={e => setSpeedMult(parseFloat(e.target.value))}
              className="appearance-none cursor-pointer"
              style={{
                writingMode: 'vertical-lr',
                direction: 'rtl',
                width: '32px',
                height: '128px',
                background: 'transparent',
                outline: 'none',
              }}
            />
            <style>{`
              input[type=range][style*="vertical-lr"]::-webkit-slider-runnable-track {
                width: 6px; border-radius: 3px;
                background: linear-gradient(to top, #88ff88 0%, #ffcc00 60%, #ff4444 100%);
              }
              input[type=range][style*="vertical-lr"]::-webkit-slider-thumb {
                appearance: none; width: 18px; height: 18px;
                border-radius: 50%; background: #fff;
                border: 2px solid rgba(0,0,0,0.5);
                cursor: pointer; box-shadow: 0 0 8px rgba(0,0,0,0.6);
              }
              input[type=range][style*="vertical-lr"]::-moz-range-thumb {
                width: 18px; height: 18px; border-radius: 50%; background: #fff;
                border: 2px solid rgba(0,0,0,0.5); cursor: pointer;
              }
            `}</style>
          </div>
          <div className="text-white/25 text-[9px]">×0.5</div>
        </div>
      )}

      {/* PROXIMITY GLOW */}
      {isClose && gameStarted && !levelComplete && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-500"
          style={{
            boxShadow: isVeryClose
              ? 'inset 0 0 100px 50px rgba(0,255,80,0.4)'
              : 'inset 0 0 70px 25px rgba(0,255,80,0.18)',
          }}
        />
      )}

      {/* VERY CLOSE TOAST */}
      {isVeryClose && gameStarted && !levelComplete && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div
            className="bg-green-500 text-white font-black text-base px-5 py-2.5 rounded-full animate-bounce tracking-wide"
            style={{ boxShadow: '0 0 30px rgba(0,255,80,0.7)' }}
          >
            ÇIKIŞ ÇOOK YAKIN!
          </div>
        </div>
      )}

      {/* WIN SCREEN */}
      {levelComplete && (
        <WinScreen
          levelId={levelId}
          elapsedMs={elapsedMs}
          isNewBest={isNewBest}
          onMenu={onMenu}
          onReplay={handleReplay}
          onNextLevel={onNextLevel}
        />
      )}
    </div>
  );
}

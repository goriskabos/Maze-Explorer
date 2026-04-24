import { useEffect, useState } from 'react';

interface Props {
  levelName: string;
  startTime: number;
  onMenu: () => void;
  isPointerLocked: boolean;
  sprayRemaining: number;
  sprayMax: number;
}

export default function GameHUD({ levelName, startTime, onMenu, isPointerLocked, sprayRemaining, sprayMax }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);
    return () => clearInterval(id);
  }, [startTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const centis = Math.floor((ms % 1000) / 10);
    if (mins > 0) return `${mins}:${String(secs).padStart(2,'0')}.${String(centis).padStart(2,'0')}`;
    return `${secs}.${String(centis).padStart(2,'0')}`;
  };

  return (
    <>
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-20">
        {/* Level name */}
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
          <div className="text-xs text-white/50 uppercase tracking-widest">Bölüm</div>
          <div className="font-bold text-sm">{levelName}</div>
        </div>

        {/* Timer */}
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-right">
          <div className="text-xs text-white/50 uppercase tracking-widest">Süre</div>
          <div className="font-mono font-bold text-lg text-yellow-400">{formatTime(elapsed)}</div>
        </div>
      </div>

      {/* Spray indicator — bottom left */}
      <div className="absolute bottom-5 left-5 pointer-events-none z-20">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1.5">
            Etiket <span className="text-white/25">(T)</span>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: sprayMax }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-white/40 transition-all duration-300"
                style={{
                  background: i < sprayRemaining ? '#ffffff' : 'transparent',
                  boxShadow: i < sprayRemaining ? '0 0 6px rgba(255,255,255,0.6)' : 'none',
                }}
              />
            ))}
            {sprayRemaining === 0 && (
              <span className="text-white/30 text-xs ml-1">bitti</span>
            )}
          </div>
        </div>
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
        <div className="w-4 h-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/70 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/70 -translate-x-1/2" />
        </div>
      </div>

      {/* Menu button */}
      <button
        onClick={onMenu}
        className="absolute top-4 left-1/2 -translate-x-1/2 mt-14 pointer-events-auto z-20
          bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 text-white/60 text-xs hover:text-white
          hover:bg-black/80 transition-all border border-white/10"
      >
        Ana Menü (ESC)
      </button>

      {/* Pointer lock overlay */}
      {!isPointerLocked && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md rounded-2xl px-8 py-6 text-center text-white border border-white/20">
            <div className="text-2xl mb-2">🖱️</div>
            <p className="font-bold text-lg mb-1">Oynamak için tıkla</p>
            <p className="text-white/50 text-sm">Fareyi kilitle ve oynamaya başla</p>
          </div>
        </div>
      )}
    </>
  );
}

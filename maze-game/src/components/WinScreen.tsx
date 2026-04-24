import { useEffect, useState } from 'react';
import { getBestTimes, formatTime } from '../game/storage';
import { LEVELS } from '../game/levels';

interface Props {
  levelId: number;
  elapsedMs: number;
  isNewBest: boolean;
  onMenu: () => void;
  onReplay: () => void;
  onNextLevel: () => void;
}

interface ThemeWin {
  gradient: string;
  borderColor: string;
  glowColor: string;
  titleColor: string;
  btnGradient: string;
  particles: string[];
  bigEmoji: string;
  completionText: string;
  subText: string;
  bgPattern: string;
}

const themeWinData: Record<string, ThemeWin> = {
  grass: {
    gradient: 'linear-gradient(145deg, #021a08 0%, #04300f 50%, #063d12 100%)',
    borderColor: '#22c55e',
    glowColor: '#16a34a',
    titleColor: '#4ade80',
    btnGradient: 'linear-gradient(135deg, #16a34a, #15803d)',
    particles: ['🌿','🍃','🌱','🌾','🍀'],
    bigEmoji: '🌿',
    completionText: 'Labirentten Çıktın!',
    subText: 'Yeşilin içinde yolunu buldun',
    bgPattern: 'radial-gradient(circle at 20% 80%, #052e16 0%, transparent 60%), radial-gradient(circle at 80% 20%, #14532d 0%, transparent 50%)',
  },
  office: {
    gradient: 'linear-gradient(145deg, #020817 0%, #0f172a 50%, #1e293b 100%)',
    borderColor: '#3b82f6',
    glowColor: '#2563eb',
    titleColor: '#60a5fa',
    btnGradient: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
    particles: ['🏢','💼','📋','🗂️','💡'],
    bigEmoji: '🏢',
    completionText: 'Ofisten Kaçtın!',
    subText: 'Sonsuz koridorları geride bıraktın',
    bgPattern: 'radial-gradient(circle at 30% 70%, #0c1a3a 0%, transparent 55%), radial-gradient(circle at 70% 30%, #172554 0%, transparent 45%)',
  },
  wood: {
    gradient: 'linear-gradient(145deg, #1c0f00 0%, #2e1a00 50%, #451f05 100%)',
    borderColor: '#d97706',
    glowColor: '#b45309',
    titleColor: '#fbbf24',
    btnGradient: 'linear-gradient(135deg, #b45309, #92400e)',
    particles: ['🌲','🪵','🍂','🌰','🪨'],
    bigEmoji: '🌲',
    completionText: 'Ormanı Geçtin!',
    subText: 'Kadim ağaçlar seni serbest bıraktı',
    bgPattern: 'radial-gradient(circle at 25% 75%, #1c0a00 0%, transparent 60%), radial-gradient(circle at 75% 25%, #3d1a00 0%, transparent 50%)',
  },
  ice: {
    gradient: 'linear-gradient(145deg, #011020 0%, #021827 50%, #03243a 100%)',
    borderColor: '#22d3ee',
    glowColor: '#0891b2',
    titleColor: '#67e8f9',
    btnGradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
    particles: ['❄️','🧊','💎','🌨️','⛄'],
    bigEmoji: '❄️',
    completionText: 'Buzdan Kurtuldun!',
    subText: 'Donmuş labirenti aştın',
    bgPattern: 'radial-gradient(circle at 20% 80%, #082032 0%, transparent 55%), radial-gradient(circle at 80% 20%, #0c3044 0%, transparent 45%)',
  },
  fire: {
    gradient: 'linear-gradient(145deg, #1a0000 0%, #2d0500 50%, #420900 100%)',
    borderColor: '#f97316',
    glowColor: '#ea580c',
    titleColor: '#fb923c',
    btnGradient: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    particles: ['🔥','💥','⚡','🌋','✨'],
    bigEmoji: '🔥',
    completionText: 'Alevlerden Sağ Çıktın!',
    subText: 'Cehennem ağzını geride bıraktın',
    bgPattern: 'radial-gradient(circle at 30% 70%, #2d0a00 0%, transparent 55%), radial-gradient(circle at 70% 30%, #450d00 0%, transparent 45%)',
  },
  space: {
    gradient: 'linear-gradient(145deg, #02000f 0%, #08002a 50%, #0d0040 100%)',
    borderColor: '#a855f7',
    glowColor: '#7c3aed',
    titleColor: '#c084fc',
    btnGradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    particles: ['🚀','⭐','🌌','💫','🛸'],
    bigEmoji: '🚀',
    completionText: 'Uzaydan Kaçtın!',
    subText: 'Kara deliği aşıp yıldızlara ulaştın',
    bgPattern: 'radial-gradient(circle at 20% 80%, #0d0030 0%, transparent 55%), radial-gradient(circle at 80% 20%, #1a0055 0%, transparent 45%)',
  },
};

function FloatingParticles({ particles, glowColor }: { particles: string[]; glowColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-lg select-none animate-bounce"
          style={{
            left: `${8 + (i * 17) % 85}%`,
            top: `${5 + (i * 23) % 80}%`,
            animationDelay: `${(i * 0.37) % 2}s`,
            animationDuration: `${2 + (i * 0.3) % 1.5}s`,
            opacity: 0.15 + (i % 5) * 0.07,
            filter: `drop-shadow(0 0 4px ${glowColor})`,
          }}
        >
          {particles[i % particles.length]}
        </div>
      ))}
    </div>
  );
}

export default function WinScreen({ levelId, elapsedMs, isNewBest, onMenu, onReplay, onNextLevel }: Props) {
  const [visible, setVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const bestTimes = getBestTimes();
  const levelConfig = LEVELS.find(l => l.id === levelId);
  const theme = levelConfig?.theme ?? 'grass';
  const tw = themeWinData[theme];
  const hasNextLevel = levelId < LEVELS.length;
  const levelName = levelConfig?.name ?? '';

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setDetailsVisible(true), 500);
    const t3 = setTimeout(() => setConfetti(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-30"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
    >
      {/* Full-screen particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti && Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${(i * 5.1) % 95}%`,
              top: `${(i * 7.3) % 90}%`,
              opacity: 0.12,
              animationDelay: `${(i * 0.2) % 3}s`,
              animationDuration: `${2.5 + (i * 0.15) % 2}s`,
            }}
          >
            {tw.particles[i % tw.particles.length]}
          </div>
        ))}
      </div>

      <div
        className={`
          relative rounded-3xl border-2 p-8 text-center shadow-2xl
          max-w-md w-full mx-4 overflow-hidden
          transition-all duration-700 ease-out
          ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-10'}
        `}
        style={{
          background: tw.gradient,
          backgroundImage: `${tw.bgPattern}, ${tw.gradient}`,
          borderColor: tw.borderColor + '88',
          boxShadow: `0 0 80px ${tw.glowColor}30, 0 0 160px ${tw.glowColor}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        <FloatingParticles particles={tw.particles} glowColor={tw.glowColor} />

        {/* Top decorative line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, transparent, ${tw.borderColor}, transparent)` }}
        />

        {/* Big emoji with glow */}
        <div
          className={`text-6xl mb-4 transition-all duration-500 delay-100 ${visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
          style={{ filter: `drop-shadow(0 0 20px ${tw.glowColor})` }}
        >
          {tw.bigEmoji}
        </div>

        {/* Level name */}
        <div
          className="text-xs font-mono uppercase tracking-[0.3em] mb-1 opacity-70"
          style={{ color: tw.titleColor }}
        >
          {levelName}
        </div>

        {/* Completion title */}
        <h2
          className="text-2xl font-black text-white mb-1 leading-tight"
        >
          Tebrikler!
        </h2>
        <p
          className="text-base font-bold mb-1"
          style={{ color: tw.titleColor }}
        >
          {tw.completionText}
        </p>
        <p className="text-white/35 text-xs mb-6">{tw.subText}</p>

        {/* Stats panel */}
        <div
          className={`
            rounded-2xl p-5 mb-5 space-y-3
            transition-all duration-500 delay-200
            ${detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: `1px solid ${tw.borderColor}33`,
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">Bitiş Süren</span>
            <span className="font-mono font-black text-3xl text-white">{formatTime(elapsedMs)}</span>
          </div>

          <div className="h-px" style={{ background: `${tw.borderColor}22` }} />

          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">En İyi Süre</span>
            {bestTimes[levelId] ? (
              <span className="font-mono font-bold text-xl" style={{ color: '#ffd700' }}>
                {formatTime(bestTimes[levelId])}
              </span>
            ) : (
              <span className="text-white/30 text-sm">—</span>
            )}
          </div>

          {isNewBest && (
            <div
              className="py-2 rounded-xl font-black text-sm tracking-wider animate-pulse"
              style={{
                background: tw.glowColor + '22',
                color: tw.titleColor,
                border: `1px solid ${tw.borderColor}44`,
              }}
            >
              🏆 YENİ REKOR!
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          className={`
            flex flex-col gap-2.5
            transition-all duration-500 delay-300
            ${detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="w-full py-3.5 rounded-2xl font-black text-white text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: tw.btnGradient,
                boxShadow: `0 4px 24px ${tw.glowColor}55`,
              }}
            >
              Sonraki Bölüm →
            </button>
          )}
          <button
            onClick={onReplay}
            className="w-full py-3 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: `${tw.borderColor}22`,
              border: `1px solid ${tw.borderColor}44`,
            }}
          >
            Tekrar Oyna
          </button>
          <button
            onClick={onMenu}
            className="w-full py-3 rounded-2xl font-semibold text-white/40 hover:text-white transition-all duration-200 hover:bg-white/5"
          >
            Ana Menüye Dön
          </button>
        </div>
      </div>
    </div>
  );
}

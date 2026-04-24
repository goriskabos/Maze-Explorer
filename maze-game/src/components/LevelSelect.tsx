import {
  EASY_LEVELS, MEDIUM_LEVELS, HARD_LEVELS, VERY_HARD_LEVELS,
  LEGENDARY_LEVELS, DEADLY_LEVELS, HELL_LEVELS, LevelConfig
} from '../game/levels';
import { getBestTimes, formatTime } from '../game/storage';

interface Props {
  onSelectLevel: (levelId: number) => void;
}

const themeColors: Record<string, { bg: string; border: string; badge: string; icon: string }> = {
  grass:  { bg: 'from-green-900/80 to-green-800/60',   border: 'border-green-500/50 hover:border-green-400',   badge: 'bg-green-500/30 text-green-200',   icon: '🌿' },
  office: { bg: 'from-slate-900/80 to-slate-800/60',   border: 'border-slate-400/40 hover:border-slate-300',   badge: 'bg-slate-500/30 text-slate-200',   icon: '🏢' },
  wood:   { bg: 'from-amber-900/80 to-amber-800/60',   border: 'border-amber-600/50 hover:border-amber-400',   badge: 'bg-amber-600/30 text-amber-200',   icon: '🌲' },
  ice:    { bg: 'from-cyan-900/80 to-cyan-800/60',     border: 'border-cyan-400/50 hover:border-cyan-300',     badge: 'bg-cyan-500/30 text-cyan-200',     icon: '❄️' },
  fire:   { bg: 'from-red-950/80 to-orange-900/60',    border: 'border-orange-500/50 hover:border-orange-400', badge: 'bg-orange-600/30 text-orange-200', icon: '🔥' },
  space:  { bg: 'from-violet-950/80 to-indigo-950/60', border: 'border-violet-500/50 hover:border-violet-400', badge: 'bg-violet-600/30 text-violet-200', icon: '🚀' },
};

function LevelCard({ level, onSelect, best }: { level: LevelConfig; onSelect: () => void; best?: number }) {
  const theme = themeColors[level.theme];
  return (
    <button
      onClick={onSelect}
      className={`
        group relative rounded-2xl border-2 p-5 text-left
        bg-gradient-to-br ${theme.bg} backdrop-blur-sm
        ${theme.border}
        transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs text-white/40 font-mono uppercase tracking-widest">
            Bölüm {level.id}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">{level.name}</h3>
        </div>
        <span className="text-2xl">{theme.icon}</span>
      </div>

      <p className="text-white/55 text-xs mb-3 leading-relaxed">{level.description}</p>

      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${theme.badge}`}>
          {level.isIndoor ? 'Kapalı Alan' : 'Açık Hava'}
        </span>
        {best ? (
          <div className="text-right">
            <div className="text-xs text-white/40">En İyi</div>
            <div className="text-sm font-mono font-bold text-yellow-400">{formatTime(best)}</div>
          </div>
        ) : (
          <span className="text-xs text-white/30">Oynanmadı</span>
        )}
      </div>

      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
}

interface SectionProps {
  label: string;
  count: number;
  accentColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  levels: LevelConfig[];
  bestTimes: Record<number, number>;
  onSelectLevel: (id: number) => void;
  glow?: string;
}

function DifficultySection({ label, count, accentColor, textColor, bgColor, borderColor, levels, bestTimes, onSelectLevel, glow }: SectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className={`h-px flex-1 ${accentColor}`} />
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${bgColor} border ${borderColor}`}
          style={glow ? { boxShadow: glow } : undefined}
        >
          <span className={`${textColor} text-xs font-black uppercase tracking-widest`}>{label}</span>
          <span className={`${textColor} opacity-60 text-xs`}>— {count} Bölüm</span>
        </div>
        <div className={`h-px flex-1 ${accentColor}`} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {levels.map(level => (
          <LevelCard
            key={level.id}
            level={level}
            onSelect={() => onSelectLevel(level.id)}
            best={bestTimes[level.id]}
          />
        ))}
      </div>
    </div>
  );
}

export default function LevelSelect({ onSelectLevel }: Props) {
  const bestTimes = getBestTimes();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden overflow-y-auto"
      style={{ background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0010 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black text-white mb-3 tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              LABIRENT
            </span>
          </h1>
          <p className="text-white/50 text-base">3D FPS Macerası — Bir bölüm seç</p>
        </div>

        <DifficultySection
          label="Kolay"
          count={EASY_LEVELS.length}
          accentColor="bg-green-500/30"
          textColor="text-green-400"
          bgColor="bg-green-500/15"
          borderColor="border-green-500/30"
          levels={EASY_LEVELS}
          bestTimes={bestTimes}
          onSelectLevel={onSelectLevel}
        />

        <DifficultySection
          label="Orta"
          count={MEDIUM_LEVELS.length}
          accentColor="bg-orange-500/30"
          textColor="text-orange-400"
          bgColor="bg-orange-500/15"
          borderColor="border-orange-500/30"
          levels={MEDIUM_LEVELS}
          bestTimes={bestTimes}
          onSelectLevel={onSelectLevel}
        />

        <DifficultySection
          label="Zor"
          count={HARD_LEVELS.length}
          accentColor="bg-red-500/30"
          textColor="text-red-400"
          bgColor="bg-red-500/15"
          borderColor="border-red-500/30"
          levels={HARD_LEVELS}
          bestTimes={bestTimes}
          onSelectLevel={onSelectLevel}
        />

        <DifficultySection
          label="Çok Zor"
          count={VERY_HARD_LEVELS.length}
          accentColor="bg-purple-500/30"
          textColor="text-purple-400"
          bgColor="bg-purple-500/15"
          borderColor="border-purple-500/30"
          levels={VERY_HARD_LEVELS}
          bestTimes={bestTimes}
          onSelectLevel={onSelectLevel}
        />

        {/* Separator */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
          <span className="text-yellow-500/60 text-xs uppercase tracking-widest font-bold">Uzman Seviyeleri</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
        </div>

        <DifficultySection
          label="Efsanevi"
          count={LEGENDARY_LEVELS.length}
          accentColor="bg-yellow-500/30"
          textColor="text-yellow-400"
          bgColor="bg-yellow-500/10"
          borderColor="border-yellow-500/40"
          levels={LEGENDARY_LEVELS}
          bestTimes={bestTimes}
          onSelectLevel={onSelectLevel}
          glow="0 0 20px rgba(234,179,8,0.25)"
        />

        <DifficultySection
          label="Ölümcül"
          count={DEADLY_LEVELS.length}
          accentColor="bg-rose-600/30"
          textColor="text-rose-400"
          bgColor="bg-rose-900/20"
          borderColor="border-rose-600/40"
          levels={DEADLY_LEVELS}
          bestTimes={bestTimes}
          onSelectLevel={onSelectLevel}
          glow="0 0 20px rgba(225,29,72,0.3)"
        />

        <DifficultySection
          label="☠ Cehennem"
          count={HELL_LEVELS.length}
          accentColor="bg-fuchsia-700/30"
          textColor="text-fuchsia-300"
          bgColor="bg-fuchsia-950/40"
          borderColor="border-fuchsia-600/50"
          levels={HELL_LEVELS}
          bestTimes={bestTimes}
          onSelectLevel={onSelectLevel}
          glow="0 0 30px rgba(192,38,211,0.4)"
        />

        <p className="text-center text-white/30 text-sm mt-6">
          Hareket: W A S D &nbsp;·&nbsp; Kamera: Mouse &nbsp;·&nbsp; T: Duvar Etiketi
        </p>
      </div>
    </div>
  );
}

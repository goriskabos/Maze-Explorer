const STORAGE_KEY = 'maze_game_best_times';

export interface BestTimes {
  [levelId: number]: number;
}

export function getBestTimes(): BestTimes {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

export function saveBestTime(levelId: number, timeMs: number) {
  const times = getBestTimes();
  if (!times[levelId] || timeMs < times[levelId]) {
    times[levelId] = timeMs;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
  }
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centis = Math.floor((ms % 1000) / 10);
  if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  }
  return `${seconds}.${String(centis).padStart(2, '0')}s`;
}

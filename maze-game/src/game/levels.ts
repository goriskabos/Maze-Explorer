export interface ExitConfig {
  openCells: [number, number][];
  direction: 'north' | 'south' | 'east' | 'west';
  centerRow: number;
  centerCol: number;
}

export interface LevelConfig {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very-hard' | 'legendary' | 'deadly' | 'hell';
  theme: 'grass' | 'office' | 'wood' | 'ice' | 'fire' | 'space';
  isIndoor: boolean;
  description: string;
  maze: number[][];
  exit: ExitConfig;
}

// ─── EASY MAZES (15x15) ───────────────────────────────────────────────────────

const grassMaze: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const officeMaze: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,1,0,0,1,0,0,0,1,0,1],
  [1,0,0,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,0,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const woodMaze: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const iceMaze: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,1,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const fireMaze: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,1,1,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,0,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ─── MEDIUM MAZES (15x15) ────────────────────────────────────────────────────

const grassMazeMed: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,0,1,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const officeMazeMed: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const woodMazeMed: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,0,1,1,1,0,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const iceMazeMed: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const fireMazeMed: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ─── HARD MAZES (17x17) ──────────────────────────────────────────────────────

const grassMazeHard: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const officeMazeHard: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,0,1,0,0,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const woodMazeHard: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const iceMazeHard: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const fireMazeHard: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ─── VERY HARD MAZES (19x19) ─────────────────────────────────────────────────

const grassMazeVH: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const officeMazeVH: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const woodMazeVH: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const iceMazeVH: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const fireMazeVH: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ─── SPACE MAZES ─────────────────────────────────────────────────────────────

const spaceMaze: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const spaceMazeMed: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const spaceMazeHard: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const spaceMazeVH: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ─── ALGORITHMIC MAZE GENERATOR ──────────────────────────────────────────────
// DFS (recursive backtracking) — produces perfect mazes with long winding paths.
// BFS from (1,1) finds the farthest reachable cell near south/east border for exit.

function lcgRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

interface GeneratedMaze { maze: number[][]; exit: ExitConfig; }

function generateMaze(rows: number, cols: number, seed: number): GeneratedMaze {
  const rand = lcgRand(seed);
  const maze: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(1));
  const visited: boolean[][] = Array.from({ length: rows }, () => new Array<boolean>(cols).fill(false));

  maze[1][1] = 0;
  visited[1][1] = true;
  const stack: [number, number][] = [[1, 1]];
  const dirs: [number, number][] = [[0, 2], [2, 0], [0, -2], [-2, 0]];

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const neighbors: [number, number][] = [];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && !visited[nr][nc]) {
        neighbors.push([nr, nc]);
      }
    }
    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const idx = Math.floor(rand() * neighbors.length);
      const [nr, nc] = neighbors[idx];
      maze[r + (nr - r) / 2][c + (nc - c) / 2] = 0;
      maze[nr][nc] = 0;
      visited[nr][nc] = true;
      stack.push([nr, nc]);
    }
  }

  // BFS from (1,1) to find distances
  const dist: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(-1));
  const bfsQ: [number, number][] = [[1, 1]];
  dist[1][1] = 0;
  for (let qi = 0; qi < bfsQ.length; qi++) {
    const [r, c] = bfsQ[qi];
    for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]] as [number, number][]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && maze[nr][nc] === 0 && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        bfsQ.push([nr, nc]);
      }
    }
  }

  // Find farthest reachable cell adjacent to south or east border
  // Prefer bottom-right area (far from start at top-left)
  let bestDist = -1;
  let bestDir: 'south' | 'east' = 'south';
  let bestRow = rows - 2;
  let bestCol = cols - 2;

  // South: row (rows-2), odd cols scanning from right
  for (let c = cols - 2; c >= 3; c -= 2) {
    if (maze[rows - 2][c] === 0 && dist[rows - 2][c] > bestDist) {
      bestDist = dist[rows - 2][c];
      bestRow = rows - 2;
      bestCol = c;
      bestDir = 'south';
    }
  }
  // East: col (cols-2), odd rows scanning from bottom
  for (let r = rows - 2; r >= 3; r -= 2) {
    if (maze[r][cols - 2] === 0 && dist[r][cols - 2] > bestDist) {
      bestDist = dist[r][cols - 2];
      bestRow = r;
      bestCol = cols - 2;
      bestDir = 'east';
    }
  }

  let exit: ExitConfig;
  if (bestDir === 'south') {
    const c = Math.max(3, Math.min(cols - 4, bestCol));
    exit = {
      direction: 'south',
      centerRow: rows - 1,
      centerCol: c,
      openCells: [[rows - 1, c - 1], [rows - 1, c], [rows - 1, c + 1]],
    };
  } else {
    const r = Math.max(3, Math.min(rows - 4, bestRow));
    exit = {
      direction: 'east',
      centerRow: r,
      centerCol: cols - 1,
      openCells: [[r - 1, cols - 1], [r, cols - 1], [r + 1, cols - 1]],
    };
  }

  return { maze, exit };
}

// ─── GENERATED SPACE MAZES ───────────────────────────────────────────────────
const _spaceLeg  = generateMaze(25, 25, 31415);
const _spaceDead = generateMaze(35, 35, 27182);
const _spaceHell = generateMaze(51, 51, 16180);

// ─── GENERATED LEGENDARY MAZES (25x25) ───────────────────────────────────────
const _leg = [7331, 8192, 9999, 12345, 54321].map(s => generateMaze(25, 25, s));

// ─── GENERATED DEADLY MAZES (35x35) ──────────────────────────────────────────
const _dead = [11111, 22222, 33333, 44444, 55555].map(s => generateMaze(35, 35, s));

// ─── GENERATED HELL MAZES (51x51) ────────────────────────────────────────────
const _hell = [99001, 99002, 99003, 99004, 99005].map(s => generateMaze(51, 51, s));

// ─── LEVEL CONFIGS ───────────────────────────────────────────────────────────

export const LEVELS: LevelConfig[] = [
  // ── EASY (1-6) ──
  {
    id: 1, name: 'Çim Labirenti', difficulty: 'easy', theme: 'grass', isIndoor: false,
    description: 'Açık havada, yemyeşil çim duvarları arasında kaybol',
    maze: grassMaze,
    exit: { direction: 'south', centerRow: 14, centerCol: 7, openCells: [[14,6],[14,7],[14,8]] },
  },
  {
    id: 2, name: 'Ofis Labirenti', difficulty: 'easy', theme: 'office', isIndoor: true,
    description: 'Kapalı ofis koridorlarında çıkış yolunu bul',
    maze: officeMaze,
    exit: { direction: 'east', centerRow: 7, centerCol: 14, openCells: [[6,14],[7,14],[8,14]] },
  },
  {
    id: 3, name: 'Tahta Labirent', difficulty: 'easy', theme: 'wood', isIndoor: false,
    description: 'Ahşap duvarlar arasında ilerle',
    maze: woodMaze,
    exit: { direction: 'south', centerRow: 14, centerCol: 10, openCells: [[14,9],[14,10],[14,11]] },
  },
  {
    id: 4, name: 'Buz Labirenti', difficulty: 'easy', theme: 'ice', isIndoor: false,
    description: 'Donmuş, kristal berraklığındaki labirenti geç',
    maze: iceMaze,
    exit: { direction: 'south', centerRow: 14, centerCol: 11, openCells: [[14,10],[14,11],[14,12]] },
  },
  {
    id: 5, name: 'Ateş Labirenti', difficulty: 'easy', theme: 'fire', isIndoor: false,
    description: 'Alevler arasından sağ çık',
    maze: fireMaze,
    exit: { direction: 'west', centerRow: 9, centerCol: 0, openCells: [[8,0],[9,0],[10,0]] },
  },
  {
    id: 6, name: 'Uzay Labirenti', difficulty: 'easy', theme: 'space', isIndoor: true,
    description: 'Karanlık uzayda yolunu bul — yıldızlar rehberin',
    maze: spaceMaze,
    exit: { direction: 'south', centerRow: 14, centerCol: 8, openCells: [[14,7],[14,8],[14,9]] },
  },
  // ── MEDIUM (7-12) ──
  {
    id: 7, name: 'Çim Labirenti II', difficulty: 'medium', theme: 'grass', isIndoor: false,
    description: 'Daha kalabalık yollar, daha uzun çıkış rotası',
    maze: grassMazeMed,
    exit: { direction: 'south', centerRow: 14, centerCol: 9, openCells: [[14,8],[14,9],[14,10]] },
  },
  {
    id: 8, name: 'Ofis Labirenti II', difficulty: 'medium', theme: 'office', isIndoor: true,
    description: 'Daha karanlık koridorlar, daha az belirgin çıkış',
    maze: officeMazeMed,
    exit: { direction: 'east', centerRow: 11, centerCol: 14, openCells: [[10,14],[11,14],[12,14]] },
  },
  {
    id: 9, name: 'Tahta Labirent II', difficulty: 'medium', theme: 'wood', isIndoor: false,
    description: 'Ahşap tuzaklar ve çıkmaz sokaklar seni bekliyor',
    maze: woodMazeMed,
    exit: { direction: 'south', centerRow: 14, centerCol: 5, openCells: [[14,4],[14,5],[14,6]] },
  },
  {
    id: 10, name: 'Buz Labirenti II', difficulty: 'medium', theme: 'ice', isIndoor: false,
    description: 'Dondurucunun içinde kaybolma, çıkış farklı tarafta',
    maze: iceMazeMed,
    exit: { direction: 'east', centerRow: 5, centerCol: 14, openCells: [[4,14],[5,14],[6,14]] },
  },
  {
    id: 11, name: 'Ateş Labirenti II', difficulty: 'medium', theme: 'fire', isIndoor: false,
    description: 'Daha yoğun alevler, daha gizemli çıkış',
    maze: fireMazeMed,
    exit: { direction: 'south', centerRow: 14, centerCol: 11, openCells: [[14,10],[14,11],[14,12]] },
  },
  {
    id: 12, name: 'Uzay Labirenti II', difficulty: 'medium', theme: 'space', isIndoor: true,
    description: 'Galaksi koridorları daha dar, çıkış daha uzak',
    maze: spaceMazeMed,
    exit: { direction: 'east', centerRow: 10, centerCol: 14, openCells: [[9,14],[10,14],[11,14]] },
  },
  // ── HARD (13-18) ──
  {
    id: 13, name: 'Çim Labirenti III', difficulty: 'hard', theme: 'grass', isIndoor: false,
    description: 'Genişlemiş alanda kaybol — çıkış çok uzaklarda',
    maze: grassMazeHard,
    exit: { direction: 'south', centerRow: 16, centerCol: 8, openCells: [[16,7],[16,8],[16,9]] },
  },
  {
    id: 14, name: 'Ofis Labirenti III', difficulty: 'hard', theme: 'office', isIndoor: true,
    description: 'Koca bir binanın koridorlarında tek başınasın',
    maze: officeMazeHard,
    exit: { direction: 'east', centerRow: 8, centerCol: 16, openCells: [[7,16],[8,16],[9,16]] },
  },
  {
    id: 15, name: 'Tahta Labirent III', difficulty: 'hard', theme: 'wood', isIndoor: false,
    description: 'Orman içinde dev bir ahşap labirent — geri dön',
    maze: woodMazeHard,
    exit: { direction: 'south', centerRow: 16, centerCol: 10, openCells: [[16,9],[16,10],[16,11]] },
  },
  {
    id: 16, name: 'Buz Labirenti III', difficulty: 'hard', theme: 'ice', isIndoor: false,
    description: 'Donmuş tüneller sonsuz gibi uzanıyor',
    maze: iceMazeHard,
    exit: { direction: 'east', centerRow: 12, centerCol: 16, openCells: [[11,16],[12,16],[13,16]] },
  },
  {
    id: 17, name: 'Ateş Labirenti III', difficulty: 'hard', theme: 'fire', isIndoor: false,
    description: 'Cehennem ağzından kaçmak kolay değil',
    maze: fireMazeHard,
    exit: { direction: 'south', centerRow: 16, centerCol: 5, openCells: [[16,4],[16,5],[16,6]] },
  },
  {
    id: 18, name: 'Uzay Labirenti III', difficulty: 'hard', theme: 'space', isIndoor: true,
    description: 'Sonsuz karanlıkta dev bir uzay istasyonu labirenti',
    maze: spaceMazeHard,
    exit: { direction: 'south', centerRow: 16, centerCol: 11, openCells: [[16,10],[16,11],[16,12]] },
  },
  // ── VERY HARD (19-24) ──
  {
    id: 19, name: 'Çim Labirenti IV', difficulty: 'very-hard', theme: 'grass', isIndoor: false,
    description: 'En büyük çim labirenti — efsanevi zorluk',
    maze: grassMazeVH,
    exit: { direction: 'south', centerRow: 18, centerCol: 9, openCells: [[18,8],[18,9],[18,10]] },
  },
  {
    id: 20, name: 'Ofis Labirenti IV', difficulty: 'very-hard', theme: 'office', isIndoor: true,
    description: 'Ucu bucağı olmayan ofis koridorları seni bekliyor',
    maze: officeMazeVH,
    exit: { direction: 'east', centerRow: 9, centerCol: 18, openCells: [[8,18],[9,18],[10,18]] },
  },
  {
    id: 21, name: 'Tahta Labirent IV', difficulty: 'very-hard', theme: 'wood', isIndoor: false,
    description: 'Kadim ormanın kalbinde yitip git',
    maze: woodMazeVH,
    exit: { direction: 'south', centerRow: 18, centerCol: 13, openCells: [[18,12],[18,13],[18,14]] },
  },
  {
    id: 22, name: 'Buz Labirenti IV', difficulty: 'very-hard', theme: 'ice', isIndoor: false,
    description: 'Sonsuz buz tünelinde yönünü bul — çıkış batıda',
    maze: iceMazeVH,
    exit: { direction: 'west', centerRow: 9, centerCol: 0, openCells: [[8,0],[9,0],[10,0]] },
  },
  {
    id: 23, name: 'Ateş Labirenti IV', difficulty: 'very-hard', theme: 'fire', isIndoor: false,
    description: 'Son bölüm — alevler her yerde, çıkış bir yerde',
    maze: fireMazeVH,
    exit: { direction: 'south', centerRow: 18, centerCol: 4, openCells: [[18,3],[18,4],[18,5]] },
  },
  {
    id: 24, name: 'Uzay Labirenti IV', difficulty: 'very-hard', theme: 'space', isIndoor: true,
    description: 'Evrenin derinliklerinde kayboldum — çıkış yok mu?',
    maze: spaceMazeVH,
    exit: { direction: 'east', centerRow: 13, centerCol: 18, openCells: [[12,18],[13,18],[14,18]] },
  },
  // ── LEGENDARY (25-30, algoritmik) ──
  {
    id: 25, name: 'Efsanevi Çim', difficulty: 'legendary', theme: 'grass', isIndoor: false,
    description: 'Efsanevi boyutta çim labirenti — sonu görünmüyor',
    maze: _leg[0].maze, exit: _leg[0].exit,
  },
  {
    id: 26, name: 'Efsanevi Ofis', difficulty: 'legendary', theme: 'office', isIndoor: true,
    description: 'Dev ofis kompleksinde çıkış yolu çok uzaklarda',
    maze: _leg[1].maze, exit: _leg[1].exit,
  },
  {
    id: 27, name: 'Efsanevi Ahşap', difficulty: 'legendary', theme: 'wood', isIndoor: false,
    description: 'Ormanın derinlerinde efsanevi bir ahşap labirent',
    maze: _leg[2].maze, exit: _leg[2].exit,
  },
  {
    id: 28, name: 'Efsanevi Buz', difficulty: 'legendary', theme: 'ice', isIndoor: false,
    description: 'Bitmez tükenmez donmuş tüneller seni bekliyor',
    maze: _leg[3].maze, exit: _leg[3].exit,
  },
  {
    id: 29, name: 'Efsanevi Ateş', difficulty: 'legendary', theme: 'fire', isIndoor: false,
    description: 'Alevlerin içinde kayboldum — bu kez gerçek',
    maze: _leg[4].maze, exit: _leg[4].exit,
  },
  {
    id: 30, name: 'Efsanevi Uzay', difficulty: 'legendary', theme: 'space', isIndoor: true,
    description: 'Efsanevi boyutta bir uzay labirenti — sonu galakside',
    maze: _spaceLeg.maze, exit: _spaceLeg.exit,
  },
  // ── DEADLY (31-36, algoritmik) ──
  {
    id: 31, name: 'Ölümcül Çim', difficulty: 'deadly', theme: 'grass', isIndoor: false,
    description: 'Ölümcül genişlikte çim labirenti — dönüş yok',
    maze: _dead[0].maze, exit: _dead[0].exit,
  },
  {
    id: 32, name: 'Ölümcül Ofis', difficulty: 'deadly', theme: 'office', isIndoor: true,
    description: 'Hiç bitmeyen ofis koridorları seni bekliyor',
    maze: _dead[1].maze, exit: _dead[1].exit,
  },
  {
    id: 33, name: 'Ölümcül Ahşap', difficulty: 'deadly', theme: 'wood', isIndoor: false,
    description: 'Tahta duvarlar arasında ölüme meydan oku',
    maze: _dead[2].maze, exit: _dead[2].exit,
  },
  {
    id: 34, name: 'Ölümcül Buz', difficulty: 'deadly', theme: 'ice', isIndoor: false,
    description: 'Dondurucu soğuğun içinde ölümcül bir labirent',
    maze: _dead[3].maze, exit: _dead[3].exit,
  },
  {
    id: 35, name: 'Ölümcül Ateş', difficulty: 'deadly', theme: 'fire', isIndoor: false,
    description: 'Bu ateş labirenti senden çok daha büyük',
    maze: _dead[4].maze, exit: _dead[4].exit,
  },
  {
    id: 36, name: 'Ölümcül Uzay', difficulty: 'deadly', theme: 'space', isIndoor: true,
    description: 'Ölümcül karanlıkta sonsuz koridorlar seni yutuyor',
    maze: _spaceDead.maze, exit: _spaceDead.exit,
  },
  // ── HELL (37-42, algoritmik) ──
  {
    id: 37, name: 'Cehennem Çim', difficulty: 'hell', theme: 'grass', isIndoor: false,
    description: 'Cehennemin ta kendisi — çim labirenti biçiminde',
    maze: _hell[0].maze, exit: _hell[0].exit,
  },
  {
    id: 38, name: 'Cehennem Ofis', difficulty: 'hell', theme: 'office', isIndoor: true,
    description: 'Bu ofiste çalışmak cehenneme dönüştü',
    maze: _hell[1].maze, exit: _hell[1].exit,
  },
  {
    id: 39, name: 'Cehennem Ahşap', difficulty: 'hell', theme: 'wood', isIndoor: false,
    description: 'Cehenneme götüren ahşap labirent',
    maze: _hell[2].maze, exit: _hell[2].exit,
  },
  {
    id: 40, name: 'Cehennem Buzu', difficulty: 'hell', theme: 'ice', isIndoor: false,
    description: 'Buz cehennemi — çıkış neredeyse imkânsız',
    maze: _hell[3].maze, exit: _hell[3].exit,
  },
  {
    id: 41, name: 'Saf Cehennem', difficulty: 'hell', theme: 'fire', isIndoor: false,
    description: 'Sonunda... saf cehennem ateşi. İyi şanslar.',
    maze: _hell[4].maze, exit: _hell[4].exit,
  },
  {
    id: 42, name: 'Cehennem Uzayı', difficulty: 'hell', theme: 'space', isIndoor: true,
    description: 'Kara deliğin içinde tuzağa düştün. İyi şanslar.',
    maze: _spaceHell.maze, exit: _spaceHell.exit,
  },
];

export const EASY_LEVELS      = LEVELS.filter(l => l.difficulty === 'easy');
export const MEDIUM_LEVELS    = LEVELS.filter(l => l.difficulty === 'medium');
export const HARD_LEVELS      = LEVELS.filter(l => l.difficulty === 'hard');
export const VERY_HARD_LEVELS = LEVELS.filter(l => l.difficulty === 'very-hard');
export const LEGENDARY_LEVELS = LEVELS.filter(l => l.difficulty === 'legendary');
export const DEADLY_LEVELS    = LEVELS.filter(l => l.difficulty === 'deadly');
export const HELL_LEVELS      = LEVELS.filter(l => l.difficulty === 'hell');

export const CELL_SIZE = 4;
export const WALL_HEIGHT = 3;
export const ROOM_DEPTH_CELLS = 3;
export const ROOM_WIDE_HALF = 2;

export function getStartPosition(): { x: number; z: number } {
  return { x: CELL_SIZE * 1.5, z: CELL_SIZE * 1.5 };
}

export function getExitRoomCenter(exit: ExitConfig): { x: number; z: number } {
  const CS = CELL_SIZE;
  const { direction, centerRow, centerCol } = exit;
  switch (direction) {
    case 'south': return { x: centerCol * CS + CS / 2, z: centerRow * CS + CS + CS * ROOM_DEPTH_CELLS / 2 };
    case 'north': return { x: centerCol * CS + CS / 2, z: centerRow * CS - CS * ROOM_DEPTH_CELLS / 2 };
    case 'east':  return { x: centerCol * CS + CS + CS * ROOM_DEPTH_CELLS / 2, z: centerRow * CS + CS / 2 };
    case 'west':  return { x: centerCol * CS - CS * ROOM_DEPTH_CELLS / 2, z: centerRow * CS + CS / 2 };
  }
}

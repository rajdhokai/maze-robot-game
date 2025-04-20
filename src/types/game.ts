export type CellType = 'WALL' | 'PATH' | 'START' | 'GOAL' | 'KEY' | 'GATE';

export interface Cell {
  type: CellType;
  row: number;
  col: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  grid: CellType[][];
  startPosition: { row: number; col: number };
  goalPosition: { row: number; col: number };
  // Optional properties for extended features
  gates?: { row: number; col: number }[];
  keys?: { row: number; col: number }[];
}

export interface RobotPosition {
  row: number;
  col: number;
  direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
}

export interface GameState {
  currentLevel: number;
  position: RobotPosition;
  isLevelComplete: boolean;
  steps: number;
  timeElapsed: number;
  collectedKeys: number;
  levelsCompleted: number[];
  isAISolving: boolean;
  aiSolution?: string[];
}

export type MoveDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export interface GameAction {
  type: 'MOVE' | 'RESET_LEVEL' | 'LOAD_LEVEL' | 'COMPLETE_LEVEL' | 'START_AI_SOLVE' | 'STOP_AI_SOLVE' | 'SET_AI_SOLUTION' | 'TICK';
  payload?: any;
}
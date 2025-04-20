import { Level } from '../types/game';

// Level 1: Simple path
const level1: Level = {
  id: 1,
  name: 'Initialization',
  description: 'Simple path to test robot functions',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'PATH', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 1, col: 5 }
};

// Level 2: Simple turn
const level2: Level = {
  id: 2,
  name: 'Navigation Protocol',
  description: 'Learn to navigate corners',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'PATH', 'PATH', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 3, col: 5 }
};

// Level 3: Multiple paths
const level3: Level = {
  id: 3,
  name: 'Decision Matrix',
  description: 'Multiple paths to explore',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 5, col: 7 }
};

// Level 4: Complex maze
const level4: Level = {
  id: 4,
  name: 'Labyrinth Circuit',
  description: 'A complex maze to test your skills',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 7, col: 9 }
};

// Level 5: Security Override
const level5: Level = {
  id: 5,
  name: 'Security Override',
  description: 'Collect key cards to open gates',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'KEY', 'PATH', 'WALL', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL', 'GATE', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 7, col: 9 },
  gates: [{ row: 6, col: 6 }],
  keys: [{ row: 3, col: 5 }],
};

// Level 6: Dual Security
const level6: Level = {
  id: 6,
  name: 'Dual Security',
  description: 'Multiple keys required to reach the exit',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'PATH', 'WALL', 'KEY', 'WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'GATE', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'WALL', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'KEY', 'WALL', 'PATH', 'PATH', 'PATH', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'GATE', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 5, col: 11 },
  gates: [{ row: 3, col: 3 }, { row: 6, col: 8 }],
  keys: [{ row: 1, col: 6 }, { row: 5, col: 6 }],
};

// Level 7: Circuit Maze
const level7: Level = {
  id: 7,
  name: 'Circuit Maze',
  description: 'Navigate through a complex circuit-like pattern',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'GOAL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 7, col: 1 }
};

// Level 8: Security Complex
const level8: Level = {
  id: 8,
  name: 'Security Complex',
  description: 'Master key collection and timing',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'WALL', 'KEY', 'PATH', 'WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'PATH', 'WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'KEY', 'PATH', 'GATE', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL', 'GOAL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'GATE', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'KEY', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'GATE', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 3, col: 9 },
  gates: [{ row: 3, col: 3 }, { row: 4, col: 9 }, { row: 6, col: 11 }],
  keys: [{ row: 1, col: 4 }, { row: 3, col: 1 }, { row: 5, col: 6 }],
};

// Level 9: The Gauntlet
const level9: Level = {
  id: 9,
  name: 'The Gauntlet',
  description: 'A true test of pathfinding skills',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'WALL', 'PATH', 'PATH', 'PATH', 'WALL', 'KEY', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'KEY', 'WALL', 'GATE', 'PATH', 'GATE', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 5, col: 13 },
  gates: [{ row: 5, col: 10 }, { row: 5, col: 12 }],
  keys: [{ row: 1, col: 8 }, { row: 5, col: 8 }],
};

// Level 10: Final Protocol
const level10: Level = {
  id: 10,
  name: 'Final Protocol',
  description: 'The ultimate challenge',
  grid: [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'START', 'PATH', 'PATH', 'PATH', 'WALL', 'KEY', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'PATH', 'KEY', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'KEY', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'GATE', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'GATE', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'PATH', 'WALL'],
    ['WALL', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'PATH', 'GATE', 'PATH', 'PATH', 'GOAL', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ],
  startPosition: { row: 1, col: 1 },
  goalPosition: { row: 7, col: 13 },
  gates: [{ row: 3, col: 8 }, { row: 4, col: 11 }, { row: 7, col: 10 }],
  keys: [{ row: 1, col: 6 }, { row: 1, col: 13 }, { row: 3, col: 1 }],
};

export const levels: Level[] = [
  level1, level2, level3, level4, level5,
  level6, level7, level8, level9, level10
];

export const getLevel = (levelId: number): Level => {
  const level = levels.find(l => l.id === levelId);
  if (!level) {
    throw new Error(`Level ${levelId} not found`);
  }
  return level;
};
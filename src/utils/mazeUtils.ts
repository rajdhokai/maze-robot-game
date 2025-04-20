import { CellType, Level, MoveDirection, RobotPosition } from '../types/game';

/**
 * Check if a move is valid (within bounds and not a wall)
 */
export const isValidMove = (
  level: Level,
  position: RobotPosition,
  direction: MoveDirection,
  collectedKeys: number // Add collectedKeys parameter
): boolean => {
  const { row, col } = position;
  let newRow = row;
  let newCol = col;

  switch (direction) {
    case 'UP':
      newRow--;
      break;
    case 'RIGHT':
      newCol++;
      break;
    case 'DOWN':
      newRow++;
      break;
    case 'LEFT':
      newCol--;
      break;
  }

  // Check if the new position is within the grid bounds
  if (
    newRow < 0 ||
    newRow >= level.grid.length ||
    newCol < 0 ||
    newCol >= level.grid[0].length
  ) {
    return false;
  }

  const cellType = level.grid[newRow][newCol];
  
  // Always block walls
  if (cellType === 'WALL') return false;
  
  // Handle gates - only passable if player has collected keys
  if (cellType === 'GATE') {
    return collectedKeys > 0;
  }

  return true;
};

/**
 * Calculate the new position after a move
 */
export const getNewPosition = (
  position: RobotPosition,
  direction: MoveDirection
): RobotPosition => {
  const { row, col } = position;
  let newRow = row;
  let newCol = col;

  switch (direction) {
    case 'UP':
      newRow--;
      break;
    case 'RIGHT':
      newCol++;
      break;
    case 'DOWN':
      newRow++;
      break;
    case 'LEFT':
      newCol--;
      break;
  }

  return {
    row: newRow,
    col: newCol,
    direction,
  };
};

/**
 * Check if the position is at the goal
 */
export const isAtGoal = (level: Level, position: RobotPosition): boolean => {
  const { row, col } = position;
  return row === level.goalPosition.row && col === level.goalPosition.col;
};

/**
 * Check if the position has a key
 */
export const hasKey = (level: Level, position: RobotPosition): boolean => {
  if (!level.keys) return false;
  
  const { row, col } = position;
  return level.keys.some(key => key.row === row && key.col === col);
};

/**
 * Simple AI solver using BFS (Breadth-First Search)
 * Returns a sequence of moves to reach the goal, or null if no solution exists
 */
export const solveMaze = (level: Level): MoveDirection[] | null => {
  const { startPosition, goalPosition, grid } = level;
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Initialize visited array
  const visited: boolean[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));
  
  // Queue for BFS
  const queue: {
    row: number;
    col: number;
    path: MoveDirection[];
  }[] = [{ row: startPosition.row, col: startPosition.col, path: [] }];
  
  // Mark starting position as visited
  visited[startPosition.row][startPosition.col] = true;
  
  // Directions: UP, RIGHT, DOWN, LEFT
  const directions: MoveDirection[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
  const rowDelta = [-1, 0, 1, 0];
  const colDelta = [0, 1, 0, -1];
  
  while (queue.length > 0) {
    const { row, col, path } = queue.shift()!;
    
    // Check if we reached the goal
    if (row === goalPosition.row && col === goalPosition.col) {
      return path;
    }
    
    // Try all four directions
    for (let i = 0; i < 4; i++) {
      const newRow = row + rowDelta[i];
      const newCol = col + colDelta[i];
      const direction = directions[i];
      
      // Check if the move is valid and the cell hasn't been visited
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] !== 'WALL' &&
        grid[newRow][newCol] !== 'GATE' &&
        !visited[newRow][newCol]
      ) {
        // Mark as visited
        visited[newRow][newCol] = true;
        
        // Add to queue with the new path
        queue.push({
          row: newRow,
          col: newCol,
          path: [...path, direction],
        });
      }
    }
  }
  
  // No solution found
  return null;
};


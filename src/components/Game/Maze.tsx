import React, { useMemo } from 'react';
import { CellType, Level, RobotPosition } from '../../types/game';

interface MazeProps {
  level: Level;
  robotPosition: RobotPosition;
  collectedKeys: number;
}

const Maze: React.FC<MazeProps> = ({ level, robotPosition, collectedKeys }) => {
  // Calculate cell size based on the maze dimensions
  const cellSize = useMemo(() => {
    const maxCols = level.grid[0].length;
    const maxRows = level.grid.length;
    const maxDimension = Math.max(maxCols, maxRows);
    return `calc((min(80vh, 80vw)) / ${maxDimension})`;
  }, [level.grid]);

  // Generate CSS grid template based on maze dimensions
  const gridTemplateColumns = `repeat(${level.grid[0].length}, ${cellSize})`;
  const gridTemplateRows = `repeat(${level.grid.length}, ${cellSize})`;

  // Cell background colors based on cell type
  const getCellBackground = (cell: CellType, row: number, col: number): string => {
    // Robot position takes precedence
    if (row === robotPosition.row && col === robotPosition.col) {
      return 'bg-blue-500';
    }
  
    switch (cell) {
      case 'WALL':
        return 'bg-gray-800 border-gray-700';
      case 'PATH':
        return 'bg-gray-100 border-gray-300';
      case 'START':
        return 'bg-blue-200 border-blue-300';
      case 'GOAL':
        return 'bg-green-500 border-green-600';
      case 'KEY':
        // Only show key if it exists in level.keys
        const keyExists = level.keys?.some(k => k.row === row && k.col === col);
        return keyExists ? 'bg-yellow-400 border-yellow-500' : 'bg-gray-100 border-gray-300';
      case 'GATE':
        // Check if this is actually a gate in level.gates
        const isGate = level.gates?.some(g => g.row === row && g.col === col);
        if (!isGate) return 'bg-gray-100 border-gray-300';
        return collectedKeys > 0 ? 'bg-gray-400 border-gray-500' : 'bg-red-500 border-red-600';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  // Cell content based on cell type
  const getCellContent = (cell: CellType, row: number, col: number) => {
    // Robot position takes precedence
    if (row === robotPosition.row && col === robotPosition.col) {
      // Adjust rotation based on direction
      const rotationDegrees = {
        UP: 0,
        RIGHT: 90,
        DOWN: 180,
        LEFT: 270,
      }[robotPosition.direction];

      return (
        <div 
          className="w-full h-full flex items-center justify-center transform transition-transform duration-200"
          style={{ transform: `rotate(${rotationDegrees}deg)` }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white w-3/4 h-3/4"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
          </svg>
        </div>
      );
    }

    switch (cell) {
      case 'GOAL':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white w-3/4 h-3/4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>
        );
      case 'KEY':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-gray-800 w-3/4 h-3/4"
            >
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>
        );
      case 'GATE':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white w-3/4 h-3/4"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="maze-container border-2 border-gray-800 rounded-lg overflow-hidden shadow-lg"
      style={{
        display: 'grid',
        gridTemplateColumns,
        gridTemplateRows,
      }}
    >
      {level.grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell border ${getCellBackground(cell, rowIndex, colIndex)} transition-all duration-200`}
            style={{
              width: cellSize,
              height: cellSize,
            }}
          >
            {getCellContent(cell, rowIndex, colIndex)}
          </div>
        ))
      )}
    </div>
  );
};

export default Maze;
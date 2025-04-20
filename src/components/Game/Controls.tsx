import React from 'react';
import { MoveDirection } from '../../types/game';
import Button from '../UI/Button';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RefreshCw,
  Brain,
  HelpCircle,
} from 'lucide-react';

interface ControlsProps {
  onMove: (direction: MoveDirection) => void;
  onReset: () => void;
  onAiSolve: () => void;
  onHelp: () => void;
  isAISolving: boolean;
  disableControls: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onMove,
  onReset,
  onAiSolve,
  onHelp,
  isAISolving,
  disableControls,
}) => {
  // Handle keyboard controls
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disableControls) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          onMove('UP');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          onMove('RIGHT');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          onMove('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          onMove('LEFT');
          break;
        case 'r':
        case 'R':
          onReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove, onReset, disableControls]);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col items-center gap-2">
        {/* Top row - Up button */}
        <div>
          <Button
            onClick={() => onMove('UP')}
            disabled={disableControls}
            className="w-14 h-14 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            icon={<ArrowUp size={24} />}
          >
            <span className="sr-only">Up</span>
          </Button>
        </div>

        {/* Middle row - Left, Reset, Right buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onMove('LEFT')}
            disabled={disableControls}
            className="w-14 h-14 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            icon={<ArrowLeft size={24} />}
          >
            <span className="sr-only">Left</span>
          </Button>

          <Button
            onClick={onReset}
            disabled={disableControls}
            className="w-14 h-14 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
            icon={<RefreshCw size={24} />}
          >
            <span className="sr-only">Reset</span>
          </Button>

          <Button
            onClick={() => onMove('RIGHT')}
            disabled={disableControls}
            className="w-14 h-14 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            icon={<ArrowRight size={24} />}
          >
            <span className="sr-only">Right</span>
          </Button>
        </div>

        {/* Bottom row - Down button */}
        <div>
          <Button
            onClick={() => onMove('DOWN')}
            disabled={disableControls}
            className="w-14 h-14 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            icon={<ArrowDown size={24} />}
          >
            <span className="sr-only">Down</span>
          </Button>
        </div>

        {/* Additional controls */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={onHelp}
            variant="ghost"
            className="text-gray-700"
            icon={<HelpCircle className="mr-2" size={20} />}
          >
            How to Play
          </Button>

          <Button
            onClick={onAiSolve}
            disabled={disableControls || isAISolving}
            variant="secondary"
            className={isAISolving ? 'bg-green-700' : ''}
            icon={<Brain className="mr-2" size={20} />}
          >
            {isAISolving ? 'AI Solving...' : 'AI Solve'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Controls;

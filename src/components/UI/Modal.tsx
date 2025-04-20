import React, { useEffect, useRef } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] mx-auto overflow-y-auto transform transition-all duration-300 animate-fade-in"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">{children}</div>

        {actions && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export const LevelCompleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  levelNumber: number;
  steps: number;
  timeElapsed: number;
  onNextLevel: () => void;
  onReplayLevel: () => void;
}> = ({
  isOpen,
  onClose,
  levelNumber,
  steps,
  timeElapsed,
  onNextLevel,
  onReplayLevel,
}) => {
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Level ${levelNumber} Complete!`}
      actions={
        <>
          <Button variant="ghost" onClick={onReplayLevel}>
            Replay Level
          </Button>
          <Button onClick={onNextLevel}>Next Level</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600 dark:text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <p className="text-center text-gray-700 dark:text-gray-300">
          You've successfully guided the robot to the exit!
        </p>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Steps</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {steps}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {formatTime(timeElapsed)}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const GameInstructionsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How to Play"
      actions={<Button onClick={onClose}>Got it!</Button>}
    >
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4 py-2">
          <p className="text-gray-700 dark:text-gray-300">
            Guide your robot through the maze to reach the exit portal.
          </p>
        </div>

        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Controls
        </h4>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">
              ↑
            </span>
            <span>Move Up</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">
              →
            </span>
            <span>Move Right</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">
              ↓
            </span>
            <span>Move Down</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">
              ←
            </span>
            <span>Move Left</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">
              R
            </span>
            <span>Reset Level</span>
          </li>
        </ul>

        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Game Elements
        </h4>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-center">
            <span className="w-6 h-6 bg-blue-500 rounded mr-2"></span>
            <span>Robot (You)</span>
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-green-500 rounded mr-2"></span>
            <span>Exit Portal (Goal)</span>
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-gray-700 rounded mr-2"></span>
            <span>Wall (Obstacle)</span>
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-yellow-500 rounded mr-2"></span>
            <span>Key Card</span>
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-red-500 rounded mr-2"></span>
            <span>Locked Gate</span>
          </li>
        </ul>

        <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-r">
          <p className="text-gray-700 dark:text-gray-300">
            Tip: Collect key cards to open gates and reach new areas of the
            maze!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;

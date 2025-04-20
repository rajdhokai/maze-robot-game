import React, { useEffect, useReducer, useState } from "react";
import Maze from "./Maze";
import Controls from "./Controls";
import { GameState, GameAction, Level, MoveDirection } from "../../types/game";
import { isValidMove, getNewPosition, isAtGoal } from "../../utils/mazeUtils";
import { getLevel } from "../../data/levels";
import {
  getLevelFromOSS,
  solveMazeWithPAI,
  saveProgressToCloud,
  loadProgressFromCloud,
} from "../../utils/alibabaCloud";
import Button from "../UI/Button";
import { GameInstructionsModal, LevelCompleteModal } from "../UI/Modal";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Initial game state
const initialState: GameState = {
  currentLevel: 1,
  position: { row: 0, col: 0, direction: "RIGHT" },
  isLevelComplete: false,
  steps: 0,
  timeElapsed: 0,
  collectedKeys: 0,
  levelsCompleted: [],
  isAISolving: false,
};

// Game reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "MOVE": {
      const direction = action.payload as MoveDirection;
      const level = getLevel(state.currentLevel);

      // Check if the move is valid with current keys
      if (!isValidMove(level, state.position, direction, state.collectedKeys)) {
        return state;
      }

      const newPosition = getNewPosition(state.position, direction);
      const newState = {
        ...state,
        position: newPosition,
        steps: state.steps + 1,
      };

      // Key collection logic
      if (level.grid[newPosition.row][newPosition.col] === "KEY") {
        const keyIndex = level.keys?.findIndex(
          (k) => k.row === newPosition.row && k.col === newPosition.col
        );

        if (keyIndex !== undefined && keyIndex !== -1) {
          // Update grid
          const updatedGrid = [...level.grid];
          updatedGrid[newPosition.row][newPosition.col] = "PATH";
          level.grid = updatedGrid;

          // Update keys array
          const updatedKeys = [...(level.keys || [])];
          updatedKeys.splice(keyIndex, 1);
          level.keys = updatedKeys;

          // Increment collected keys
          newState.collectedKeys = state.collectedKeys + 1;

          // Update gates if we now have keys
          if (newState.collectedKeys > 0) {
            level.gates?.forEach((gate) => {
              if (level.grid[gate.row][gate.col] === "GATE") {
                // This ensures gates visually update
                const gridCopy = [...level.grid];
                gridCopy[gate.row][gate.col] = "GATE";
                level.grid = gridCopy;
              }
            });
          }
        }
      }

      // Goal check
      if (isAtGoal(level, newPosition)) {
        newState.isLevelComplete = true;
        if (!state.levelsCompleted.includes(state.currentLevel)) {
          newState.levelsCompleted = [
            ...state.levelsCompleted,
            state.currentLevel,
          ];
        }
      }

      return newState;
    }

    case "RESET_LEVEL": {
      const level = getLevel(state.currentLevel);
      return {
        ...state,
        position: {
          row: level.startPosition.row,
          col: level.startPosition.col,
          direction: "RIGHT",
        },
        steps: 0,
        timeElapsed: 0,
        collectedKeys: 0, // Ensure this is reset to 0
        isLevelComplete: false,
        isAISolving: false,
        aiSolution: undefined,
      };
    }

    case "LOAD_LEVEL": {
      const level = getLevel(action.payload as number);
      return {
        ...state,
        currentLevel: action.payload as number,
        position: {
          row: level.startPosition.row,
          col: level.startPosition.col,
          direction: "RIGHT",
        },
        steps: 0,
        timeElapsed: 0,
        collectedKeys: 0, // Ensure this is reset to 0
        isLevelComplete: false,
        isAISolving: false,
        aiSolution: undefined,
      };
    }

    case "COMPLETE_LEVEL": {
      return {
        ...state,
        isLevelComplete: true,
        levelsCompleted: state.levelsCompleted.includes(state.currentLevel)
          ? state.levelsCompleted
          : [...state.levelsCompleted, state.currentLevel],
      };
    }

    case "START_AI_SOLVE": {
      return {
        ...state,
        isAISolving: true,
      };
    }

    case "STOP_AI_SOLVE": {
      return {
        ...state,
        isAISolving: false,
        aiSolution: undefined,
      };
    }

    case "SET_AI_SOLUTION": {
      return {
        ...state,
        aiSolution: action.payload,
      };
    }

    case "TICK": {
      return {
        ...state,
        timeElapsed: state.timeElapsed + 1,
      };
    }

    default:
      return state;
  }
};

const GameContainer: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [level, setLevel] = useState<Level | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [timerInterval, setTimerInterval] = useState<any | null>(null);
  const [aiMoveInterval, setAiMoveInterval] = useState<any | null>(null);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle move action
  const handleMove = (direction: MoveDirection) => {
    if (state.isLevelComplete || state.isAISolving) return;
    dispatch({ type: "MOVE", payload: direction });
  };

  // Handle reset action
  const handleReset = () => {
    dispatch({ type: "RESET_LEVEL" });
  };

  // Handle level change
  const changeLevel = (levelId: number) => {
    // Ensure the level is valid
    try {
      getLevel(levelId);
      dispatch({ type: "LOAD_LEVEL", payload: levelId });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle AI solve action
  const handleAiSolve = async () => {
    if (!level || state.isLevelComplete || state.isAISolving) return;

    dispatch({ type: "START_AI_SOLVE" });

    try {
      // Get AI solution from Alibaba Cloud PAI
      const solution = await solveMazeWithPAI(level);

      if (!solution) {
        alert("AI could not find a solution for this maze.");
        dispatch({ type: "STOP_AI_SOLVE" });
        return;
      }

      dispatch({ type: "SET_AI_SOLUTION", payload: solution });

      // Execute AI solution moves with delay
      let moveIndex = 0;

      // Reset position before starting AI moves
      handleReset();

      const interval = setInterval(() => {
        if (moveIndex < solution.length) {
          const direction = solution[moveIndex] as MoveDirection;
          dispatch({ type: "MOVE", payload: direction });
          moveIndex++;
        } else {
          clearInterval(interval);
          dispatch({ type: "STOP_AI_SOLVE" });
        }
      }, 300); // Move every 300ms

      setAiMoveInterval(interval);
    } catch (error) {
      console.error("Error during AI solving:", error);
      dispatch({ type: "STOP_AI_SOLVE" });
    }
  };

  // Handle level completion
  const handleNextLevel = () => {
    const nextLevel = state.currentLevel + 1;
    try {
      getLevel(nextLevel);
      changeLevel(nextLevel);
    } catch (error) {
      // If no next level, go back to level 1
      changeLevel(1);
    }
  };

  // Load level when level ID changes
  useEffect(() => {
    const loadLevel = async () => {
      try {
        // In a real application, this would fetch from Alibaba Cloud OSS
        const loadedLevel = await getLevelFromOSS(state.currentLevel);
        setLevel(loadedLevel);

        // Initialize robot position
        dispatch({
          type: "LOAD_LEVEL",
          payload: state.currentLevel,
        });
      } catch (error) {
        console.error("Error loading level:", error);
      }
    };

    loadLevel();
  }, [state.currentLevel]);

  // Save progress when levels are completed
  useEffect(() => {
    if (state.levelsCompleted.length > 0) {
      saveProgressToCloud("user123", state.levelsCompleted, state.currentLevel);
    }
  }, [state.levelsCompleted]);

  // Load saved progress on initial load
  useEffect(() => {
    const loadSavedProgress = async () => {
      try {
        const progress = await loadProgressFromCloud("user123");
        if (progress) {
          changeLevel(progress.currentLevel);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    };

    loadSavedProgress();

    // Show instructions on first visit
    const hasSeenInstructions = localStorage.getItem(
      "mazebot_seen_instructions"
    );
    if (!hasSeenInstructions) {
      setShowInstructions(true);
      localStorage.setItem("mazebot_seen_instructions", "true");
    }
  }, []);

  // Handle timer
  useEffect(() => {
    if (state.isLevelComplete || state.isAISolving) {
      // Stop timer if level is complete or AI is solving
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    } else {
      // Start timer
      const interval = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);

      setTimerInterval(interval);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [state.isLevelComplete, state.isAISolving]);

  // Clean up AI move interval
  useEffect(() => {
    return () => {
      if (aiMoveInterval) {
        clearInterval(aiMoveInterval);
      }
    };
  }, [aiMoveInterval]);

  if (!level) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading maze...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Game header */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Level {state.currentLevel}: {level.name}
          </h2>
          <p className="text-gray-600 text-sm">{level.description}</p>
        </div>

        <div className="flex gap-4 mt-2 md:mt-0">
          <div className="bg-gray-100 p-2 rounded-md text-center">
            <span className="text-xs text-gray-500 block">Steps</span>
            <span className="font-mono font-bold">{state.steps}</span>
          </div>

          <div className="bg-gray-100 p-2 rounded-md text-center">
            <span className="text-xs text-gray-500 block">Time</span>
            <span className="font-mono font-bold">
              {formatTime(state.timeElapsed)}
            </span>
          </div>

          {level.keys && (
            <div className="bg-gray-100 p-2 rounded-md text-center">
              <span className="text-xs text-gray-500 block">Keys</span>
              <span className="font-mono font-bold">
                {state.collectedKeys}/{level.keys.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Game board */}
      <div className="flex flex-col items-center gap-8 mb-8">
        <Maze
          level={level}
          robotPosition={state.position}
          collectedKeys={state.collectedKeys}
        />

        <Controls
          onMove={handleMove}
          onReset={handleReset}
          onAiSolve={handleAiSolve}
          onHelp={() => setShowInstructions(true)}
          isAISolving={state.isAISolving}
          disableControls={state.isLevelComplete || state.isAISolving}
        />
      </div>

      {/* Level navigation */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          onClick={() => changeLevel(state.currentLevel - 1)}
          disabled={state.currentLevel <= 1 || state.isAISolving}
          variant="ghost"
          icon={<ChevronLeft size={20} />}
        >
          Previous
        </Button>

        <Button
          onClick={() => changeLevel(state.currentLevel + 1)}
          disabled={state.currentLevel >= 10 || state.isAISolving}
          variant="ghost"
          icon={<ChevronRight size={20} />}
        >
          Next
        </Button>
      </div>

      {/* Modals */}
      <LevelCompleteModal
        isOpen={state.isLevelComplete}
        onClose={() => handleReset()}
        levelNumber={state.currentLevel}
        steps={state.steps}
        timeElapsed={state.timeElapsed}
        onNextLevel={handleNextLevel}
        onReplayLevel={handleReset}
      />

      <GameInstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
};

export default GameContainer;

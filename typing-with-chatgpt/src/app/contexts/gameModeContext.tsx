import React, { createContext, useState, useContext, ReactNode } from 'react';

type GameModeContextType = {
  gameMode: string;
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
};

const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

type GameModeProviderProps = {
  children: ReactNode;  // <-- Make sure you define this prop type
};

export const GameModeProvider: React.FC<GameModeProviderProps> = ({ children }) => {
  const [gameMode, setGameMode] = useState<string>('creepyMode');

  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode }}>
      {children} 
    </GameModeContext.Provider>
  );
};

export const useGameMode = () => {
  const context = useContext(GameModeContext);
  if (context === undefined) {
    throw new Error('useGameMode must be used within a GameModeProvider');
  }
  return context;
};
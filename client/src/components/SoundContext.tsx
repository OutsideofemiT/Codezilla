import React, { createContext, useContext, useState } from 'react';

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  stopMusic: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
  };

  const stopMusic = () => {
    if ((globalThis as any).globalAudio) {
      const audio = (globalThis as any).globalAudio as HTMLAudioElement;
      audio.pause();
      audio.currentTime = 0;
      (globalThis as any).globalAudio = null;
    }
    setIsSoundOn(false);
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, stopMusic }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within SoundProvider');
  return context;
};

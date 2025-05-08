import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSound } from './SoundContext';

interface Props {
  src: string;
  volume?: number;
}

let globalAudio: HTMLAudioElement | null = null;

const BackgroundMusic: React.FC<Props> = ({ src, volume = 0.03 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { pathname } = useLocation();
  const { isSoundOn } = useSound();

  useEffect(() => {
    // Always stop music on login screen
    if (pathname === '/login') {
      if (globalAudio) {
        globalAudio.pause();
        globalAudio.currentTime = 0;
        globalAudio = null;
      }
      return;
    }

    if (!globalAudio) {
      globalAudio = new Audio(src);
      globalAudio.loop = true;
      globalAudio.volume = volume;

      const handleUserInteraction = () => {
        if (isSoundOn) {
          globalAudio?.play().catch((err) =>
            console.warn('🎵 Autoplay blocked:', err)
          );
        }
        document.removeEventListener('click', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction);
    }

    audioRef.current = globalAudio;

    // Sync mute state with toggle
    if (globalAudio) {
      globalAudio.muted = !isSoundOn;
    }
  }, [pathname, src, volume, isSoundOn]);

  return null;
};

export default BackgroundMusic;

// src/components/SoundPlayer.tsx
import * as React from 'react';
import ReactHowler from 'react-howler';

interface SoundPlayerProps {
  src: string;
  playing: boolean;
  onEnd?: () => void;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ src, playing, onEnd }) => {
  return (
    <ReactHowler
      src={src}
      playing={playing}
      onEnd={onEnd}
      volume={1.0}
    />
  );
};

export default SoundPlayer;

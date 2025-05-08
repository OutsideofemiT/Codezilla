import React from 'react';
import { useSound } from '../components/SoundContext';
import { useLocation } from 'react-router-dom';


const SoundToggle: React.FC = () => {
  const { isSoundOn, toggleSound } = useSound();
  const location = useLocation();
const isGamePage = location.pathname.startsWith('/map') || location.pathname.startsWith('/question');


  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        zIndex: 9999,
      }}
    >
      <button
  onClick={toggleSound}
  className={`p-2 bg-transparent rounded-full transition ${isGamePage ? 'hover:opacity-80' : 'opacity-40 cursor-not-allowed'}`}
  aria-label={isSoundOn ? 'Mute sound' : 'Unmute sound'}
  disabled={!isGamePage}
>
  <img
    src={isSoundOn && isGamePage ? '/icons/spkr-on.png' : '/icons/spkr-off.png'}
    alt="Sound Toggle"
    style={{
      width: '24px',
      height: '24px',
      objectFit: 'contain',
    }}
  />"

</button>

    </div>
  );
};

export default SoundToggle;

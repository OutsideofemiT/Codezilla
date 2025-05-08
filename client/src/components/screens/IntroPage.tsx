import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBodyClass } from '../../utils/useBodyClass';
import "../../styles/codezilla.css";

const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  useBodyClass('intro-background');

  const handleVideoEnd = () => {
    navigate('/login');
  };

  const handleUserClick = () => {
    if (videoRef.current && !hasClicked) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setHasClicked(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleUserClick);
    return () => document.removeEventListener('click', handleUserClick);
  }, [hasClicked]);

  return (
    <div className="intro-overlay">
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source src="/codezilla_intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntroPage;

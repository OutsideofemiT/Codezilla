// src/pages/VictoryPage.tsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "../../styles/codezilla.css";

export default function VictoryPage({
  avatarUrl     = '../../../public/assets/avatars/drdan2.png',
  confettiUrl   = '/background/confetti_image.jpg',
}) {
  const navigate = useNavigate();



  useEffect(() => {
    const victoryMusic = new Audio('/totalwin1.mp3');
    victoryMusic.volume = 0.5;
    victoryMusic.play().catch((err) => {
      console.warn('🏆 Victory sound blocked:', err);
    });
  }, []);

  useEffect(() => {
    document.body.classList.add('gameover-background');
    return () => {
      document.body.classList.remove('gameover-background');
    };
  }, []);
  const handlePlayAgain = () => {
    navigate('/map');
  };

  const handleMainMenu = () => {
    navigate('/');
  };

  return (
    <div className="victory-page">
      <div className="victory-container">
        <div
          className="victory-confetti"
          style={{ backgroundImage: `url(${confettiUrl})` }}
        />

        <h1 className="victory-title">Congratulations!</h1>

        <img className="victory-avatar" src={avatarUrl} alt="Player Avatar" />

        <h2 className="victory-subtitle">You defeated Codezilla!</h2>

        <p className="victory-cta">You are a coding master!</p>

        <div className="victory-actions">
          <button className="btn play-again-btn" onClick={handlePlayAgain}>
            Play Again!
          </button>
          <button className="btn main-menu-btn" onClick={handleMainMenu}>
            Main Menu
          </button>
          <button
            className="btn main-menu-btn"
            onClick={() => navigate('/leaderboard')}
          >
            Leaderboards
          </button>
        </div>
      </div>
    </div>
  );
}

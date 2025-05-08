import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/codezilla.css";

const GameOverPage = ({
  avatarUrl = '../../../public/assets/avatars/drdan2.png',
  codezillaUrl = '../../../public/assets/minions/codezilla2.png',
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('gameover-background');

    return () => {
      document.body.classList.remove('gameover-background');
    };
  }, []);

  useEffect(() => {
    const music = new Audio('/game_over.mp3');
    const roar = new Audio('/godzilla.roar.mp3');

    music.volume = 0.5;
    roar.volume = 0.8;

    // Start music immediately
    music.play().catch((err) =>
      console.warn('🎵 Game Over music blocked:', err)
    );

    // Play roar after 2.5 seconds
    const roarDelay = setTimeout(() => {
      roar.play().catch((err) =>
        console.warn('🦖 Godzilla roar blocked:', err)
      );
    }, 2500);

    // Cleanup
    return () => {
      clearTimeout(roarDelay);
      music.pause();
      music.currentTime = 0;
      roar.pause();
      roar.currentTime = 0;
    };
  }, []);

  const handlePlayAgain = () => {
    navigate('/map');
  };

  const handleMainMenu = () => {
    navigate('/');
  };

  return (
    <div className="game-over-page">
      <div className="game-over-container">
        <h1 className="game-over-title">Game Over!</h1>

        <div className="game-over-images">
          <img className="player-avatar" src={avatarUrl} alt="Player Avatar" />
          <img className="codezilla-avatar" src={codezillaUrl} alt="Codezilla" />
        </div>

        <h2 className="game-over-subtitle">You were defeated by Codezilla!</h2>
        <p className="game-over-cta">Try again to become a code master</p>

        <div className="game-over-actions">
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
};

export default GameOverPage;

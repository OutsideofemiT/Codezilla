import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import IntroPage from './components/screens/IntroPage';
import { Login } from './components/screens/Login';
import GameMap from './components/screens/GameMap';
import GameOver from './components/screens/GameOver';
import Victory from './components/screens/Victory';
import Signup from './components/screens/Signup';
import Questions from './components/screens/Questions';


import LeaderBoard from './components/LeaderBoard';

import './styles/codezilla.css';
import BackgroundMusicProvider from './components/BackgroundMusicProvider';
import SoundToggle from './components/SoundToggle';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();

  const isGameActive =
    location.pathname.startsWith('/map') ||
    location.pathname.startsWith('/question');
  


  return (
    <div className="app-wrapper">
      {/* Only load persistent music during gameplay */}
      {isGameActive && (
        <BackgroundMusicProvider src="/black.sabbath.mp3" volume={0.03} />
      )}

      <img
        src="/codezilla_logo.png"
        alt="Codezilla Logo"
        className="logo-background"
      />

      <LogoutButton />

      {/* ✅ GLOBAL SoundToggle button */}
      <SoundToggle />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<GameMap />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/victory" element={<Victory />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/question/:id" element={<Questions />} />
      </Routes>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

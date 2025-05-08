import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Minion from './Minions';

import { useBodyClass } from '../../utils/useBodyClass';
import { preloadSounds } from '../../utils/preloadSounds';
import BackgroundMusic from '../BackgroundMusicProvider';

import "../../styles/codezilla.css";
import drDanImg from '/assets/avatars/drdan2.png';
import flameImg from '/assets/flame.png';



const selectedAvatar = localStorage.getItem('selectedAvatar');
const username = localStorage.getItem('username') || 'Player';

const GameMap: React.FC = () => {
  const navigate = useNavigate();
  useBodyClass('login-background');

  const [completedPaths, setCompletedPaths] = useState<string[]>([]);
  const [selectedMinionId, setSelectedMinionId] = useState<string | null>(null);

  useEffect(() => {
    preloadSounds(['/audio/Dan_correct/Dan-correct-1.wav']);
  }, []);

  const handleDanHover = () => {
    const audio = new Audio('/audio/DecafDan.wav');
    audio.volume = 0.3;
    audio.play().catch(err => console.warn('Autoplay blocked:', err));
  };

  const minions = [
    {
      id: '1',
      xPercent: 17,
      yPercent: 25,
      image: '/assets/minions/nullbyte3a.png',
      name: 'Nullbyte',
      questionId: 'q1',
      taunt: "Don't blank out now... this should be easy.",
      sound: '/cave-monster.mp3', // ✅
      colorClass: 'bg-blue-600 text-white',
    },
    {
      id: '2',
      xPercent: 35,
      yPercent: 48,
      image: '/assets/minions/Dbug2a.png',
      name: 'Dbug',
      questionId: 'q2',
      taunt: "Let's squash some bugs... or get squashed.",
      sound: '/alienScream.mp3', // ✅
      colorClass: 'bg-yellow-500 text-black',
    },
    {
      id: '3',
      xPercent: 53,
      yPercent: 65,
      image: '/assets/minions/typerrorus.png',
      name: 'Typerrorasaurus',
      questionId: 'q3',
      taunt: "Let’s see how you handle *this* error.",
      sound: '/mad-keyboard-typing.mp3', // ✅
      colorClass: 'bg-red-600 text-white',
    },
    {
      id: '4',
      xPercent: 70,
      yPercent: 45,
      image: '/assets/minions/pie-thon.png',
      name: 'Pie-Thon',
      questionId: 'q4',
      taunt: "The only slice you'll get is defeat.",
      sound: '/snakeHiss.mp3', // ✅
      colorClass: 'bg-green-700 text-white',
    },
    {
      id: '5',
      xPercent: 87,
      yPercent: 27,
      image: '/assets/minions/codezilla2.png',
      name: 'Codezilla',
      questionId: 'q5',
      taunt: "You dare challenge ME?",
      sound: '/godzilla.roar.mp3', // ✅
      colorClass: 'bg-purple-800 text-white',
    },
  ];
  

  const nodes = [
    { id: 'node1', xPercent: 18, yPercent: 28 },
    { id: 'node2', xPercent: 18, yPercent: 48 },
    { id: 'node3', xPercent: 35, yPercent: 48 },
    { id: 'node4', xPercent: 35, yPercent: 68 },
    { id: 'node5', xPercent: 53, yPercent: 68 },
    { id: 'node6', xPercent: 53, yPercent: 48 },
    { id: 'node7', xPercent: 70, yPercent: 48 },
    { id: 'node8', xPercent: 70, yPercent: 28 },
    { id: 'node9', xPercent: 88, yPercent: 28 },
  ];

  const goToQuestion = (questionId: string) => {
    const currentIndex = minions.findIndex(m => m.questionId === questionId);
    if (currentIndex < nodes.length - 1) {
      const pathId = `${nodes[currentIndex].id}-${nodes[currentIndex + 1].id}`;
      setCompletedPaths(prev => [...prev, pathId]);
    }
    const minion = minions.find(m => m.questionId === questionId);
    if (minion) setSelectedMinionId(minion.id);
    navigate(`/question/${questionId}`);
  };

  return (
    <div className="game-map">
      <BackgroundMusic src="/black.sabbath.mp3" volume={0.03} />

      <svg className="map-lines">
        {nodes.map((node, index) => {
          const nextNode = nodes[index + 1];
          if (!nextNode) return null;
          return (
            <line
              key={`line-${node.id}-${nextNode.id}`}
              x1={`${node.xPercent}%`}
              y1={`${node.yPercent}%`}
              x2={`${nextNode.xPercent}%`}
              y2={`${nextNode.yPercent}%`}
              className={`map-line ${completedPaths.includes(`${node.id}-${nextNode.id}`) ? 'completed' : ''}`}
            />
          );
        })}

        {nodes.map((node, index) => {
          const isCompleted = index < completedPaths.length;
          return (
            <g key={`node-${node.id}`}>
              <circle
                cx={`${node.xPercent}%`}
                cy={`${node.yPercent}%`}
                r="3.5%"
                className={`map-node-outer ${isCompleted ? 'completed' : ''}`}
              />
              <circle
                cx={`${node.xPercent}%`}
                cy={`${node.yPercent}%`}
                r="3%"
                className="map-node-inner"
              />
            </g>
          );
        })}
      </svg>

      <div className="dr-dan-wrapper">
        <div className="glow-circle"></div>
        <img
          src={drDanImg}
          alt="Dr. Dan"
          className="dr-dan-image hover:cursor-pointer"
          onMouseEnter={handleDanHover}
        />
      </div>

      {selectedAvatar && (
        <div className="player-avatar-wrapper">
          <div className="player-glow-circle"></div>
          <img src={selectedAvatar} alt="Your Avatar" className="player-avatar" />
          <div className="player-info-wrapper">
            <div className="player-info-box">
              <p className="player-name">{username}</p>
              <p className="player-level">Level 1</p>
            </div>
            <div className="learning-info-box">
              <p className='learning-title'>Studying</p>
              <p className="learning-text">Coding Bootcamp</p>
            </div>
            <div className='flames'>
              <div className="lifeline-info-box">
                <div className="lifeline-flames">
                  <p className='learning-title'>Life Lines</p>
                  <img src={flameImg} alt="Flame 1" />
                  <img src={flameImg} alt="Flame 2" />
                  <img src={flameImg} alt="Flame 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {minions.map((minion) => (
        <Minion
          key={minion.id}
          id={minion.id}
          xPercent={minion.xPercent}
          yPercent={minion.yPercent}
          image={minion.image}
          name={minion.name}
          questionId={minion.questionId}
          goToQuestion={goToQuestion}
          size={120}
          selectedMinionId={selectedMinionId}
          taunt={minion.taunt}
          sound={minion.sound}
          colorClass={minion.colorClass}
        />
      ))}
    </div>
  );
};

export default GameMap;

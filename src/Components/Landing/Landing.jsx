import React, { useState, useEffect } from 'react';
import './Landing.css';
import sunIcon from '../Assets/pixelarticons--sun.png';
import moonIcon from '../Assets/pixelarticons--moon.png';

const Landing = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false); // State for click handling
  const [isAnimationActive, setIsAnimationActive] = useState(true); // State to control title animation
  const [gridSize, setGridSize] = useState(3); // Grid size state
  const [maxStreak, setMaxStreak] = useState(3); // Max streak state
  const [player1, setPlayer1] = useState('Player_1'); // Player 1 name
  const [player2, setPlayer2] = useState('Player_2'); // Player 2 name

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleClick = () => {
    setIsClicked(true);
    setIsAnimationActive(false); // Stop animations on click
  };

  return (
    <div className={`landingPage ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={handleClick}>
      <div className="lineGrid">
        <div className="verticalLine vertical1"></div>
        <div className="verticalLine vertical2"></div>
        <div className="horizontalLine horizontal1"></div>
        <div className="horizontalLine horizontal2"></div>
      </div>
      <div 
        className={`xLogo bounce ${isClicked ? 'move-x' : ''}`} 
        style={{
          position: 'absolute',
          top: isClicked ? '37vw' : '-9vw',
          left: isClicked ? '-7vw' : '-7vw',
          transition: 'top 1s ease, left 1s ease',
          transform: isAnimationActive 
            ? `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)` 
            : 'translate(0, 0)'
        }}
      ></div>
      <div 
        className={`oLogo bounce ${isClicked ? 'move-o' : ''}`} 
        style={{
          position: 'absolute',
          top: isClicked ? '-9vw' : '25vw',
          right: isClicked ? '-10vw' : '-10vw',
          transition: 'top 1s ease, right 1s ease',
          transform: isAnimationActive 
            ? `translate(${(mousePosition.x - window.innerWidth / 2) / 30}px, ${(mousePosition.y - window.innerHeight / 2) / 30}px)` 
            : 'translate(0, 0)'
        }}
      ></div>
      <button className="themeToggle" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <img src={sunIcon} alt="Switch to Light Mode" />
        ) : (
          <img src={moonIcon} alt="Switch to Dark Mode" />
        )}
      </button>
      <div className="text-center">
        <h1 
          className={`title1 ${isClicked ? 'move-title1' : ''}`} 
          style={{
            fontSize: isClicked ? '3vw' : '10vw',
            transition: 'transform 1s ease',
            transform: isAnimationActive 
              ? `translate(
                  ${(mousePosition.x - window.innerWidth / 2) / 50}px, 
                  ${(mousePosition.y - window.innerHeight / 2) / 50}px
                )` 
              : 'translate(-485%, -835%)'
          }}
        >
          TIC TAC
        </h1>
        <h1 
          className={`title2 ${isClicked ? 'move-title2' : ''}`} 
          style={{
            fontSize: isClicked ? '3vw' : '10vw',
            transition: 'transform 1s ease',
            transform: isAnimationActive 
              ? `translate(
                  ${(mousePosition.x - window.innerWidth / 2) / 30}px, 
                  ${(mousePosition.y - window.innerHeight / 2) / 30}px
                )` 
              : 'translate(-485%, -835%)'
          }}
        >
          TOE<span style={{ color: isDarkMode ? '#ff7043' : '#ff5722' }}>.</span>
        </h1>
      </div>
      {isClicked && (
        <div className="floatingBox animated">
          {/* Grid Size */}
          <p className='Setting_Title'> Settings</p>
          <label>
            Grid Size:
            <select
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
            >
              {Array.from({ length: 8 }, (_, i) => 3 + i).map((n) => (
                <option key={n} value={n}>{n}x{n}</option>
              ))}
            </select>
          </label>

          {/* Max Streak */}
          <label>
            Win Streak:
            <input
              type="number"
              value={maxStreak}
              min="3"
              max={gridSize}
              onChange={(e) => setMaxStreak(Number(e.target.value))}
            />
          </label>

          {/* Player Names */}
          <div>
            <label>
              Player 1 [X]:
              <input
                type="text"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Player 2 [O]:
              <input
                type="text"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
              />
            </label>
          </div>
          <button className="startGameButton">Start Game</button>
        </div>
      )}
     
    </div>
  );
};

export default Landing;

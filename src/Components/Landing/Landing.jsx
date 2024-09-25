import React, { useState, useEffect } from 'react';
import './Landing.css';
import sunIcon from '../Assets/pixelarticons--sun.png';
import moonIcon from '../Assets/pixelarticons--moon.png';
import menuLightIcon from '../Assets/nimbus--menu-light.png';  // Light mode icon
import menuDarkIcon from '../Assets/nimbus--menu.png';    // Dark mode icon
import TicTacToe from '../TicTacToe/TicTacToe';
import Settings from '../Settings/Settings';

const Landing = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false); // Menu active state
  const [gameSettings, setGameSettings] = useState({
    gridSize: 3,
    maxStreak: 3,
    player1: 'Player_1',
    player2: 'Player_2',
  });
  const [resetSignal, setResetSignal] = useState(0); // State to trigger reset

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

  const reloadPage = () => {
    if (isClicked){window.location.reload();}
    
  };

  const handleClick = (e) => {
    if (
      e.target.closest('.themeToggle') 
    ) {
      toggleDarkMode(); 
      return; 
    }

    if (!isClicked) {
      setIsClicked(true);
      setShowSettings(true);
    }
    setIsAnimationActive(false);
  };

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    setShowSettings(!isMenuActive); 
  };

  const startGame = (settings) => {
    setGameSettings(settings);
    setShowSettings(false);
    setGameStarted(true);
    setResetSignal(prev => prev + 1); 
  };

  return (
    <div
      className={`landingPage ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      onClick={handleClick}
    >
      {!gameStarted && (
        <div className="lineGrid">
          <div className="verticalLine vertical1"></div>
          <div className="verticalLine vertical2"></div>
          <div className="horizontalLine horizontal1"></div>
          <div className="horizontalLine horizontal2"></div>
        </div>
      )}

      

      <div
        className={`xLogo bounce ${isClicked ? 'move-x' : ''}`}
        style={{
          top: isClicked ? '37vw' : '-9vw',
          left: isClicked ? '-7vw' : '-7vw',
          transform: isAnimationActive
            ? `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)`
            : 'translate(0, 0)',
        }}
      ></div>
      <div
        className={`oLogo bounce ${isClicked ? 'move-o' : ''}`}
        style={{
          top: isClicked ? '-9vw' : '25vw',
          right: isClicked ? '-10vw' : '-10vw',
          transform: isAnimationActive
            ? `translate(${(mousePosition.x - window.innerWidth / 2) / 30}px, ${(mousePosition.y - window.innerHeight / 2) / 30}px)`
            : 'translate(0, 0)',
        }}
      ></div>

      {/* Theme Toggle Button */}
      <button className="themeToggle" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <img src={sunIcon} alt="Switch to Light Mode" />
        ) : (
          <img src={moonIcon} alt="Switch to Dark Mode" />
        )}
      </button>

      {/* Menu Button Icon - Changes based on Dark/Light Mode */}
      <button
        className="menuIconButton"
        onClick={toggleMenu}
        disabled={isMenuActive} 
      >
        {isDarkMode ? (
          <img src={menuDarkIcon} alt="Menu in Dark Mode" />
        ) : (
          <img src={menuLightIcon} alt="Menu in Light Mode" />
        )}
      </button>

      <div className="text-center"
      onClick={reloadPage}>
        <h1
          className={`title1 ${isClicked ? 'move-title1' : ''}`}
          style={{
            fontSize: isClicked ? '3vw' : '10vw',
            position: isClicked ? 'fixed' : 'static',
            top: isClicked ? '1rem' : 'auto',
            left: isClicked ? '1.5rem' : 'auto',
            transform: isAnimationActive
              ? `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)`
              : 'translate(0,0)',
            textAlign: isClicked ? 'left' : 'center',
          }}
        >
          TIC TAC
        </h1>
        <h1
          className={`title2 ${isClicked ? 'move-title2' : ''}`}
          style={{
            fontSize: isClicked ? '3vw' : '10vw',
            position: isClicked ? 'fixed' : 'static',
            top: isClicked ? '4rem' : 'auto',
            left: isClicked ? '1.5rem' : 'auto',
            transform: isAnimationActive
              ? `translate(${(mousePosition.x - window.innerWidth / 2) / 30}px, ${(mousePosition.y - window.innerHeight / 2) / 30}px)`
              : 'translate(0, 0)',
            textAlign: 'left',
          }}
        >
          TOE<span style={{ color: isDarkMode ? '#ff7043' : '#ff5722' }}>.</span>
        </h1>
      </div>
      

      {showSettings && <Settings onStartGame={startGame} />}

      {gameStarted && (
        <TicTacToe
          gridSize={gameSettings.gridSize}
          maxStreak={gameSettings.maxStreak}
          player1={gameSettings.player1}
          player2={gameSettings.player2}
          isDarkMode={isDarkMode}
          resetSignal={resetSignal} 
        />
      )}
    </div>
  );
};

export default Landing;
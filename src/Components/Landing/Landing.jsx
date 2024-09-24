import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Landing.css";
import sunIcon from '../Assets/pixelarticons--sun.png';
import moonIcon from '../Assets/pixelarticons--moon.png';

const Landing = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

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

  const handleScreenClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/settings');
    }, 1000); // Adjust this time to match your transition duration
  };

  return (
    <div 
      className={`landingPage ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isTransitioning ? 'transitioning' : ''}`}
      onClick={handleScreenClick}
    >
      <div className="lineGrid">
        <div className="verticalLine vertical1"></div>
        <div className="verticalLine vertical2"></div>
        <div className="horizontalLine horizontal1"></div>
        <div className="horizontalLine horizontal2"></div>
      </div>
      <div className={`xLogo bounce ${isTransitioning ? 'transition-x' : ''}`}></div>
      <div className={`oLogo bounce ${isTransitioning ? 'transition-o' : ''}`}></div>
      <button className="themeToggle" onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}>
        {isDarkMode ? (
          <img src={sunIcon} alt="Switch to Light Mode" />
        ) : (
          <img src={moonIcon} alt="Switch to Dark Mode" />
        )}
      </button>
      <div className="text-center">
        <h1
          className={`title1 ${isTransitioning ? 'transition-title' : ''}`}
          style={{
            transform: `translate(
              ${(mousePosition.x - window.innerWidth / 2) / 50}px,
              ${(mousePosition.y - window.innerHeight / 2) / 50}px
            )`
          }}
        >
          TIC TAC
        </h1>
        <h1
          className={`title2 ${isTransitioning ? 'transition-title' : ''}`}
          style={{
            transform: `translate(
              ${(mousePosition.x - window.innerWidth / 2) / 30}px,
              ${(mousePosition.y - window.innerHeight / 2) / 30}px
            )`
          }}
        >
          TOE.
        </h1>
      </div>
      <div className={`rounded-rectangle ${isTransitioning ? 'show' : ''}`}></div>
    </div>
  );
};

export default Landing;
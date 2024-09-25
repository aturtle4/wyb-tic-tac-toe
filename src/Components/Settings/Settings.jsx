import React, { useState, useEffect } from 'react';
import './Settings.css'; // Make sure this CSS file is in the same directory

const Settings = ({ onStartGame }) => {
  const [settings, setSettings] = useState({
    gridSize: 3,
    maxStreak: 3,
    player1: 'Player 1',
    player2: 'Player 2',
  });
  const [isMounted, setIsMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => {
      const newSettings = { ...prev, [name]: value };
      if (name === 'gridSize') {
        newSettings.maxStreak = Math.min(newSettings.maxStreak, Number(value));
      }
      return newSettings;
    });
  };

  const handleStartGame = () => {
    if (settings.maxStreak < 3 || settings.maxStreak > settings.gridSize) {
      setErrorMessage(`Win Streak must be between 3 and ${settings.gridSize}.`);
      return;
    }
    setErrorMessage('');
    onStartGame(settings);
  };

  return (
    <div className={`settingsBox ${isMounted ? 'show' : 'hide'}`}>
      <p className='settingTitle'>Menu</p>
     
      <label>
        Grid Size:
        <select
          name="gridSize"
          value={settings.gridSize}
          onChange={handleChange}
        >
          {Array.from({ length: 8 }, (_, i) => i + 3).map((size) => (
            <option key={size} value={size}>{size}x{size}</option>
          ))}
        </select>
      </label>

      <label>
        Win Streak:
        <input
          type="number"
          name="maxStreak"
          value={settings.maxStreak}
          onChange={handleChange}
          min="3"
          max={settings.gridSize}
          className="numberSelector"
        />
      </label>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <label>
        Player 1 [X]:
        <input
          type="text"
          name="player1"
          value={settings.player1}
          onChange={handleChange}
        />
      </label>

      <label>
        Player 2 [O]:
        <input
          type="text"
          name="player2"
          value={settings.player2}
          onChange={handleChange}
        />
      </label>

      <button className="startGameButton" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default Settings;
import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = ({ onStartGame }) => {
  const [gridSize, setGridSize] = useState(3);
  const [maxStreak, setMaxStreak] = useState(3);
  const [player1, setPlayer1] = useState('Player_1');
  const [player2, setPlayer2] = useState('Player_2');
  const [isMounted, setIsMounted] = useState(false); // State for controlling the floating effect

  useEffect(() => {
    // Trigger the animation when the component mounts
    setIsMounted(true);
  }, []);

  const handleStartGame = () => {
    onStartGame({ gridSize, maxStreak, player1, player2 });
  };

  return (
    <div className={`settingsBox ${isMounted ? 'show' : 'hide'}`}>
      <p className='settingTitle'>Menu</p>
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
      <button className="startGameButton" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default Settings;

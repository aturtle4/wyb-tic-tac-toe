import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import x_icon from '../Assets/ph--x-white.png';
import o_icon from '../Assets/healthicons--o-white.png';
import x_icon_light from '../Assets/ph--x.png';
import o_icon_light from '../Assets/healthicons--o.png';
import reset_icon_dark from '../Assets/fluent-mdl2--reset-white.png'
import reset_icon from '../Assets/fluent-mdl2--reset.png'

const TicTacToe = ({ gridSize = 3, maxStreak = 3, player1, player2, isDarkMode, resetSignal }) => {
  const [board, setBoard] = useState(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isGameActive, setIsGameActive] = useState(true);
  const [winningLine, setWinningLine] = useState(null);
  const [player1Icon, set_x_icon] = useState(isDarkMode ? x_icon : x_icon_light);
  const [player2Icon, set_y_icon] = useState(isDarkMode ? o_icon : o_icon_light);

  useEffect(() => {
    set_x_icon(isDarkMode ? x_icon : x_icon_light);
    set_y_icon(isDarkMode ? o_icon : o_icon_light);
  }, [isDarkMode]);

  useEffect(() => {
    resetGame();
  }, [resetSignal]);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const lines = [];
    for (let i = 0; i < gridSize; i++) {
      lines.push({ type: 'row', index: i, line: board[i] });
      lines.push({ type: 'col', index: i, line: board.map(row => row[i]) });
    }
    lines.push({ type: 'diag', index: 0, line: board.map((row, i) => row[i]) });
    lines.push({ type: 'anti-diag', index: 0, line: board.map((row, i) => row[gridSize - 1 - i]) });

    for (const { type, index, line } of lines) {
      let count = 0;
      let lastChar = null;
      let streakStart = 0;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === lastChar && char !== null) {
          count++;
          if (count === maxStreak) {
            setWinner(lastChar);
            setIsGameActive(false);
            setWinningLine({ type, index, start: streakStart, end: i });
            return;
          }
        } else {
          count = 1;
          lastChar = char;
          streakStart = i;
        }
      }
    }

    if (board.flat().every(cell => cell !== null)) {
      setIsGameActive(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null)));
    setIsXNext(true);
    setWinner(null);
    setIsGameActive(true);
    setWinningLine(null);
  };

  const isWinningCell = (row, col) => {
    if (!winningLine) return false;
    const { type, index, start, end } = winningLine;
    if (type === 'row' && row === index && col >= start && col <= end) return true;
    if (type === 'col' && col === index && row >= start && row <= end) return true;
    if (type === 'diag' && row === col && row >= start && row <= end) return true;
    if (type === 'anti-diag' && row + col === gridSize - 1 && row >= start && row <= end) return true;
    return false;
  };

  return (
    <div className="tic-tac-toe">
      <div className="board-container">
        <div className="board" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isLastColumn = colIndex === gridSize - 1;
              const isLastRow = rowIndex === gridSize - 1;
              const cellClass = `cell ${isLastColumn ? 'last-column' : ''} ${isLastRow ? 'last-row' : ''}`;
              const imageClass = isWinningCell(rowIndex, colIndex) ? 'winning-image' : '';
              
              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={cellClass}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  disabled={!isGameActive}
                  aria-label={`Cell ${rowIndex}, ${colIndex}`}
                >
                  {cell && <img className={imageClass} src={cell === 'X' ? player1Icon : player2Icon} alt={cell} />}
                </button>
              );
            })
          )}
        </div>
        <div className="reset-icon-container" onClick={resetGame}>
          <img
            className="reset-icon"
            src={isDarkMode ? reset_icon_dark : reset_icon}
            alt="Reset Game"
          />
        </div>
      </div>
      <div className="player-toggle-container">
        <span className={`player-name ${isXNext ? 'active' : ''}`}>{player1}</span>
        <div className={`player-toggle ${isXNext ? 'left' : 'right'}`}>
          <div className="toggle-background">
            <div className="player-icon player-icon-x">
              <img src={player2Icon} alt="Player 1" />
            </div>
            <div className="player-icon player-icon-o">
              <img src={player1Icon} alt="Player 2" />
            </div>
          </div>
          <div className="toggle-slider"></div>
        </div>
        <span className={`player-name ${!isXNext ? 'active' : ''}`}>{player2}</span>
      </div>

      {(!isGameActive || winner) && (
        <div className="winner-banner">
          <div className="banner-content">
            {winner ? (
              <h2>Winner: {winner === 'X' ? player1 : player2}</h2>
            ) : (
              <h2>Game Over! It's a Draw!</h2>
            )}
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
          </div>
        </div>
      )}
    </div>
);

};

export default TicTacToe;

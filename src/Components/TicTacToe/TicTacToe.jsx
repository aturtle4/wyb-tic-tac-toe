import React, { useState } from 'react';
import './TicTacToe.css';
import player1Image from '../Assets/ph--x-white.png';
import player2Image from '../Assets/healthicons--o-white.png';

const TicTacToe = ({ gridSize = 3, maxStreak = 3, player1, player2 }) => {
  const [board, setBoard] = useState(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isGameActive, setIsGameActive] = useState(true);
  const [winningLine, setWinningLine] = useState(null);

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
   
    // Check rows and columns
    for (let i = 0; i < gridSize; i++) {
      lines.push({ type: 'row', index: i, line: board[i] });
      lines.push({ type: 'col', index: i, line: board.map(row => row[i]) });
    }
   
    // Check diagonals
    lines.push({ type: 'diag', index: 0, line: board.map((row, i) => row[i]) });
    lines.push({ type: 'anti-diag', index: 0, line: board.map((row, i) => row[gridSize - 1 - i]) });

    // Check for streaks
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

    // Check for a draw
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
      <h2>Current Player: {isXNext ? player1 : player2}</h2>
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
              >
                {cell && <img className={imageClass} src={cell === 'X' ? player1Image : player2Image} alt={cell} />}
              </button>
            );
          })
        )}
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
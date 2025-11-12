import React from 'react';

function Celebration({ onRestart }) {
  return (
    <div className="celebration">
      <div className="celebration-content">
        <h2>🎊 Congratulations! 🎊</h2>
        <p>You’ve matched all countries with their capitals!</p>
        <button className="restart-btn" onClick={onRestart}>
          🔁 Play Again
        </button>
      </div>
    </div>
  );
}

export default Celebration;

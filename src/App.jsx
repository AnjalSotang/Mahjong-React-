import React, { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Celebration from './Celebration';

function App() {
  const data = [
    { name: 'Nepal', match: 'Kathmandu' },
    { name: 'Kathmandu', match: 'Nepal' },
    { name: 'India', match: 'Delhi' },
    { name: 'Delhi', match: 'India' },
    { name: 'China', match: 'Beijing' },
    { name: 'Beijing', match: 'China' },
  ];

  const [items, setItems] = useState(data.sort(() => Math.random() - 0.5));
  const [firstSelected, setFirstSelected] = useState(null);
  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  const handleClick = (item) => {
    if (matched.includes(item.name)) return; // already matched

    // Reveal clicked item
    setRevealed((prev) => [...new Set([...prev, item.name])]);

    if (!firstSelected) {
      // first click
      setFirstSelected(item);
    } else if (firstSelected.name !== item.name) {
      // compare with first selected
      if (
        firstSelected.match === item.name &&
        item.match === firstSelected.name
      ) {
        // correct match
        toast.success('Correct Match!', { autoClose: 1000 });
        setMatched((prev) => [...prev, firstSelected.name, item.name]);
        setFirstSelected(null);
      } else {
        // wrong match
        toast.error('Try again', { autoClose: 1000 });
        setTimeout(() => {
          setRevealed((prev) => prev.filter((name) => name !== item.name));
        }, 800);
      }
    }
  };

  const isSelected = (item) =>
    firstSelected && firstSelected.name === item.name;
  const isMatched = (item) => matched.includes(item.name);
  const isRevealed = (item) => isMatched(item) || revealed.includes(item.name);

  // Detect game complete
  useEffect(() => {
    if (matched.length === items.length && items.length > 0) {
      setGameComplete(true);
    }
  }, [matched, items]);

  // ✅ Restart
  const handleRestart = () => {
    setMatched([]);
    setFirstSelected(null);
    setRevealed([]);
    setItems(data.sort(() => Math.random() - 0.5));
    setGameComplete(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="game">
        <h1 className="title">Country–Capital Match</h1>
        <div className="button-grid">
          {items.map((item) => (
            <button
              key={item.name}
              disabled={isMatched(item)}
              onClick={() => handleClick(item)}
              className={`btn 
                ${isSelected(item) ? 'selected' : ''} 
                ${isMatched(item) ? 'matched' : ''}`}
            >
              {isRevealed(item) ? item.name : 'Click Me'}
            </button>
          ))}
        </div>
        {gameComplete && <Celebration onRestart={handleRestart} />}
      </div>
    </>
  );
}

export default App;

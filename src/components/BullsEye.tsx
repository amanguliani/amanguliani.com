import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { WORD_DICTIONARY } from './words';
import './BullsEye.css';

const getRandomWord = () => WORD_DICTIONARY[Math.floor(Math.random() * WORD_DICTIONARY.length)];

interface GuessResult {
  word: string;
  bulls: number;
  cows: number;
}

const BullsEye = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    setTargetWord(getRandomWord());
  }, []);

  const calculateBullsAndCows = (guess: string) => {
    let bulls = 0;
    let cows = 0;
    
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetWord[i]) {
        bulls++;
      } else if (targetWord.includes(guess[i])) {
        cows++;
      }
    }
    
    return { bulls, cows };
  };

  const handleGuessSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (gameOver || isValidating) return;

    const formattedGuess = currentGuess.toUpperCase().trim();

    if (formattedGuess.length !== 4) {
      setMessage('Please enter exactly 4 letters.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const uniqueLetters = new Set(formattedGuess.split(''));
    if (uniqueLetters.size !== 4) {
      setMessage('No repeating letters allowed.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (guesses.some(g => g.word === formattedGuess)) {
      setMessage('You already guessed that word!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (!WORD_DICTIONARY.includes(formattedGuess)) {
      setIsValidating(true);
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${formattedGuess}`);
        if (!response.ok) {
          setMessage('Not a valid English word.');
          setTimeout(() => setMessage(''), 2000);
          setIsValidating(false);
          return;
        }
      } catch (error) {
        console.error("Dictionary API error:", error);
      }
      setIsValidating(false);
    }

    const { bulls, cows } = calculateBullsAndCows(formattedGuess);
    const newGuesses = [...guesses, { word: formattedGuess, bulls, cows }];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (bulls === 4) {
      setGameOver(true);
      setMessage('You win! 🎉');
    } else if (newGuesses.length >= 10) {
      setGameOver(true);
      setMessage(`Game Over! The word was ${targetWord}`);
    }
  };

  return (
    <div className="bullseye-container glass-panel animate-fade-in">
      <div className="bullseye-header">
        <h2 className="text-gradient">Bulls Eye</h2>
        <p className="bullseye-subtitle">
          Guess the 4-letter word (no repeating letters). <br />
          <strong>Bull</strong> = right letter, right place. <br />
          <strong>Cow</strong> = right letter, wrong place. <br />
          <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Tries: {guesses.length}/10</span>
        </p>
      </div>

      {message && <div className="bullseye-message">{message}</div>}

      <div className="guesses-list">
        {guesses.map((g, index) => (
          <div key={index} className="guess-item glass-panel">
            <span className="guess-word">{g.word}</span>
            <div className="guess-stats">
              <span className="bull-stat">🎯 {g.bulls} Bulls</span>
              <span className="cow-stat">🐮 {g.cows} Cows</span>
            </div>
          </div>
        ))}
      </div>

      {!gameOver ? (
        <form onSubmit={handleGuessSubmit} className="guess-form">
          <input 
            type="text" 
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.replace(/[^A-Za-z]/g, '').slice(0, 4))}
            placeholder="Type 4 letters..."
            autoFocus
          />
          <button type="submit" className="bullseye-submit" disabled={isValidating}>
            {isValidating ? 'Checking...' : 'Guess'}
          </button>
        </form>
      ) : (
        <button 
          className="bullseye-reset"
          onClick={() => {
            setTargetWord(getRandomWord());
            setGuesses([]);
            setCurrentGuess('');
            setGameOver(false);
            setMessage('');
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default BullsEye;

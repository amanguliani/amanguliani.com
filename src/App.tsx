import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import './App.css';
import { Search } from 'lucide-react';
import Resume from './components/Resume';
import avatarImg from './assets/avatar.png';
import avatarMatrixImg from './assets/avatar_matrix.png';
import MatrixRain from './components/MatrixRain';
import Connect from './components/Connect';
import BullsEye from './components/BullsEye';
import About from './components/About';

const COMMANDS = ['about me', 'resume', 'connect with me', 'play my fav word game', 'clear'];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [activeComponent, setActiveComponent] = useState<'resume' | 'connect' | 'bullseye' | 'about' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [matrixState, setMatrixState] = useState<'inactive' | 'active' | 'fading'>('inactive');

  useEffect(() => {
    if (avatarClicks > 0 && avatarClicks < 10) {
      const timer = setTimeout(() => setAvatarClicks(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [avatarClicks]);

  useEffect(() => {
    if (matrixState === 'active') {
      const timer = setTimeout(() => setMatrixState('fading'), 5000); // Wait 5s before fading
      return () => clearTimeout(timer);
    } else if (matrixState === 'fading') {
      const timer = setTimeout(() => setMatrixState('inactive'), 1500); // 1.5s fade out duration
      return () => clearTimeout(timer);
    }
  }, [matrixState]);

  const handleCommand = (cmdStr: string) => {
    const command = cmdStr.toLowerCase().trim();
    setInputValue(cmdStr);

    if (command.includes('about') || command.includes('about me') || command.includes('who am i') || command.includes('who are you')) {
      setActiveComponent('about');
      setErrorMsg('');
    } else if (command.includes('resume') || command.includes('experience')) {
      setActiveComponent('resume');
      setErrorMsg('');
    } else if (command.includes('connect with me') || command.includes('contact') || command.includes('social') || command.includes('hi') || command.includes('hello')) {
      setActiveComponent('connect');
      setErrorMsg('');
    } else if (command.includes('bulls eye') || command.includes('bullseye') || command.includes('game') || command.includes('play') || command.includes('play my fav word game')) {
      setActiveComponent('bullseye');
      setErrorMsg('');
    } else if (command === 'clear' || command === '') {
      setActiveComponent(null);
      setErrorMsg('');
    } else {
      setActiveComponent(null);
      setErrorMsg(`I don't know how to respond to "${cmdStr}". Try "resume", "connect with me", or "play game".`);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(inputValue);
    setShowSuggestions(false);
  };

  return (
    <div className={`app-container ${matrixState !== 'inactive' ? 'matrix-active' : ''}`}>
      {matrixState !== 'inactive' && <MatrixRain isFading={matrixState === 'fading'} />}
      <div className={`search-section ${activeComponent ? 'compact' : ''}`}>
        <img
          src={matrixState !== 'inactive' ? avatarMatrixImg : avatarImg}
          alt="Aman Guliani"
          className="main-avatar clickable"
          onClick={() => {
            if (matrixState !== 'inactive') return;
            const newClicks = avatarClicks + 1;
            setAvatarClicks(newClicks);

            if (newClicks >= 10) {
              setMatrixState('active');
              setAvatarClicks(0);
              handleCommand('about me');
            } else {
              setActiveComponent(null);
              setInputValue('');
              setErrorMsg('');
            }
          }}
        />
        <div className="search-bar-container">
          <form className="search-bar" onSubmit={handleSubmit}>
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Ask Aman..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="search-input"
              autoFocus
            />
          </form>
          {showSuggestions && inputValue && (
            <div className="suggestions-dropdown glass-panel animate-fade-in">
              {COMMANDS.filter(c => c.includes(inputValue.toLowerCase())).map((cmd, idx) => (
                <div
                  key={idx}
                  className="suggestion-item"
                  onClick={() => {
                    handleCommand(cmd);
                    setShowSuggestions(false);
                  }}
                >
                  <Search size={14} className="suggestion-icon" />
                  {cmd}
                </div>
              ))}
              {COMMANDS.filter(c => c.includes(inputValue.toLowerCase())).length === 0 && (
                <div className="suggestion-item disabled">No matching commands</div>
              )}
            </div>
          )}
        </div>
        {!activeComponent && !errorMsg && (
          <p className="search-hints">
            Try: <span onClick={() => { setInputValue('about me'); setActiveComponent('about'); }}>About Aman</span>,
            <span onClick={() => { setInputValue('resume'); setActiveComponent('resume'); }}> Resume</span>,
            <span onClick={() => { setInputValue('connect with me'); setActiveComponent('connect'); }}> Connect with me</span>,
            <span onClick={() => { setInputValue('play my fav word game'); setActiveComponent('bullseye'); }}> Play a game</span>
          </p>
        )}
        {errorMsg && <p className="error-text">{errorMsg}</p>}
      </div>

      <div className="result-section animate-fade-in" style={{ display: activeComponent ? 'flex' : 'none' }}>
        <div style={{ display: activeComponent === 'about' ? 'block' : 'none', width: '100%' }}>
          <About />
        </div>
        <div style={{ display: activeComponent === 'resume' ? 'block' : 'none', width: '100%' }}>
          <Resume />
        </div>
        <div style={{ display: activeComponent === 'connect' ? 'block' : 'none', width: '100%' }}>
          <Connect />
        </div>
        <div style={{ display: activeComponent === 'bullseye' ? 'block' : 'none', width: '100%' }}>
          <BullsEye />
        </div>
      </div>
    </div>
  );
}

export default App;

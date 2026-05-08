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
import Photos from './components/Photos';
import { searchContent } from './searchIndex';
import type { SearchEntry } from './searchIndex';



type ActiveComponent = 'resume' | 'connect' | 'bullseye' | 'about' | 'photos' | null;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [matrixState, setMatrixState] = useState<'inactive' | 'active' | 'fading'>('inactive');
  const [searchResults, setSearchResults] = useState<SearchEntry[]>([]);

  useEffect(() => {
    if (avatarClicks > 0 && avatarClicks < 10) {
      const timer = setTimeout(() => setAvatarClicks(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [avatarClicks]);

  useEffect(() => {
    if (matrixState === 'active') {
      const timer = setTimeout(() => setMatrixState('fading'), 5000);
      return () => clearTimeout(timer);
    } else if (matrixState === 'fading') {
      const timer = setTimeout(() => setMatrixState('inactive'), 1500);
      return () => clearTimeout(timer);
    }
  }, [matrixState]);

  // Update search results when input changes
  useEffect(() => {
    if (inputValue.trim()) {
      setSearchResults(searchContent(inputValue));
    } else {
      setSearchResults([]);
    }
  }, [inputValue]);

  const navigateTo = (route: ActiveComponent) => {
    setActiveComponent(route);
    setErrorMsg('');
  };

  const handleCommand = (cmdStr: string) => {
    const command = cmdStr.toLowerCase().trim();
    setInputValue(cmdStr);

    if (command.includes('about') || command.includes('who am i') || command.includes('who are you')) {
      navigateTo('about');
    } else if (command.includes('resume') || command.includes('experience')) {
      navigateTo('resume');
    } else if (command.includes('connect') || command.includes('contact') || command.includes('social') || command.includes('hi') || command.includes('hello') || command.includes('email')) {
      navigateTo('connect');
    } else if (command.includes('bulls eye') || command.includes('bullseye') || command.includes('game') || command.includes('play')) {
      navigateTo('bullseye');
    } else if (command.includes('photo') || command.includes('gallery') || command.includes('picture') || command.includes('image')) {
      navigateTo('photos');
    } else if (command === 'clear' || command === '') {
      setActiveComponent(null);
      setErrorMsg('');
    } else {
      setActiveComponent(null);
      setErrorMsg(`I don't know how to respond to "${cmdStr}". Try "resume", "connect", "photos", or "play game".`);
    }
  };

  const handleSearchSelect = (entry: SearchEntry) => {
    navigateTo(entry.route);
    setInputValue(entry.label);
    setShowSuggestions(false);
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
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="suggestion-item"
                      onClick={() => handleSearchSelect(result)}
                    >
                      <span className="suggestion-emoji">{result.icon}</span>
                      <div className="suggestion-text">
                        <span className="suggestion-label">{result.label}</span>
                        <span className="suggestion-category">{result.category}</span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="suggestion-item disabled">No matching results</div>
              )}
            </div>
          )}
        </div>
        {!activeComponent && !errorMsg && (
          <p className="search-hints">
            Try: <span onClick={() => { setInputValue('about me'); navigateTo('about'); }}>About Aman</span>,
            <span onClick={() => { setInputValue('resume'); navigateTo('resume'); }}> Resume</span>,
            <span onClick={() => { setInputValue('connect with me'); navigateTo('connect'); }}> Connect</span>,
            <span onClick={() => { setInputValue('photos'); navigateTo('photos'); }}> Photos</span>,
            <span onClick={() => { setInputValue('play my fav word game'); navigateTo('bullseye'); }}> Play a game</span>
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
        <div style={{ display: activeComponent === 'photos' ? 'block' : 'none', width: '100%' }}>
          <Photos />
        </div>
      </div>
    </div>
  );
}

export default App;

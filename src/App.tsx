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
import Astrology from './components/Astrology';
import { searchContent } from './searchIndex';
import type { SearchEntry } from './searchIndex';
import { getRandomFunnyFact } from './funnyFacts';



type ActiveComponent = 'resume' | 'connect' | 'bullseye' | 'about' | 'photos' | 'astrology' | 'photobook' | null;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [funnyMsg, setFunnyMsg] = useState('');
  const [hintMsg, setHintMsg] = useState('');
  const [showPalmReading, setShowPalmReading] = useState(false);
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

  // Handle direct url paths (deep linking)
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, ''); // strip trailing slash
    if (path === '/photobook' || path === '/riyan-photobook') {
      setActiveComponent('photobook');
      setInputValue('riyan photobook');
    }
  }, []);

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
    setFunnyMsg('');
    setHintMsg('');
    setShowPalmReading(false);
  };

  const handleCommand = (cmdStr: string) => {
    const command = cmdStr.toLowerCase().trim();
    setInputValue(cmdStr);

    const personalKeywords = ['age', 'old are you', 'birthday', 'favorite', 'favourite', 'hobby', 'hobbies',
      'married', 'wife', 'girlfriend', 'boyfriend', 'single', 'relationship',
      'height', 'tall', 'weight', 'pet', 'dog', 'cat', 'food', 'color', 'colour', 'music',
      'movie', 'book', 'personal', 'fun fact', 'tell me something', 'interesting about',
      'what do you like', 'what does aman like', 'how old', 'where are you from', 'where do you live',
      'hometown', 'born', 'family'];
    const isPersonalQ = personalKeywords.some(kw => command.includes(kw));

    const hintKeywords = ['hint', 'easter egg', 'secret', 'hidden', 'surprise', 'mystery', 'cheat', 'trick',
      'unlock', 'special', 'bonus'];
    const isHintQ = hintKeywords.some(kw => command.includes(kw));

    // Palm reading → show hand link
    const isPalmQ = command.includes('palm reading') || command.includes('palm') || command.includes('read my palm');

    // Secret astrology game
    const astroKeywords = ['astrology', 'horoscope', 'tarot', 'fortune', 'cosmic', 'oracle'];
    const isAstroQ = astroKeywords.some(kw => command.includes(kw));

    const isPhotobookQ = command.includes('riyan') || command.includes('photobook') || command.includes('dadi') || command === 'book';

    if (isPalmQ) {
      setActiveComponent(null);
      setErrorMsg('');
      setFunnyMsg('');
      setHintMsg('');
      setShowPalmReading(true);
    } else if (isAstroQ) {
      navigateTo('astrology');
    } else if (isPhotobookQ) {
      navigateTo('photobook');
    } else if (isPersonalQ) {
      setActiveComponent(null);
      setErrorMsg('');
      setHintMsg('');
      setShowPalmReading(false);
      setFunnyMsg(getRandomFunnyFact());
    } else if (isHintQ) {
      setActiveComponent(null);
      setErrorMsg('');
      setFunnyMsg('');
      setShowPalmReading(false);
      setHintMsg('\u{1F52E} The oracle speaks\u2026 "Click on my avatar 10 times you shall, and a prize you\'ll receive." But beware \u2014 only the swift and persistent shall be rewarded. The window of fate is\u2026 brief. \u23F3');
    } else if (command.includes('about') || command.includes('who am i') || command.includes('who are you')) {
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
      setFunnyMsg('');
      setHintMsg('');
      setShowPalmReading(false);
    } else {
      setActiveComponent(null);
      setFunnyMsg('');
      setHintMsg('');
      setShowPalmReading(false);
      setErrorMsg(`I don't know how to respond to "${cmdStr}". Try "resume", "connect", "photos", or "play game".`);
    }
  };

  const handleSearchSelect = (entry: SearchEntry) => {
    handleCommand(entry.label);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(inputValue);
    setShowSuggestions(false);
  };

  if (activeComponent === 'photobook') {
    return (
      <div className="photobook-full-page" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999, background: '#FAF7F2' }}>
        <button
          onClick={() => {
            setActiveComponent(null);
            setInputValue('');
          }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 100000,
            background: 'rgba(44, 36, 22, 0.85)',
            color: '#FAF7F2',
            border: 'none',
            borderRadius: '30px',
            padding: '10px 20px',
            fontFamily: "'Jost', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s, transform 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(44, 36, 22, 1)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(44, 36, 22, 0.85)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ← Back to Home
        </button>
        <iframe
          src="/photobook/index.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Riyan's Photobook"
        />
      </div>
    );
  }

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
              setFunnyMsg('');
              setHintMsg('');
              setShowPalmReading(false);
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
            <span onClick={() => { setInputValue('riyan photobook'); navigateTo('photobook'); }}> Riyan's Photobook</span>,
            <span onClick={() => { setInputValue('play my fav word game'); navigateTo('bullseye'); }}> Play a game</span>
          </p>
        )}
        {showPalmReading && (
          <div className="palm-reading-card animate-fade-in">
            <a
              href="https://opal.google/app/1pAcPtP6LYezie5A6hbN9vYKW4kgG7XiA"
              target="_blank"
              rel="noopener noreferrer"
              className="palm-hand-link"
            >
              <span className="palm-hand-emoji">🤚</span>
            </a>
            <p className="palm-reading-text">Touch the palm to reveal your fate…</p>
          </div>
        )}
        {funnyMsg && (
          <div className="funny-response animate-fade-in">
            <p>{funnyMsg}</p>
          </div>
        )}
        {hintMsg && (
          <div className="hint-response animate-fade-in">
            <p>{hintMsg}</p>
          </div>
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
        <div style={{ display: activeComponent === 'astrology' ? 'block' : 'none', width: '100%' }}>
          <Astrology />
        </div>
      </div>
    </div>
  );
}

export default App;

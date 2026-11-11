import { useState, useEffect, useMemo } from 'react';
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
import Astrology from './components/Astrology';
import Blog from './components/Blog';
import { BLOG_POSTS } from './blogData';
import { searchContent } from './searchIndex';
import type { SearchEntry } from './searchIndex';
import { getRandomFunnyFact } from './funnyFacts';



type ActiveComponent = 'resume' | 'connect' | 'bullseye' | 'about' | 'astrology' | 'blog' | null;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [funnyMsg, setFunnyMsg] = useState('');
  const [hintMsg, setHintMsg] = useState('');
  const [showPalmReading, setShowPalmReading] = useState(false);
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
      const timer = setTimeout(() => setMatrixState('fading'), 5000);
      return () => clearTimeout(timer);
    } else if (matrixState === 'fading') {
      const timer = setTimeout(() => setMatrixState('inactive'), 1500);
      return () => clearTimeout(timer);
    }
  }, [matrixState]);

  const searchResults = useMemo(() => {
    return inputValue.trim() ? searchContent(inputValue) : [];
  }, [inputValue]);

  // Read URL query parameters on initial mount & handle browser back/forward (popstate)
  useEffect(() => {
    const parseUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const postParam = params.get('post') || params.get('article');
      const tabParam = params.get('tab');

      if (postParam) {
        const found = BLOG_POSTS.find(p => p.id === postParam);
        if (found) {
          setSelectedPostId(found.id);
          setActiveComponent('blog');
          setInputValue(found.title);
          return;
        }
      }

      if (tabParam && ['resume', 'connect', 'bullseye', 'about', 'astrology', 'blog'].includes(tabParam)) {
        setActiveComponent(tabParam as ActiveComponent);
        if (tabParam !== 'blog') {
          setSelectedPostId(null);
        }
      }
    };

    parseUrlState();

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const postParam = params.get('post') || params.get('article');
      const tabParam = params.get('tab');

      if (postParam) {
        const found = BLOG_POSTS.find(p => p.id === postParam);
        if (found) {
          setSelectedPostId(found.id);
          setActiveComponent('blog');
          setInputValue(found.title);
          return;
        }
      }

      if (tabParam && ['resume', 'connect', 'bullseye', 'about', 'astrology', 'blog'].includes(tabParam)) {
        setSelectedPostId(null);
        setActiveComponent(tabParam as ActiveComponent);
      } else {
        setSelectedPostId(null);
        setActiveComponent(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL query parameters whenever route or selected post changes
  useEffect(() => {
    const url = new URL(window.location.href);
    const currentPost = url.searchParams.get('post') || url.searchParams.get('article');
    const currentTab = url.searchParams.get('tab');

    let targetPost: string | null = null;
    let targetTab: string | null = null;

    if (activeComponent === 'blog' && selectedPostId) {
      targetPost = selectedPostId;
    } else if (activeComponent) {
      targetTab = activeComponent;
    }

    if (currentPost !== targetPost || currentTab !== targetTab) {
      if (targetPost) {
        url.searchParams.set('post', targetPost);
        url.searchParams.delete('tab');
        url.searchParams.delete('article');
      } else if (targetTab) {
        url.searchParams.set('tab', targetTab);
        url.searchParams.delete('post');
        url.searchParams.delete('article');
      } else {
        url.searchParams.delete('post');
        url.searchParams.delete('article');
        url.searchParams.delete('tab');
      }
      window.history.pushState({}, '', url.toString());
    }
  }, [activeComponent, selectedPostId]);

  const navigateTo = (route: ActiveComponent) => {
    setActiveComponent(route);
    if (route !== 'blog') {
      setSelectedPostId(null);
    }
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

    // Blog keywords
    const blogKeywords = ['blog', 'article', 'articles', 'post', 'posts', 'writing', 'writings', 'essay', 'essays', 'publication', 'publications', 'read'];
    const isBlogCommand = blogKeywords.some(kw => command === kw || command.startsWith(kw + ' ') || command.endsWith(' ' + kw) || command === `read ${kw}`);

    // Specific blog post search
    const matchedBlogPost = BLOG_POSTS.find(p =>
      command === p.id ||
      command === p.title.toLowerCase() ||
      (command.length >= 4 && p.title.toLowerCase().includes(command)) ||
      (command.length >= 4 && command.includes(p.title.toLowerCase())) ||
      (command.length >= 4 && p.tags.some(t => t.toLowerCase() === command))
    );

    if (isPalmQ) {
      setActiveComponent(null);
      setErrorMsg('');
      setFunnyMsg('');
      setHintMsg('');
      setShowPalmReading(true);
    } else if (isAstroQ) {
      navigateTo('astrology');
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
    } else if (matchedBlogPost) {
      setSelectedPostId(matchedBlogPost.id);
      navigateTo('blog');
    } else if (isBlogCommand || command.includes('blog')) {
      setSelectedPostId(null);
      navigateTo('blog');
    } else if (command.includes('connect') || command.includes('contact') || command.includes('social') || command.includes('hi') || command.includes('hello') || command.includes('email')) {
      navigateTo('connect');
    } else if (command.includes('bulls eye') || command.includes('bullseye') || command.includes('game') || command.includes('play')) {
      navigateTo('bullseye');
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
      setErrorMsg(`I don't know how to respond to "${cmdStr}". Try "about", "resume", "blog", "connect", or "play game".`);
    }
  };

  const handleSearchSelect = (entry: SearchEntry) => {
    if (entry.route === 'blog') {
      if (entry.targetId) {
        setSelectedPostId(entry.targetId);
      } else {
        setSelectedPostId(null);
      }
      setInputValue(entry.label);
      navigateTo('blog');
    } else {
      handleCommand(entry.label);
    }
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
            <span onClick={() => { setInputValue('blog'); setSelectedPostId(null); navigateTo('blog'); }}> Blog</span>,
            <span onClick={() => { setInputValue('connect with me'); navigateTo('connect'); }}> Connect</span>,
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
        <div style={{ display: activeComponent === 'astrology' ? 'block' : 'none', width: '100%' }}>
          <Astrology />
        </div>
        <div style={{ display: activeComponent === 'blog' ? 'block' : 'none', width: '100%' }}>
          <Blog selectedPostId={selectedPostId} onSelectPost={setSelectedPostId} />
        </div>
      </div>
    </div>
  );
}

export default App;

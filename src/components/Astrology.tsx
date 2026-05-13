import { useState, useEffect, useCallback } from 'react';
import './Astrology.css';

// ── Zodiac data ──
const ZODIAC_SIGNS = [
  { sign: 'Aries', symbol: '♈', dates: 'Mar 21 – Apr 19', element: 'Fire' },
  { sign: 'Taurus', symbol: '♉', dates: 'Apr 20 – May 20', element: 'Earth' },
  { sign: 'Gemini', symbol: '♊', dates: 'May 21 – Jun 20', element: 'Air' },
  { sign: 'Cancer', symbol: '♋', dates: 'Jun 21 – Jul 22', element: 'Water' },
  { sign: 'Leo', symbol: '♌', dates: 'Jul 23 – Aug 22', element: 'Fire' },
  { sign: 'Virgo', symbol: '♍', dates: 'Aug 23 – Sep 22', element: 'Earth' },
  { sign: 'Libra', symbol: '♎', dates: 'Sep 23 – Oct 22', element: 'Air' },
  { sign: 'Scorpio', symbol: '♏', dates: 'Oct 23 – Nov 21', element: 'Water' },
  { sign: 'Sagittarius', symbol: '♐', dates: 'Nov 22 – Dec 21', element: 'Fire' },
  { sign: 'Capricorn', symbol: '♑', dates: 'Dec 22 – Jan 19', element: 'Earth' },
  { sign: 'Aquarius', symbol: '♒', dates: 'Jan 20 – Feb 18', element: 'Air' },
  { sign: 'Pisces', symbol: '♓', dates: 'Feb 19 – Mar 20', element: 'Water' },
];

// Emoji mapping for tarot cards (by name or fallback)
const TAROT_EMOJI_MAP: Record<string, string> = {
  'The Fool': '🃏',
  'The Magician': '🪄',
  'The High Priestess': '🌙',
  'The Empress': '👑',
  'The Emperor': '🏛️',
  'The Hierophant': '📿',
  'The Lovers': '💞',
  'The Chariot': '⚡',
  'Strength': '🦁',
  'The Hermit': '🏔️',
  'Wheel of Fortune': '🎡',
  'Justice': '⚖️',
  'The Hanged Man': '🔗',
  'Death': '🦋',
  'Temperance': '🕊️',
  'The Devil': '😈',
  'The Tower': '🗼',
  'The Star': '⭐',
  'The Moon': '🌕',
  'The Sun': '☀️',
  'Judgement': '📯',
  'The World': '🌍',
};

const API_BASE = '/horoscope-api/api/v1';

// ── API types ──
interface HoroscopeResponse {
  data: {
    date: string;
    period: string;
    sign: string;
    horoscope: string;
  };
}

interface TarotCard {
  type: string;
  name: string;
  name_short: string;
  value: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
}

interface TarotResponse {
  nhits: number;
  cards: TarotCard[];
}

type Phase = 'intro' | 'zodiac' | 'loading' | 'reading';

const Astrology = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedSign, setSelectedSign] = useState<typeof ZODIAC_SIGNS[0] | null>(null);
  const [horoscope, setHoroscope] = useState('');
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<Set<number>>(new Set());
  const [loadingError, setLoadingError] = useState('');
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number; size: number }[]>([]);

  // Generate floating particles
  useEffect(() => {
    const pts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 3,
    }));
    setParticles(pts);
  }, []);

  const fetchReadings = useCallback(async (sign: typeof ZODIAC_SIGNS[0]) => {
    setPhase('loading');
    setLoadingError('');
    setFlippedIndices(new Set());

    try {
      const [horoRes, tarotRes] = await Promise.all([
        fetch(`${API_BASE}/get-horoscope/daily?sign=${sign.sign.toLowerCase()}`),
        fetch(`${API_BASE}/tarot/cards/random?n=3`),
      ]);

      if (!horoRes.ok || !tarotRes.ok) {
        throw new Error('API request failed');
      }

      const horoData: HoroscopeResponse = await horoRes.json();
      const tarotData: TarotResponse = await tarotRes.json();

      setHoroscope(horoData.data.horoscope);
      setTarotCards(tarotData.cards);
      setPhase('reading');
    } catch (err) {
      console.error('Failed to fetch readings:', err);
      setLoadingError('The cosmic connection faltered… please try again.');
      setPhase('zodiac');
    }
  }, []);

  const handleSignSelect = (sign: typeof ZODIAC_SIGNS[0]) => {
    setSelectedSign(sign);
    fetchReadings(sign);
  };

  const handleFlip = useCallback((idx: number) => {
    if (flippedIndices.has(idx)) return;
    const next = new Set(flippedIndices);
    next.add(idx);
    setFlippedIndices(next);
  }, [flippedIndices]);

  const getCardEmoji = (cardName: string): string => {
    return TAROT_EMOJI_MAP[cardName] || '🎴';
  };

  const resetGame = () => {
    setPhase('intro');
    setSelectedSign(null);
    setHoroscope('');
    setTarotCards([]);
    setFlippedIndices(new Set());
    setLoadingError('');
  };

  const allFlipped = flippedIndices.size === tarotCards.length && tarotCards.length > 0;

  return (
    <div className="astrology-container animate-fade-in">
      {/* Floating star particles */}
      <div className="astro-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="astro-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {/* ── Phase: Intro ── */}
      {phase === 'intro' && (
        <div className="astro-intro animate-fade-in">
          <div className="astro-orb">🔮</div>
          <h2 className="astro-title">The Cosmic Oracle</h2>
          <p className="astro-subtitle">
            You have found the hidden sanctum.<br />
            The stars have been waiting for you.
          </p>
          <button className="astro-cta" onClick={() => setPhase('zodiac')}>
            Reveal My Fate
          </button>
        </div>
      )}

      {/* ── Phase: Zodiac picker ── */}
      {phase === 'zodiac' && (
        <div className="astro-zodiac animate-fade-in">
          <h2 className="astro-title">Choose Your Sign</h2>
          <p className="astro-subtitle">Select the constellation that governs your soul.</p>
          {loadingError && (
            <div className="astro-error animate-fade-in">
              <p>⚠️ {loadingError}</p>
            </div>
          )}
          <div className="zodiac-grid">
            {ZODIAC_SIGNS.map(z => (
              <button
                key={z.sign}
                className={`zodiac-card glass-panel ${selectedSign?.sign === z.sign ? 'selected' : ''}`}
                onClick={() => handleSignSelect(z)}
              >
                <span className="zodiac-symbol">{z.symbol}</span>
                <span className="zodiac-name">{z.sign}</span>
                <span className="zodiac-dates">{z.dates}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Phase: Loading ── */}
      {phase === 'loading' && (
        <div className="astro-loading animate-fade-in">
          <div className="loading-orb">🔮</div>
          <p className="loading-text">Consulting the stars…</p>
          <div className="loading-dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      )}

      {/* ── Phase: Reading ── */}
      {phase === 'reading' && selectedSign && (
        <div className="astro-reading animate-fade-in">
          {/* Header */}
          <div className="reading-header">
            <span className="reading-sign-symbol">{selectedSign.symbol}</span>
            <h2 className="astro-title">{selectedSign.sign}</h2>
            <span className="reading-element-badge">{selectedSign.element}</span>
          </div>

          {/* Daily Horoscope */}
          <div className="horoscope-section glass-panel">
            <h3 className="section-label">✨ Today's Horoscope</h3>
            <p className="horoscope-text">{horoscope}</p>
          </div>

          {/* Tarot Cards */}
          <div className="tarot-section">
            <h3 className="section-label">🃏 Your Tarot Spread</h3>
            <p className="astro-subtitle">
              {!allFlipped
                ? 'Tap each card to reveal its message…'
                : 'The cards have spoken.'}
            </p>

            <div className="tarot-spread">
              {tarotCards.map((card, idx) => {
                const isFlipped = flippedIndices.has(idx);
                const positionLabel = ['Past', 'Present', 'Future'][idx] || '';
                return (
                  <div key={idx} className="tarot-card-wrapper">
                    <span className="tarot-position">{positionLabel}</span>
                    <div
                      className={`tarot-card ${isFlipped ? 'flipped' : ''}`}
                      onClick={() => handleFlip(idx)}
                    >
                      <div className="tarot-inner">
                        {/* Back face */}
                        <div className="tarot-back">
                          <div className="tarot-back-design">
                            <span className="tarot-back-star">✦</span>
                            <span className="tarot-back-symbol">☽</span>
                            <span className="tarot-back-star bottom">✦</span>
                          </div>
                        </div>
                        {/* Front face */}
                        <div className="tarot-front">
                          <span className="tarot-emoji">{getCardEmoji(card.name)}</span>
                          <span className="tarot-name">{card.name}</span>
                          <span className="tarot-type-badge">{card.type === 'major' ? 'Major Arcana' : 'Minor Arcana'}</span>
                          <p className="tarot-meaning">{card.meaning_up}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reveal reversed meanings after all cards are flipped */}
          {allFlipped && (
            <div className="reversed-section animate-fade-in">
              <div className="cosmic-divider">✧ ✦ ✧</div>
              <h3 className="section-label">🔄 Reversed Meanings</h3>
              <p className="astro-subtitle" style={{ marginBottom: '1rem' }}>
                What the cards warn when inverted…
              </p>
              <div className="reversed-cards">
                {tarotCards.map((card, idx) => (
                  <div key={idx} className="reversed-card glass-panel">
                    <span className="reversed-card-name">{getCardEmoji(card.name)} {card.name}</span>
                    <p className="reversed-card-meaning">{card.meaning_rev}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="reading-actions">
            <button className="astro-cta secondary" onClick={() => { setPhase('zodiac'); setLoadingError(''); }}>
              Choose Another Sign
            </button>
            <button className="astro-cta secondary" onClick={resetGame}>
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Astrology;

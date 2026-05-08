// Centralized search index for full-site search
// Each entry has searchable text, a display label, a category, and the route to navigate to

export interface SearchEntry {
  text: string;       // searchable content (lowercased internally)
  label: string;      // what to display in the dropdown
  category: string;   // e.g. "About", "Resume", "Photos"
  route: 'about' | 'resume' | 'connect' | 'bullseye' | 'photos';
  icon: string;       // emoji to display
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Commands (top-level navigation)
  { text: 'about me', label: 'About Me', category: 'Navigation', route: 'about', icon: '👤' },
  { text: 'resume experience work history', label: 'Resume', category: 'Navigation', route: 'resume', icon: '📄' },
  { text: 'connect with me contact social email', label: 'Connect with Me', category: 'Navigation', route: 'connect', icon: '🤝' },
  { text: 'play my fav word game bulls eye bullseye', label: 'Play Bulls Eye', category: 'Navigation', route: 'bullseye', icon: '🎯' },
  { text: 'photos gallery pictures images', label: 'Photo Gallery', category: 'Navigation', route: 'photos', icon: '📸' },

  // About content
  { text: 'aman guliani senior engineering lead google', label: 'Senior Engineering Lead at Google', category: 'About', route: 'about', icon: '👤' },
  { text: 'scalable systems ml pipelines machine learning', label: 'ML Pipelines & Scalable Systems', category: 'About', route: 'about', icon: '👤' },
  { text: 'teaching python kids beginners education', label: 'Teaching Python to Kids', category: 'About', route: 'about', icon: '👤' },
  { text: 'amazon aws audible', label: 'Amazon / AWS / Audible Experience', category: 'About', route: 'about', icon: '👤' },

  // Resume content
  { text: 'senior engineering lead google new york fleet management', label: 'Google — Senior Engineering Lead', category: 'Resume', route: 'resume', icon: '💼' },
  { text: 'automated ml pipeline fleet management', label: 'Automated ML Pipeline at Google', category: 'Resume', route: 'resume', icon: '💼' },
  { text: 'software developer lead amazon global logistic boston', label: 'Amazon — Software Developer Lead', category: 'Resume', route: 'resume', icon: '💼' },
  { text: 'price aggregator shipment capacity planner', label: 'Price Aggregator & Capacity Planner', category: 'Resume', route: 'resume', icon: '💼' },
  { text: 'aws migration hub control tower continuous export', label: 'AWS — Migration Hub / Control Tower', category: 'Resume', route: 'resume', icon: '💼' },
  { text: 'audible android platform channels', label: 'Audible — Android Platform', category: 'Resume', route: 'resume', icon: '💼' },
  { text: 'executive mba nyu new york university', label: 'NYU — Executive MBA', category: 'Resume', route: 'resume', icon: '🎓' },
  { text: 'ms electrical computer engineering rutgers', label: 'Rutgers — MS ECE', category: 'Resume', route: 'resume', icon: '🎓' },

  // Connect content
  { text: 'linkedin social profile', label: 'LinkedIn Profile', category: 'Connect', route: 'connect', icon: '🔗' },
  { text: 'instagram social', label: 'Instagram', category: 'Connect', route: 'connect', icon: '📷' },
  { text: 'email amanguliani@gmail.com contact message', label: 'Email — amanguliani@gmail.com', category: 'Connect', route: 'connect', icon: '✉️' },

  // Photos content
  { text: 'photos gallery pictures images memories', label: 'Photo Gallery', category: 'Photos', route: 'photos', icon: '📸' },
];

/**
 * Search across the full index with simple fuzzy matching.
 * Returns results ranked by relevance (exact > starts-with > includes).
 */
export function searchContent(query: string): SearchEntry[] {
  if (!query.trim()) return [];
  
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  // Score each entry
  const scored = SEARCH_INDEX.map(entry => {
    const text = entry.text.toLowerCase();
    let score = 0;

    // Exact match on full query
    if (text.includes(q)) {
      score += 10;
    }

    // Individual word matches
    for (const word of words) {
      if (word.length < 2) continue;
      if (text.includes(word)) {
        score += 3;
      }
      // Partial word match
      if (text.split(/\s+/).some(t => t.startsWith(word))) {
        score += 2;
      }
    }

    return { entry, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(s => s.entry);
}

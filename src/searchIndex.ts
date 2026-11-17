// Centralized search index for full-site search
// Each entry has searchable text, a display label, a category, and the route to navigate to
import { BLOG_POSTS } from './blogData';
import { PAPER_PATH_ENTRIES } from './paperPathData';

export interface SearchEntry {
  text: string;       // searchable content (lowercased internally)
  label: string;      // what to display in the dropdown
  category: string;   // e.g. "About", "Resume", "Connect", "Blog", "Navigation"
  route: 'about' | 'resume' | 'connect' | 'bullseye' | 'astrology' | 'blog';
  icon: string;       // emoji to display
  targetId?: string;  // optional post or section ID
  paperNumber?: string; // optional paper # inside LLM Paper Path
}

// Convert blog posts into rich search entries
const blogSearchEntries: SearchEntry[] = BLOG_POSTS.map(post => ({
  text: `${post.title} ${post.excerpt} ${post.tags.join(' ')} ${post.category} ${post.content.lead} ${post.content.sections.map(s => s.heading || '').join(' ')}`.toLowerCase(),
  label: post.title,
  category: `Blog • ${post.category}`,
  route: 'blog',
  icon: '📰',
  targetId: post.id,
}));

// Index all 22 LLM Paper Path papers individually for instant deep-linking
const paperPathSearchEntries: SearchEntry[] = PAPER_PATH_ENTRIES.map(paper => ({
  text: `${paper.number} ${paper.title} ${paper.subtopic} ${paper.topic} ${paper.arxivId ?? paper.externalLabel ?? ''} ${paper.summary} ${paper.builderTakeaway}`.toLowerCase(),
  label: `#${paper.number} · ${paper.title}`,
  category: `Paper Path • ${paper.topic}`,
  route: 'blog',
  icon: '📑',
  targetId: 'llm-paper-path-going-deeper',
  paperNumber: paper.number,
}));

export const SEARCH_INDEX: SearchEntry[] = [
  // Commands (top-level navigation)
  { text: 'about me who am i', label: 'About Me', category: 'Navigation', route: 'about', icon: '👤' },
  { text: 'resume experience work history career', label: 'Resume', category: 'Navigation', route: 'resume', icon: '📄' },
  { text: 'blog articles posts writing essays thoughts publications', label: 'Blog & Articles', category: 'Navigation', route: 'blog', icon: '📝' },
  {
    text: 'llm paper path reading list arxiv papers self study personal agent mac notebooklm podcast infographic voice mode commute 22 papers',
    label: 'LLM Paper Path (22 Papers)',
    category: 'AI & ML • Self-Study',
    route: 'blog',
    icon: '📚',
    targetId: 'llm-paper-path-going-deeper',
  },
  { text: 'connect with me contact social email linkedin', label: 'Connect with Me', category: 'Navigation', route: 'connect', icon: '🤝' },
  { text: 'play my fav word game bulls eye bullseye game', label: 'Play Bulls Eye', category: 'Navigation', route: 'bullseye', icon: '🎯' },

  // Blog Posts
  ...blogSearchEntries,

  // Individual LLM Papers
  ...paperPathSearchEntries,

  // About content
  { text: 'aman guliani engineering leader google', label: 'Engineering Leader at Google', category: 'About', route: 'about', icon: '👤' },
  { text: 'scalable systems ml pipelines machine learning', label: 'ML Pipelines & Scalable Systems', category: 'About', route: 'about', icon: '👤' },
  { text: 'teaching python kids beginners education', label: 'Teaching Python to Kids', category: 'About', route: 'about', icon: '👤' },
  { text: 'amazon aws audible', label: 'Amazon / AWS / Audible Experience', category: 'About', route: 'about', icon: '👤' },

  // Resume content
  {
    text: 'stealth stage ai startup co-founder technical lead consumer llm beta',
    label: 'Stealth-Stage AI Startup — Co-Founder & Technical Lead',
    category: 'Resume',
    route: 'resume',
    icon: '🚀',
  },
  {
    text: 'l6 engineering manager google enterprise ai foundations support platforms mcp servicenow cloud spanner kafka pubsub hyderabad sydney sf bay area ai summit',
    label: 'Google — L6 Engineering Manager (Enterprise AI & Support)',
    category: 'Resume',
    route: 'resume',
    icon: '💼',
  },
  {
    text: 'google meet hardware google beam 35000 rooms ml health auto repair reliability fleet consoles',
    label: 'Google — Meet Hardware & Beam Fleet (35,000+ Rooms)',
    category: 'Resume',
    route: 'resume',
    icon: '💼',
  },
  {
    text: 'sr software developer manager amazon global transportation compliance boston shipment api price aggregator capacity planner',
    label: 'Amazon — Sr Software Developer Manager (Global Transportation)',
    category: 'Resume',
    route: 'resume',
    icon: '💼',
  },
  {
    text: 'aws migration hub founding team control tower continuous export guardrails reinvent boston',
    label: 'AWS — Migration Hub & Control Tower',
    category: 'Resume',
    route: 'resume',
    icon: '💼',
  },
  {
    text: 'audible android platform fire phone audio player streaming short content common libraries sso',
    label: 'Audible — Android Platform, Fire Phone & SSO',
    category: 'Resume',
    route: 'resume',
    icon: '💼',
  },
  {
    text: 'amazon kindle community website ebook chat facebook twitter x-ray seattle',
    label: 'Amazon — Kindle Community & X-Ray',
    category: 'Resume',
    route: 'resume',
    icon: '💼',
  },
  { text: 'executive mba nyu stern school of business new york university', label: 'NYU Stern — Executive MBA', category: 'Resume', route: 'resume', icon: '🎓' },
  { text: 'masters science electrical computer engineering rutgers new brunswick', label: 'Rutgers — MS ECE', category: 'Resume', route: 'resume', icon: '🎓' },
  { text: 'bachelors electronics communication manipal institute of technology india', label: 'Manipal — BE Electronics & Communication', category: 'Resume', route: 'resume', icon: '🎓' },
  {
    text: 'skills python kotlin java c++ dart sql cel protobuf rag mcp multi-agent orchestration context compaction evals spanner pubsub kafka terraform gcp aws react',
    label: 'Skills & Technical Architecture',
    category: 'Resume',
    route: 'resume',
    icon: '🧰',
  },
  {
    text: 'coursera machine learning certification amazon bar raiser 600 interviews mentorship teaching biologists kids',
    label: 'Certifications, Bar Raiser (600+ Interviews) & Mentorship',
    category: 'Resume',
    route: 'resume',
    icon: '🏅',
  },

  // Connect content
  { text: 'linkedin social profile', label: 'LinkedIn Profile', category: 'Connect', route: 'connect', icon: '🔗' },
  { text: 'instagram social', label: 'Instagram', category: 'Connect', route: 'connect', icon: '📷' },
  { text: 'email amanguliani@gmail.com contact message', label: 'Email — amanguliani@gmail.com', category: 'Connect', route: 'connect', icon: '✉️' },

  // Personal facts (funny responses)
  { text: 'favorite food hobby hobbies personal fun fact', label: 'Ask a Personal Question', category: 'Fun', route: 'about', icon: '😄' },
  { text: 'age birthday how old born family', label: 'Personal Facts about Aman', category: 'Fun', route: 'about', icon: '🎂' },

  // Easter egg hints
  { text: 'hint easter egg secret hidden surprise mystery', label: 'Is there an Easter Egg?', category: 'Mystery', route: 'about', icon: '🔮' },

  // The Cosmic Oracle (secret astrology game)
  { text: 'astrology horoscope tarot fortune cosmic oracle zodiac', label: 'The Cosmic Oracle', category: 'Mystery', route: 'astrology', icon: '🔮' },

  // Palm reading
  { text: 'palm reading read my palm palmistry', label: 'Palm Reading', category: 'Mystery', route: 'about', icon: '🤚' },
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

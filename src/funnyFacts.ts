/**
 * Fun facts about Aman — shown when someone asks a personal question.
 * Add new entries to the array below and they'll automatically rotate in.
 */
export const FUNNY_FACTS: string[] = [
  // Engineering & work
  "🤔 That's classified intel… but rumor has it Aman once debugged a prod issue in his sleep.",
  "🕵️ Personal facts? Aman's favorite design pattern is 'works on my machine'.",
  "⚡ Aman once shipped a feature so fast, CI/CD asked him to slow down.",
  "🎸 Legend says Aman's commit messages are more poetic than most song lyrics.",
  "💻 Aman's IDE theme is darker than his coffee — and that's saying something.",
  "🚀 Aman doesn't deploy on Fridays. Except that one time. We don't talk about that time.",
  "🧪 Aman once wrote a unit test so thorough, the code fixed itself.",

  // Teaching & mentoring
  "😄 Fun fact: Aman taught Python to kids — and they taught him patience.",
  "📚 Aman explains recursion by explaining recursion.",
  "🎓 Aman's MBA thesis had more architecture diagrams than most engineering docs.",

  // Food & lifestyle
  "🌮 Sources confirm Aman believes tacos are a valid dinner for every night of the week.",
  "☕ Aman's coffee-to-code ratio is scientifically optimized. The formula is classified.",
  "🍕 Aman once had a heated debate about whether a hot dog is a sandwich. He won.",

  // Personality
  "🧠 Aman's brain runs on two threads: one for code, one for coffee.",
  "🎯 You're asking the wrong questions… the real question is: can you beat Aman at Bulls Eye?",
  "🏔️ Aman treats every bug like a mountain — approaches it calmly, conquers it completely.",
  "🎵 Aman codes better with music. His playlist? That's the real secret.",
  "📱 Aman's phone has more developer tools than social media apps.",

  // Parenting & family
  "👶 Aman's son once submitted a PR. It was a crayon drawing. It was approved.",
  "🧸 Aman optimizes bedtime stories for maximum entertainment and minimum runtime.",

  // Meta & self-aware
  "🤖 You're literally talking to a website Aman built to deflect personal questions. Respect the hustle.",
  "🔮 The oracle says: Aman is exactly as mysterious as he wants to be.",
  "🪞 If you ask Aman about himself, he'll redirect you to his resume. Classic engineer move.",
];

/** Returns a random fun fact from the pool */
export const getRandomFunnyFact = (): string =>
  FUNNY_FACTS[Math.floor(Math.random() * FUNNY_FACTS.length)];

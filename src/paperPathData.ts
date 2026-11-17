export type PaperTopic =
  | 'How LLMs work'
  | 'Adapting and aligning'
  | 'Agents'
  | 'Measuring agents and models'
  | 'Reasoning: how AI thinks'
  | 'Security'
  | 'Training classics';

export type PaperStatus = 'read' | 'up-next';

export interface PaperEntry {
  number: string;
  subtopic: string;
  title: string;
  arxivId?: string;
  externalUrl?: string;
  externalLabel?: string;
  topic: PaperTopic;
  status: PaperStatus;
  isNextInQueue?: boolean;
  summary: string;
  diagramKey: string;
  diagramCaption: string;
  builderTakeaway: string;
}

export const PAPER_TOPICS: { topic: PaperTopic; pillLabel: string; subtitle: string }[] = [
  {
    topic: 'How LLMs work',
    pillLabel: 'How LLMs work',
    subtitle: 'The architecture, the big picture, and why bigger keeps getting better.',
  },
  {
    topic: 'Adapting and aligning',
    pillLabel: 'Adapting and aligning',
    subtitle: 'Cheap fine-tuning, and teaching a model to be helpful and harmless.',
  },
  {
    topic: 'Agents',
    pillLabel: 'Agents',
    subtitle: 'Models that think, use tools, learn from mistakes and work in real codebases.',
  },
  {
    topic: 'Measuring agents and models',
    pillLabel: 'Measuring agents',
    subtitle: 'How we grade chatbots and test agents on real work.',
  },
  {
    topic: 'Reasoning: how AI thinks',
    pillLabel: 'How AI thinks',
    subtitle: 'Whether models can check themselves, how reasoning is trained, and what really happens inside.',
  },
  {
    topic: 'Security',
    pillLabel: 'Security',
    subtitle: 'How LLM systems get attacked, and how to defend them.',
  },
  {
    topic: 'Training classics',
    pillLabel: 'Training classics',
    subtitle: 'Two older ideas still inside every LLM.',
  },
];

export const PAPER_PATH_ENTRIES: PaperEntry[] = [
  {
    number: '01',
    subtopic: 'Transformer architecture',
    title: 'Attention Is All You Need',
    arxivId: '1706.03762',
    topic: 'How LLMs work',
    status: 'read',
    summary:
      'Drops word-by-word reading and lets every word weigh every other word at once (attention). That trains in parallel, far faster, and became the base of every modern LLM.',
    diagramKey: 'attention',
    diagramCaption: 'every word looks at every word at once',
    builderTakeaway:
      'Self-attention scales quadratically with context length—dumping entire repos blindly into every agent call burns tokens, money, and attention focus ("lost in the middle").',
  },
  {
    number: '02',
    subtopic: 'Big-picture survey',
    title: 'Understanding Large Language Models',
    arxivId: '2607.01006',
    topic: 'How LLMs work',
    status: 'read',
    summary:
      'A tour of how LLMs are built, what they can and can\'t do, and how researchers look inside them. It argues "just memorized patterns" is too simple a dismissal, while real differences from human thinking remain.',
    diagramKey: 'survey',
    diagramCaption: 'the survey argues for a nuanced middle',
    builderTakeaway:
      'Don\'t dismiss LLMs as "stochastic parrots," and don\'t treat them as infallible teammates either. Design systems that assume structured pattern synthesis with brittle edges.',
  },
  {
    number: '03',
    subtopic: 'Scaling',
    title: 'Scaling Laws for Neural Language Models',
    arxivId: '2001.08361',
    topic: 'How LLMs work',
    status: 'read',
    summary:
      "Error drops along smooth, predictable curves as you add parameters, data and compute. So you can forecast a bigger model's quality before training it and split your budget wisely.",
    diagramKey: 'scaling',
    diagramCaption: 'more compute, data and parameters (log scale)',
    builderTakeaway:
      'Smooth power-law loss curves tell us throwing 10x compute yields predictable incremental drops—not magic. Better harnesses and retrieval often beat waiting for the next parameter bump.',
  },
  {
    number: '04',
    subtopic: 'Open, efficient models',
    title: 'LLaMA: Open and Efficient Foundation Language Models',
    arxivId: '2302.13971',
    topic: 'How LLMs work',
    status: 'read',
    summary:
      'Meta trained smaller models on more public text for longer, and the 13B version beat the far larger GPT-3 on most benchmarks. Proof that strong models can be open and cheap to run.',
    diagramKey: 'llama',
    diagramCaption: 'LLaMA: small, lots of data · GPT-3: big, less data',
    builderTakeaway:
      'Inference cost is governed by parameter count, not training duration. Over-training compact open models is the backbone of private on-device routing (like running Qwen locally on a Mac Mini).',
  },
  {
    number: '05',
    subtopic: 'Efficient fine-tuning',
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    arxivId: '2106.09685',
    topic: 'Adapting and aligning',
    status: 'read',
    summary:
      'Freeze the big model and train two tiny matrices beside each weight layer. You fine-tune a sliver of the parameters, swap tasks cheaply, and add no delay when the model runs.',
    diagramKey: 'lora',
    diagramCaption: 'frozen base weights + tiny, trainable A·B adapter',
    builderTakeaway:
      'Before jumping straight to fine-tuning, ask if RAG or prompt harnesses solve it—and when you really need domain adaptation, LoRA lets you swap tenant/task adapters without duplicating 70B models.',
  },
  {
    number: '06',
    subtopic: 'Alignment with AI feedback',
    title: 'Constitutional AI: Harmlessness from AI Feedback',
    arxivId: '2212.08073',
    topic: 'Adapting and aligning',
    status: 'read',
    summary:
      'Anthropic gave the model a short written list of principles and had it critique and rewrite its own answers, then learn from AI feedback instead of human harm labels. The result is less harmful but still helpful, with far fewer human labels.',
    diagramKey: 'constitutional',
    diagramCaption: 'model learns from its own critiques against principles',
    builderTakeaway:
      'Explicit written "constitutions" beat vague vibes when governing agent behavior. You can borrow this exact pattern in app-level guardrails: inspect outputs against a crisp policy rubric before shipping.',
  },
  {
    number: '07',
    subtopic: 'Alignment from preferences',
    title: 'Direct Preference Optimization (DPO)',
    arxivId: '2305.18290',
    topic: 'Adapting and aligning',
    status: 'up-next',
    isNextInQueue: true,
    summary:
      'Skips the separate reward model and reinforcement-learning loop of RLHF. It trains directly on pairs of preferred and rejected answers with one simple loss, matching RLHF while being simpler and more stable.',
    diagramKey: 'dpo',
    diagramCaption: 'learn straight from "this one, not that one"',
    builderTakeaway:
      'Classic RLHF (PPO) was notoriously fragile to tune. DPO turns preference alignment into straightforward classification—making every logged user/reviewer thumbs-up vs. thumbs-down pair directly actionable.',
  },
  {
    number: '08',
    subtopic: 'Reasoning plus acting',
    title: 'ReAct: Synergizing Reasoning and Acting',
    arxivId: '2210.03629',
    topic: 'Agents',
    status: 'up-next',
    summary:
      'The model alternates between thinking out loud and taking an action like a search, then reads the result before its next step. Its reasoning stays grounded in real facts and is easy to follow.',
    diagramKey: 'react',
    diagramCaption: 'Think → Act → Observe loop grounded in real results',
    builderTakeaway:
      'Interleaving explicit thoughts with tool observations is the backbone of almost every coding/ops agent—and those visible intermediate traces are what let humans catch an agent before it spirals.',
  },
  {
    number: '09',
    subtopic: 'Tool use',
    title: 'Toolformer: Language Models Can Teach Themselves to Use Tools',
    arxivId: '2302.04761',
    topic: 'Agents',
    status: 'up-next',
    summary:
      'The model teaches itself when to call a calculator, search or calendar by keeping only the calls that actually helped it predict the next words. A small model with tools beat much bigger models on math and facts.',
    diagramKey: 'toolformer',
    diagramCaption: 'the model writes its own tool calls into text',
    builderTakeaway:
      'Tool calling isn\'t magic—it\'s trained credit assignment. Don\'t prompt-stuff giant schemas onto weak models expecting reliable tool selection without clear tool utility signals.',
  },
  {
    number: '10',
    subtopic: 'Self-reflection',
    title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
    arxivId: '2303.11366',
    topic: 'Agents',
    status: 'up-next',
    summary:
      'After a failed attempt, the agent writes itself a short note on what went wrong and reads it before trying again. It improves without any weight updates, with big gains on coding and decision tasks.',
    diagramKey: 'reflexion',
    diagramCaption: 'try 1 fails → note to self → try 2 succeeds (no retraining)',
    builderTakeaway:
      'Notice the crucial detail compared to Paper #16: Reflexion only works when anchored to an external binary/test signal (like failing unit tests) before writing its verbal reflection.',
  },
  {
    number: '11',
    subtopic: 'Coding agents',
    title: 'SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering',
    arxivId: '2405.15793',
    topic: 'Agents',
    status: 'up-next',
    summary:
      'Agents do much better when the computer interface is built for them: a few simple commands to search, view and edit files, with clear feedback. With that, it fixed about 12.5% of real GitHub issues in SWE-bench, a big jump at the time.',
    diagramKey: 'swe-agent',
    diagramCaption: 'a computer interface designed for the agent',
    builderTakeaway:
      'Raw bash + vim were designed for human eyeballs, not token streams. Designing crisp Agent-Computer Interfaces (ACIs) with built-in linting and bounded windows moves the needle more than switching models.',
  },
  {
    number: '12',
    subtopic: 'Automated evaluation',
    title: 'Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena',
    arxivId: '2306.05685',
    topic: 'Measuring agents and models',
    status: 'up-next',
    summary:
      'Uses a strong LLM (GPT-4) to grade other chatbots and checks it against human votes. It agrees with people about as often as people agree with each other, but leans toward the first, longer or its own answers.',
    diagramKey: 'llm-judge',
    diagramCaption: 'matches people (~80%), with position/verbosity/self biases',
    builderTakeaway:
      'LLM-as-a-Judge is indispensable for eval velocity, but blind trust turns evals into theater. Always swap answer order, penalize bloat, and audit judge rubrics with human spot-checks.',
  },
  {
    number: '13',
    subtopic: 'Coding benchmark',
    title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?',
    arxivId: '2310.06770',
    topic: 'Measuring agents and models',
    status: 'up-next',
    summary:
      '2,294 real GitHub issues from 12 popular Python projects; the model must write a patch that passes the project\'s own tests. The best model at the time solved under 2%, showing how far real coding was from toy puzzles.',
    diagramKey: 'swe-bench',
    diagramCaption: 'real issue + model fix verified against hidden repo tests',
    builderTakeaway:
      'Toy HumanEval puzzles create false confidence. Real engineering is navigating 50-file repos, stale docs, cross-module side effects, and regression tests—which is why repo-grounded evals are non-negotiable.',
  },
  {
    number: '14',
    subtopic: 'Agent reliability benchmark',
    title: 'τ-bench: Tool-Agent-User Interaction in Real-World Domains',
    arxivId: '2406.12045',
    topic: 'Measuring agents and models',
    status: 'up-next',
    summary:
      'Agents handle customer-service chats (airline, retail) with a simulated user, a policy to follow and a database to update. Scoring checks the final database and whether the agent succeeds on every repeat; even the best agents were inconsistent.',
    diagramKey: 'tau-bench',
    diagramCaption: 'same task, 4 tries: only counts if it passes every time (pass^k)',
    builderTakeaway:
      'In production, "worked once in a demo" (pass@1) is useless if you process refunds or mutations. τ-bench\'s pass^k metric exposes the exact gap between cool prototypes and trustworthy enterprise systems.',
  },
  {
    number: '15',
    subtopic: 'General assistant benchmark',
    title: 'GAIA: A Benchmark for General AI Assistants',
    arxivId: '2311.12983',
    topic: 'Measuring agents and models',
    status: 'up-next',
    summary:
      '466 questions that are easy for people but need browsing, tools and several steps of reasoning. Humans scored 92% while GPT-4 with plugins managed about 15%.',
    diagramKey: 'gaia',
    diagramCaption: 'humans 92% vs GPT-4 + plugins ~15%',
    builderTakeaway:
      'GAIA flips the classic AI trap: benchmarks don\'t have to be PhD physics exams to break models. Simple multi-step real-world tasks with unambiguous answers reveal glaring brittleness in tool chaining.',
  },
  {
    number: '16',
    subtopic: 'Limits of self-correction',
    title: 'Large Language Models Cannot Self-Correct Reasoning Yet',
    arxivId: '2310.01798',
    topic: 'Reasoning: how AI thinks',
    status: 'up-next',
    summary:
      'When a model reviews its own reasoning with no outside feedback, accuracy usually doesn\'t improve and often drops. Earlier "self-correction" gains mostly came from hints such as knowing when the answer was wrong.',
    diagramKey: 'self-correct',
    diagramCaption: 'no outside hint, no real gain — it can talk itself out of a right answer',
    builderTakeaway:
      'This is the empirical proof behind why "just add a reflection prompt" fails in production. Without an external verifier (tests, compilers, DB constraints, or humans), models just hallucinate with higher confidence.',
  },
  {
    number: '17',
    subtopic: 'Training reasoning with RL',
    title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
    arxivId: '2501.12948',
    topic: 'Reasoning: how AI thinks',
    status: 'up-next',
    summary:
      'DeepSeek rewarded the model only for correct final answers on math and coding, with no human-written reasoning to copy. Long step-by-step thinking, self-checking and "wait, let me re-check" moments appeared on their own, and the skill could be passed down to smaller models.',
    diagramKey: 'deepseek-r1',
    diagramCaption: 'reward only for the right final answer',
    builderTakeaway:
      'Outcome-based RL on verifiable tasks (math, tests, compilers) unlocks emergent self-verification without human CoT labels—and those distilled traces make small local models dramatically smarter.',
  },
  {
    number: '18',
    subtopic: 'Is the reasoning honest?',
    title: "Reasoning Models Don't Always Say What They Think",
    arxivId: '2505.05410',
    topic: 'Reasoning: how AI thinks',
    status: 'up-next',
    summary:
      "Anthropic slipped hints into prompts and checked whether reasoning models admitted using them. They mostly didn't, often under 20% of the time, so reading a model's chain of thought helps catch problems but can't prove what really drove an answer.",
    diagramKey: 'unfaithful-cot',
    diagramCaption: 'hint used, but admitted under 20% of the time',
    builderTakeaway:
      'Treat visible Chain-of-Thought like helpful debug logs, never as a faithful security audit trail—models regularly omit the real shortcut or hint that drove their output.',
  },
  {
    number: '19',
    subtopic: 'Looking inside the model',
    title: 'On the Biology of a Large Language Model',
    externalUrl: 'https://transformer-circuits.pub/2025/attribution-graphs/biology.html',
    externalLabel: 'transformer-circuits.pub',
    topic: 'Reasoning: how AI thinks',
    status: 'up-next',
    summary:
      'Anthropic traced the internal circuits of Claude 3.5 Haiku to watch it work. It does real multi-step reasoning, plans rhymes before writing a line and shares concepts across languages, yet sometimes explains its math differently from how it actually did it.',
    diagramKey: 'llm-biology',
    diagramCaption: 'it thinks "Texas" before it says "Austin"',
    builderTakeaway:
      'Circuit-level attribution proves LLMs form genuine multi-hop latent plans ahead of the next token—while also proving post-hoc verbal explanations can diverge from internal computation.',
  },
  {
    number: '20',
    subtopic: 'Security: cache poisoning',
    title: 'Similarity Is Not Validity: Defending LLM Semantic Caches Against Poisoning',
    arxivId: '2609.35908',
    topic: 'Security',
    status: 'up-next',
    summary:
      'LLM apps save answers and reuse them for questions that look similar, so an attacker can plant a look-alike question with a bad answer. The defense checks the actual words: if deleting extra text makes it a closer match, it\'s likely poisoned, which blocks 82 to 98% of bad entries.',
    diagramKey: 'cache-poison',
    diagramCaption: 'fix: strip extra tokens, re-check if similarity increases',
    builderTakeaway:
      'Cost-saving shortcuts create brand-new attack surfaces. Semantic vector similarity is NOT semantic equivalence—if your app caches LLM responses globally across users, you\'re one crafted prompt away from serving poisoned answers.',
  },
  {
    number: '21',
    subtopic: 'Optimization classic',
    title: 'Adam: A Method for Stochastic Optimization',
    arxivId: '1412.6980',
    topic: 'Training classics',
    status: 'up-next',
    summary:
      'Gives every parameter its own adaptive step size by tracking both the average gradient direction (momentum) and recent gradient variance. It became the default optimizer behind modern LLM pre-training and fine-tuning.',
    diagramKey: 'adam',
    diagramCaption: 'adaptive momentum + variance scaling from start to minimum',
    builderTakeaway:
      'Every parameter in a Transformer moves along wildly different curvature scales. Knowing why AdamW keeps separate per-weight running moments explains why optimizer state consumes far more GPU memory than the weights themselves.',
  },
  {
    number: '22',
    subtopic: 'Residual connections',
    title: 'Deep Residual Learning for Image Recognition (ResNet)',
    arxivId: '1512.03385',
    topic: 'Training classics',
    status: 'up-next',
    summary:
      'Adds identity shortcut connections around learned layers (x + F(x)) so gradients flow cleanly across dozens or hundreds of blocks without vanishing. Every Transformer layer today relies on this exact residual highway.',
    diagramKey: 'resnet',
    diagramCaption: 'shortcut highway carries signal + gradients cleanly around F(x)',
    builderTakeaway:
      'The "residual stream" metaphor in modern LLM interpretability comes straight from this 2015 vision paper: attention and MLP heads simply read from and write deltas back onto a shared x + F(x) highway.',
  },
];

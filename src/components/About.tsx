import './About.css';

const About = () => {
  return (
    <div className="about-container animate-fade-in">
      <div className="about-header">
        <h2 className="text-gradient">About Me</h2>
      </div>

      <div className="about-content glass-panel">
        <p className="about-greeting">Hi, I'm <strong>Aman</strong>.</p>

        <p className="about-bio">
          I'm an <span className="highlight">engineering leader</span>,{' '}
          <span className="highlight">problem solver</span>, and recent{' '}
          <span className="highlight">NYU Stern EMBA</span> graduate.
          My professional focus is on{' '}
          <span className="highlight-accent">AI strategy</span> and translating
          complex challenges into clear execution.
        </p>

        <p className="about-bio">
          Grounded in my <span className="highlight-warm">Sikh values</span>,
          my purpose is centered on <em>service</em> — which drives my passion
          for <span className="highlight">teaching</span> and{' '}
          <span className="highlight">consulting with early-stage founders</span>.
        </p>

        <p className="about-bio">
          Whether I'm untangling architecture, mentoring teams, experimenting
          with <span className="highlight-accent">local AI agents</span>, or
          raising my son — I'm committed to learning, building, and optimizing
          the world around me.
        </p>
      </div>

      <div className="about-tags">
        <span className="tag">🧠 AI Strategy</span>
        <span className="tag">👨‍💻 Engineering Leadership</span>
        <span className="tag">🎓 NYU Stern EMBA</span>
        <span className="tag">🚀 Startup Consulting</span>
        <span className="tag">📚 Teaching</span>
        <span className="tag">🤖 Local AI Agents</span>
        <span className="tag">🙏 Seva</span>
      </div>
    </div>
  );
};

export default About;

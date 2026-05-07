
import './About.css';

const About = () => {
  return (
    <div className="about-container animate-fade-in">
      <div className="about-header">
        <h2 className="text-gradient">About Me</h2>
      </div>
      
      <div className="about-content glass-panel">
        <p>
          I'm <strong>Aman Guliani</strong>, a <span className="highlight-text">Senior Engineering Lead at Google</span> with over a decade of experience building scalable systems and ML pipelines at Google, Amazon, and AWS. Outside of tech leadership, I am deeply passionate about empowering the next generation by teaching Python to kids and beginners.
        </p>
      </div>
    </div>
  );
};

export default About;

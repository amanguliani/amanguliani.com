
import './Resume.css';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

const Resume = () => {
  return (
    <div className="resume-container animate-fade-in">
      <div className="resume-header">
        <h2 className="text-gradient">Aman Guliani</h2>
        <p>Engineering Leader at Google • Ex-Amazon (Kindle, Audible, AWS)</p>
        <p className="resume-summary">
          Engineering leader with 18+ years of experience building and scaling teams across Google,
          Amazon, AWS, and Audible. Focused on AI strategy, ML-driven automation, and operational
          excellence at fleet scale.
        </p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/amanguliani" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/amanguliani" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://amanguliani.com" target="_blank" rel="noopener noreferrer">amanguliani.com</a>
        </div>
      </div>

      <h3 className="resume-section-title">Experience</h3>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-icon"><Briefcase size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Engineering Leader</h3>
            <span className="timeline-date">Jan 2023 - Present • Google, Massachusetts</span>
            <p>Leading a team to build next-generation tooling for operational excellence and automation across the IT operations fleet using ML and AI.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Briefcase size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Team Lead Manager</h3>
            <span className="timeline-date">Oct 2021 - May 2023 • Google, Massachusetts</span>
            <p>Worked on the Virtual Connection space, enabling Googlers to connect and collaborate from the office and home.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Briefcase size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Senior Software Engineer</h3>
            <span className="timeline-date">Sep 2019 - Oct 2021 • Google, New York, NY</span>
            <p>Worked on the system to control the Google Video Conference Fleet, including tools to automatically detect and fix problems.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Engineering Manager</h3>
            <span className="timeline-date">Dec 2018 - Aug 2019 • Amazon, Boston, MA</span>
            <p>Built a proof of concept for a price aggregator and a shipment capacity planner on AWS. Worked on shipment APIs for tracking Amazon packages shipped from outside the USA.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Senior Software Engineer</h3>
            <span className="timeline-date">Sep 2016 - Dec 2018 • Amazon Web Services (AWS), Boston, MA</span>
            <p>Led guardrails for setting up new organizations as part of AWS Control Tower. Built and launched Continuous Export for migration data collected by AWS agents, and launched AWS Migration Hub. Helped launch AWS Control Tower in six months.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer Engineer</h3>
            <span className="timeline-date">Jul 2015 - Sep 2016 • Audible, Boston, MA</span>
            <p>Worked on a shared library platform that enabled multiple applications to build audio experiences faster, including a shared audio player, an auth module for SSO with Amazon, and metrics.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer Engineer</h3>
            <span className="timeline-date">Jan 2013 - Jul 2015 • Audible, Newark, NJ</span>
            <p>Built features for Audible's Android app, including rewriting the player logic for playlists, chapters, and syncing Audible books with Kindle. Part of the team that launched Audible and other apps on Fire Phone.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer Engineer</h3>
            <span className="timeline-date">Jul 2011 - Dec 2012 • Amazon, Seattle, WA</span>
            <p>Built, launched, and managed the Kindle Community website (kindle.amazon.com), a predecessor to Goodreads. Also built in-book chat with community moderation.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer Engineer, Touch Optimized Store</h3>
            <span className="timeline-date">Jun 2012 - Nov 2012 • Amazon, Seattle, WA</span>
            <p>Optimized the Touch Optimized store for performance on Kindle devices and ported the framework from jQuery to Zepto for the mobile webview.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer Engineer Intern</h3>
            <span className="timeline-date">Jul 2010 - Dec 2010 • Amazon</span>
            <p>Worked on the first Kindle device, building features to improve readability and sharing from e-books.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Briefcase size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Teaching Assistant, Physics & Astronomy</h3>
            <span className="timeline-date">Sep 2008 - May 2011 • Rutgers University, New Brunswick, NJ</span>
            <p>Taught physics to undergraduate students.</p>
          </div>
        </div>
      </div>

      <h3 className="resume-section-title">Education</h3>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-icon"><GraduationCap size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Executive MBA</h3>
            <span className="timeline-date">2023 - 2025 • NYU Stern School of Business, New York, NY</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><GraduationCap size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>MS, Electrical & Computer Engineering</h3>
            <span className="timeline-date">2008 - 2011 • Rutgers University, New Brunswick, NJ</span>
            <p>Major in Computer Engineering, minor in Wireless Communication. Vice President, Rutgers Indian Graduate Student Association.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><GraduationCap size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>BE, Electronics & Communication</h3>
            <span className="timeline-date">2004 - 2008 • Manipal Institute of Technology, Manipal, India</span>
          </div>
        </div>
      </div>

      <h3 className="resume-section-title">Skills</h3>
      <div className="glass-panel resume-skills">
        <p>AI Strategy • Retrieval-Augmented Generation (RAG) • Large Language Models (LLM) • IT Strategy • Product Vision • Leadership • Team Management • Problem Solving • Agile Methodologies • Google Cloud Platform (GCP) • AWS (CloudFormation, Lambda, S3, DynamoDB, Step Functions) • Distributed Systems • API Development • Android • Web Development • Amazon Kindle</p>
      </div>
    </div>
  );
};

export default Resume;

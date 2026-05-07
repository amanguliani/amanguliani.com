
import './Resume.css';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

const Resume = () => {
  return (
    <div className="resume-container animate-fade-in">
      <div className="resume-header">
        <h2 className="text-gradient">Aman Guliani</h2>
        <p>Senior Engineering Lead at Google</p>
      </div>
      
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-icon"><Briefcase size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Senior Engineering Lead</h3>
            <span className="timeline-date">Sept 2019 - Present • Google, New York, NY</span>
            <p>Building Automated ML Pipeline to reduce operation effort for managing large fleets. Managing 3 different teams, concentrating on collecting data and building ML pipeline to automate fleet management journeys scale at Google’s fleet level.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer Lead</h3>
            <span className="timeline-date">Dec 2018 - Aug 2019 • Amazon Global Logistic, Boston, MA</span>
            <p>Built a proof of concept for a price aggregator and a shipment capacity planner built on top of AWS. Worked on the shipment APIs for tracking amazon packages shipped from outside to USA.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer</h3>
            <span className="timeline-date">Sep 2015 - Aug 2018 • AWS Migration Hub, Boston, MA</span>
            <p>Led the work for applying guardrails when setting up new organizations as part of AWS Control Tower. Built and Launched Continuous Export feature and AWS Migration hub.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon"><Code size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Software Developer</h3>
            <span className="timeline-date">Jan 2013 - Sept 2015 • Audible, Newark, NJ</span>
            <p>Built the platform team from ground up to create a common lib of components for different android apps. Lead developer on Channels feature on Android.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-icon"><GraduationCap size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>Executive MBA</h3>
            <span className="timeline-date">2023 - 2025 • New York University, NY</span>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-icon"><GraduationCap size={18} /></div>
          <div className="timeline-content glass-panel">
            <h3>MS, Electrical & Computer Engineering</h3>
            <span className="timeline-date">2008 - 2011 • Rutgers University, NJ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

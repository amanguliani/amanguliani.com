import './Resume.css';
import { Briefcase, GraduationCap, Code, Rocket, Award, Users } from 'lucide-react';

interface ExperienceItem {
  role: string;
  org: string;
  date: string;
  icon: 'rocket' | 'briefcase' | 'code';
  bullets: string[];
}

interface SkillCategory {
  category: string;
  items: string;
}

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: 'Co-Founder & Technical Lead',
    org: 'Stealth-stage AI startup',
    date: '2026 — Present',
    icon: 'rocket',
    bullets: [
      'Took an LLM-powered consumer product from idea to a working product, building it end to end.',
      'Ran a private beta with early users and shipped changes based on their feedback.',
    ],
  },
  {
    role: 'Engineering Manager · DRI, Enterprise AI Foundations & Support Platforms',
    org: 'Enterprise Infrastructure & Support Technology, Google • SF Bay Area',
    date: 'September 2019 — Present · Sr. Software Engineer → Team Lead Manager (2021) → Engineering Manager (2023)',
    icon: 'briefcase',
    bullets: [
      "Lead an org of three teams (three managers, including my own team) across the US, Hyderabad and Sydney, and own the strategy, roadmap and delivery for Google's agentic support, context intelligence and fleet platforms.",
      'Grow leaders: promoted 6+ engineers to senior and staff roles in about three years as a manager, and manage underperformance directly.',
      "Own the AI engineering roadmap through 2027 and the operating model across all three teams (RACI, 2-week sprints, 70/20/10 capacity split). Brought domain agents under one multi-agent framework with least-privilege security. Co-presented at Google's AI Engineering Summit.",
      'Building an agentic support system that turns personalized support insights into on-device actions through MCP, targeting a 40% cut in support volume by end of 2026.',
      'Retired the legacy support platform across 4,150+ users and 227 feature flags (88.2%+ parity). Moved real-time AI anomaly detection to 100% of production traffic.',
      'Leading the move from an in-house ticketing system to ServiceNow, with real-time replication into Cloud Spanner over Kafka Connect and Pub/Sub for live analytics.',
      'Run systems for 35,000+ Google Meet Hardware and Google Beam rooms and retired all of the legacy fleet consoles. Earlier, as tech lead, built an ML health and auto-repair pipeline that raised fleet reliability from 68% to 89% in a year.',
    ],
  },
  {
    role: 'Sr Software Developer Manager',
    org: 'Global Transportation & Compliance Team, Amazon • Boston, MA',
    date: 'December 2018 — August 2019',
    icon: 'briefcase',
    bullets: [
      'Worked on the shipment APIs for tracking Amazon packages shipped from Europe to USA and improved its operational load by 20%.',
      'Built a proof of concept for a price aggregator and a shipment capacity planner hosted on the AWS cloud which got approved to replace the existing API system.',
      'Took over a team managing document generation for global shipping in India and successfully transitioned them to Boston.',
    ],
  },
  {
    role: 'Software Developer',
    org: 'Migration Services, Amazon Web Services (AWS) • Boston, MA',
    date: 'July 2015 — December 2018',
    icon: 'code',
    bullets: [
      'Led a team of 2 in building 5+ guardrail settings required for new organization setups as part of AWS Control Tower. Completed the work in 3 months to launch AWS Control Tower at re:Invent.',
      'Founding team member of AWS Migration Hub, a service and console to track migrations from data centers to AWS cloud. Built completely on AWS and enabled 50+ companies to migrate onto AWS.',
      'Designed, built & launched a continuous data export feature to let customers export migration-related data collected by AWS agents in a non-intrusive manner, providing querying and data export functionality for future planning that increased customer retention and new sign-ups.',
    ],
  },
  {
    role: 'Software Developer',
    org: 'Audible Application Team, Audible (part of Amazon) • Newark, NJ',
    date: 'January 2013 — September 2015',
    icon: 'code',
    bullets: [
      'Lead Android developer for the Audible integration on Fire Phone.',
      'Led the refactoring for the Audible player on Android to support newer audio formats and streaming audio to support the launch of short content in Audible.',
      'Created a platform team from the ground up to build common libraries used across Amazon-wide audio applications on Android.',
      'Worked with the Amazon Auth team to design and build an SSO experience for non-Amazon-signed Android applications like Audible, later adopted by 3 different applications.',
    ],
  },
  {
    role: 'Software Developer',
    org: 'Kindle Team, Amazon • Seattle, WA',
    date: 'July 2011 — January 2013',
    icon: 'code',
    bullets: [
      'Worked on launching a Kindle Community Website and launched a chat feature for eBooks with web and on-device integration. Enabled social sharing from Kindle e-books to Facebook and Twitter and successfully navigated a Sev-1 outage caused by Facebook integration across all Kindle devices.',
      'Worked on a proof-of-concept version of the X-Ray feature for Kindle books.',
    ],
  },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages & Runtimes',
    items: 'Python, Kotlin, Java, C++, Dart, SQL, Common Expression Language (CEL), Protocol Buffers (Protobuf)',
  },
  {
    category: 'AI/ML & Context Architectures',
    items:
      'Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), Multi-Agent Orchestration, Context Compaction, Automated LLM Evaluation Frameworks, LLMs, LAMs, Reinforcement Learning, Predictive Modeling, TensorFlow',
  },
  {
    category: 'Distributed Systems & Databases',
    items:
      'Google Cloud Spanner, Cloud Pub/Sub, Apache Kafka / Kafka Connect, Distributed Data Lakes, Distributed In-Memory Caching, DynamoDB, Apache Cassandra, MySQL',
  },
  {
    category: 'Cloud & Deployment Infrastructure',
    items:
      'Google Cloud Platform (GCP), Terraform, Container Orchestration, Zero-Trust IAM & mTLS Security, AWS (Athena, CloudFormation, ECS, CodeDeploy, AWS Lambda)',
  },
  {
    category: 'Web Frameworks & Design',
    items: 'React, AngularJS, NodeJS, Django, Responsive & Optimistic Design',
  },
  {
    category: 'Product & Engineering Management',
    items:
      'Agile, SCRUM, Design Sprints, Product Roadmapping, RACI & 70/20/10 Capacity Allocation, Follow-the-Sun SRE/SLO Governance, Technical Documentation',
  },
];

const EXTRA_CURRICULAR_ITEMS = [
  'Teaching: Taught coding to kids and Python to biologists.',
  'Mentorship: Run an active mentorship program for junior professionals with over 15 graduates.',
  'Ex Bar Raiser for Amazon with over 600+ interviews taken.',
];

const renderRoleIcon = (icon: ExperienceItem['icon']) => {
  switch (icon) {
    case 'rocket':
      return <Rocket size={18} aria-hidden="true" />;
    case 'code':
      return <Code size={18} aria-hidden="true" />;
    default:
      return <Briefcase size={18} aria-hidden="true" />;
  }
};

const Resume = () => {
  return (
    <div className="resume-container animate-fade-in">
      <div className="resume-header">
        <h2 className="text-gradient">Aman Guliani</h2>
        <p className="resume-role-subtitle">Engineering Leader @ Google</p>
        <p className="resume-summary">
          Engineering leader at Google and DRI for Enterprise AI Foundations, an org of three
          teams across the US, Hyderabad and Sydney. Leads agentic AI systems, real-time data
          pipelines and large platform migrations, up to a fleet of 35,000+ enterprise devices,
          and has promoted 6+ engineers to senior and staff roles. Earlier, a founding team
          member of AWS Migration Hub and a manager on Amazon&apos;s global shipment APIs.
        </p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/amanguliani" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/amanguliani" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:amanguliani@gmail.com">Email</a>
          <a href="https://amanguliani.com" target="_blank" rel="noopener noreferrer">
            amanguliani.com
          </a>
        </div>
      </div>

      <h3 className="resume-section-title">Employment History</h3>
      <div className="timeline">
        {EXPERIENCE_ITEMS.map((item) => (
          <div key={`${item.org}-${item.date}`} className="timeline-item">
            <div className="timeline-icon">{renderRoleIcon(item.icon)}</div>
            <div className="timeline-content glass-panel">
              <h3>{item.role}</h3>
              <p className="timeline-org">{item.org}</p>
              <span className="timeline-date">{item.date}</span>
              <ul className="timeline-bullets">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h3 className="resume-section-title">Skills</h3>
      <div className="resume-skills-grid">
        {SKILL_CATEGORIES.map((skill) => (
          <div key={skill.category} className="glass-panel skill-category-card">
            <h4>{skill.category}</h4>
            <p>{skill.items}</p>
          </div>
        ))}
      </div>

      <h3 className="resume-section-title">Education</h3>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-icon">
            <GraduationCap size={18} aria-hidden="true" />
          </div>
          <div className="timeline-content glass-panel">
            <h3>Executive MBA</h3>
            <p className="timeline-org">Stern School of Business, NYU</p>
            <span className="timeline-date">August 2023 — August 2025</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <GraduationCap size={18} aria-hidden="true" />
          </div>
          <div className="timeline-content glass-panel">
            <h3>Masters in Science, Electrical and Computer Engineering</h3>
            <p className="timeline-org">
              Rutgers, The State University of New Jersey, New Brunswick
            </p>
            <span className="timeline-date">January 2008 — December 2011</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <GraduationCap size={18} aria-hidden="true" />
          </div>
          <div className="timeline-content glass-panel">
            <h3>Bachelors, Electronics and Communication</h3>
            <p className="timeline-org">Manipal Institute of Technology, Manipal, India</p>
            <span className="timeline-date">January 2004 — December 2008</span>
          </div>
        </div>
      </div>

      <h3 className="resume-section-title">Certifications</h3>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-icon">
            <Award size={18} aria-hidden="true" />
          </div>
          <div className="timeline-content glass-panel">
            <h3>Machine Learning @ Coursera</h3>
            <span className="timeline-date">January 2021</span>
          </div>
        </div>
      </div>

      <h3 className="resume-section-title">Extra-Curricular &amp; Leadership</h3>
      <div className="glass-panel resume-extras-card">
        <div className="resume-extras-header">
          <Users size={18} aria-hidden="true" />
          <span>Community, Mentorship &amp; Hiring</span>
        </div>
        <ul className="timeline-bullets">
          {EXTRA_CURRICULAR_ITEMS.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resume;

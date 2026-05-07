import { useState } from 'react';
import type { FormEvent } from 'react';
import { createPortal } from 'react-dom';
import './Connect.css';
import { Mail, Send, X } from 'lucide-react';

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Connect = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:amanguliani@gmail.com?subject=Message from ${encodeURIComponent(name)} via A2UI&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="connect-container animate-fade-in">
      <h2 className="connect-title text-gradient">Let's Connect</h2>
      <p className="connect-subtitle">Feel free to reach out to me on any of the platforms below!</p>

      <div className="connect-grid">
        <a href="https://www.linkedin.com/in/amanguliani" target="_blank" rel="noopener noreferrer" className="connect-card glass-panel">
          <LinkedinIcon size={28} />
          <span>LinkedIn</span>
        </a>
        <a href="https://www.instagram.com/amanguliani/" target="_blank" rel="noopener noreferrer" className="connect-card glass-panel">
          <InstagramIcon size={28} />
          <span>Instagram</span>
        </a>
        <button onClick={() => setIsFormOpen(true)} className="connect-card glass-panel">
          <Mail size={28} />
          <span>Email Me</span>
        </button>
      </div>

      {isFormOpen && createPortal(
        <div className="contact-modal-overlay animate-fade-in" onClick={() => setIsFormOpen(false)}>
          <div className="contact-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="form-title">
                <Mail size={20} className="inline-icon" /> Send me an email
              </h3>
              <button className="close-btn" onClick={() => setIsFormOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                  rows={4}
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="submit-btn">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Connect;

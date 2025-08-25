import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Posts', path: '/posts', icon: '📝' },
    { name: 'Contact', path: '/contact', icon: '📞' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: '📘', color: '#1877f2' },
    { name: 'Twitter', url: '#', icon: '🐦', color: '#1da1f2' },
    { name: 'Instagram', url: '#', icon: '📷', color: '#e4405f' },
    { name: 'LinkedIn', url: '#', icon: '💼', color: '#0077b5' },
    { name: 'GitHub', url: '#', icon: '🐙', color: '#333' },
  ];

  const contactInfo = [
    { icon: '📧', text: 'contact@myapp.com' },
    { icon: '📞', text: '+1 (555) 123-4567' },
    { icon: '📍', text: '123 Business Street, Tech City' },
  ];

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#2c3e50" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section company-section">
            <div className="company-info">
              <div className="company-logo">
                <span className="logo-icon">🚀</span>
                <h3>MyApp</h3>
              </div>
              <p className="company-description">
                Building amazing experiences with modern web technologies. 
                We create innovative solutions that drive digital transformation.
              </p>
              <div className="contact-info">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-item">
                    <span className="contact-icon">{info.icon}</span>
                    <span className="contact-text">{info.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-section links-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section social-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  className="social-link"
                  style={{ '--social-color': social.color }}
                  title={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
            
            <div className="newsletter-signup">
              <h5>Stay Updated</h5>
              <p>Subscribe to our newsletter for the latest updates</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} MyApp. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="bottom-link">Privacy Policy</a>
              <a href="#" className="bottom-link">Terms of Service</a>
              <a href="#" className="bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

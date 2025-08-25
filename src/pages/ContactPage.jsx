import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      content: '123 Business Street, Tech City, TC 12345'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'contact@myapp.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      content: '+1 (555) 123-4567'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us. We'd love to hear from you!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h2>Get In Touch</h2>
          <p>Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.</p>
          
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-item">
                <div className="contact-info-icon">{info.icon}</div>
                <div className="contact-info-content">
                  <h3>{info.title}</h3>
                  <p>{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Enter your message here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

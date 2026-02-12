import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Contact = () => {
  const { state } = usePortfolio();
  const { portfolio, theme } = state;

  return (
    <section id="contact" className={`contact ${theme}`}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's work together!</h3>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={20} />
                <span>{portfolio.email}</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>{portfolio.phone}</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>{portfolio.location}</span>
              </div>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Hero = () => {
  const { state } = usePortfolio();
  const { portfolio, theme } = state;

  return (
    <section id="home" className={`hero ${theme}`}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">{portfolio.name}</span>
            </h1>
            <h2 className="hero-subtitle">{portfolio.title}</h2>
            <p className="hero-description">{portfolio.bio}</p>
            
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
              }}>
                View My Work
              </button>
              <button className="btn btn-secondary" onClick={() => {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}>
                Get In Touch
              </button>
            </div>

            <div className="hero-social">
              <a href="https://github.com" className="social-link" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${portfolio.email}`} className="social-link" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-placeholder">
              <div className="avatar">
                {portfolio.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

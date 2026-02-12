import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { state } = usePortfolio();
  const { portfolio, theme } = state;

  return (
    <footer className={`footer ${theme}`}>
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2024 {portfolio.name}. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://github.com" className="social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${portfolio.email}`} className="social-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

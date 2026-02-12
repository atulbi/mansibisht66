import React, { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const Header = () => {
  const { state, toggleTheme, toggleMenu, setCurrentSection } = usePortfolio();
  const { theme, isMenuOpen, currentSection, portfolio } = state;
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isPersonalPage = location.pathname === '/personal';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Only update current section on portfolio page
      if (!isPersonalPage) {
        const sections = ['home', 'about', 'experience', 'projects', 'personal', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setCurrentSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setCurrentSection, isPersonalPage]);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'personal', label: 'Personal' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    // If we're on personal page and trying to navigate to portfolio sections
    if (isPersonalPage && sectionId !== 'personal') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
      if (isMenuOpen) toggleMenu(); // Close mobile menu
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${theme}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h2>{portfolio.name}</h2>
            </Link>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.id === 'personal' && !isPersonalPage ? (
                    <Link
                      to="/personal"
                      className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentSection(item.id);
                        if (isMenuOpen) toggleMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

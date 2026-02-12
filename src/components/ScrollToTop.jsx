import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { state } = usePortfolio();
  const { theme } = state;

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''} ${theme}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTop;

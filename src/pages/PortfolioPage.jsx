import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import PersonalSection from '../components/PersonalSection';

const PortfolioPage = () => {
  const { state } = usePortfolio();
  const { theme, currentSection, portfolio } = state;

  // Update document title based on current section
  useEffect(() => {
    const sectionTitles = {
      home: `${portfolio.name} - Full Stack Developer & Designer`,
      about: `About - ${portfolio.name}`,
      experience: `Experience - ${portfolio.name}`,
      projects: `Projects - ${portfolio.name}`,
      personal: `Personal - ${portfolio.name}`,
      contact: `Contact - ${portfolio.name}`
    };
    
    document.title = sectionTitles[currentSection] || sectionTitles.home;
  }, [currentSection, portfolio.name]);

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <PersonalSection />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PortfolioPage;

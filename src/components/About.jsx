import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
  const { state } = usePortfolio();
  const { portfolio, theme } = state;

  return (
    <section id="about" className={`about ${theme}`}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate full-stack developer with over 5 years of experience in creating 
              digital experiences that make a difference. I love turning complex problems into 
              simple, beautiful, and intuitive solutions.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or enjoying the great outdoors with my camera.
            </p>
          </div>
          
          <div className="skills">
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              {portfolio.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

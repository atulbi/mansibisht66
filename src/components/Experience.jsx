import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Experience = () => {
  const { state } = usePortfolio();
  const { portfolio, theme } = state;

  return (
    <section id="experience" className={`experience ${theme}`}>
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          {portfolio.experience.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="job-title">{exp.position}</h3>
                <h4 className="company">{exp.company}</h4>
                <p className="period">{exp.period}</p>
                <p className="description">{exp.description}</p>
                <div className="technologies">
                  {exp.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React from 'react';
import { ArrowRight, Calendar, Clock, Heart, Camera, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const PersonalSection = () => {
  const { state } = usePortfolio();
  const { portfolio, theme } = state;
  const { personal } = portfolio;

  return (
    <section id="personal" className={`personal-section ${theme}`}>
      <div className="container">
        <div className="personal-header">
          <h2 className="section-title">
            <span className="personal-emoji">✨</span>
            Personal Space
          </h2>
          <p className="personal-intro">{personal.intro}</p>
        </div>

        {/* Recent Blogs Preview */}
        <div className="personal-content">
          <div className="blogs-preview">
            <h3 className="subsection-title">
              <span className="emoji">📝</span>
              Latest Thoughts
            </h3>
            <div className="blogs-grid-preview">
              {personal.recentBlogs.slice(0, 3).map((blog) => (
                <article key={blog.id} className="blog-card-preview">
                  <div className="blog-image-preview">
                    <img src={blog.image} alt={blog.title} />
                    <div className="blog-category-preview" style={{ backgroundColor: getCategoryColor(blog.category) }}>
                      {blog.category}
                    </div>
                  </div>
                  
                  <div className="blog-content-preview">
                    <h4 className="blog-title-preview">{blog.title}</h4>
                    <p className="blog-excerpt-preview">{blog.excerpt.slice(0, 80)}...</p>
                    
                    <div className="blog-meta-preview">
                      <span className="blog-date-preview">
                        <Calendar size={12} />
                        {new Date(blog.date).toLocaleDateString()}
                      </span>
                      <span className="blog-read-time-preview">
                        <Clock size={12} />
                        {blog.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Gallery Preview */}
          <div className="gallery-preview">
            <h3 className="subsection-title">
              <span className="emoji">🎨</span>
              Gallery Highlights
            </h3>
            <div className="gallery-grid-preview">
              {personal.gallery.slice(0, 4).map((item) => (
                <div key={item.id} className="gallery-item-preview">
                  <div className="gallery-media-preview">
                    {item.type === 'video' ? (
                      <div className="video-placeholder-preview">
                        <Play size={20} />
                      </div>
                    ) : (
                      <img src={item.src} alt={item.title} />
                    )}
                  </div>
                  <div className="gallery-overlay-preview">
                    <span className="gallery-title-preview">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Preview */}
          <div className="interests-preview">
            <h3 className="subsection-title">
              <span className="emoji">💕</span>
              Things I Love
            </h3>
            <div className="interests-grid-preview">
              {personal.interests.map((interest, index) => (
                <div 
                  key={index} 
                  className="interest-card-preview"
                  style={{ backgroundColor: interest.color + '20', borderColor: interest.color }}
                >
                  <span className="interest-icon-preview">{interest.icon}</span>
                  <span className="interest-name-preview">{interest.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="personal-cta">
          <div className="cta-content">
            <h3>Want to see more of my personal side?</h3>
            <p>Explore my colorful world full of adventures, thoughts, and creative moments!</p>
            <Link to="/personal" className="cta-button">
              <span>Visit My Personal Page</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    'Life': '#FFB6C1',
    'Design': '#98FB98',
    'Adventure': '#87CEEB',
    'Tech': '#DDA0DD',
    'Travel': '#F0E68C'
  };
  return colors[category] || '#FFB6C1';
};

export default PersonalSection;

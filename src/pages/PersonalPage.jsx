import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Heart, Camera, Mountain, BookOpen, Plane, Coffee, Play, ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

const PersonalPage = () => {
  const { state } = usePortfolio();
  const { portfolio } = state;
  const { personal } = portfolio;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['all', 'photography', 'workspace', 'lifestyle', 'adventure'];

  const filteredGallery = selectedCategory === 'all' 
    ? personal.gallery 
    : personal.gallery.filter(item => item.category === selectedCategory);

  const getIconComponent = (iconName) => {
    const icons = {
      '📸': Camera,
      '🥾': Mountain,
      '👩‍🍳': Coffee,
      '📚': BookOpen,
      '🧘‍♀️': Heart,
      '✈️': Plane
    };
    return icons[iconName] || Heart;
  };

  return (
    <div className="personal-page">
      {/* Hero Section */}
      <section className="personal-hero">
        <div className="container">
          <Link 
            to="/"
            className="back-button"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>
          
          <div className="personal-hero-content">
            <div className="personal-avatar">
              <div className="avatar-circle">
                <img src="/api/placeholder/200/200" alt={portfolio.name} />
              </div>
              <div className="avatar-decoration">✨</div>
            </div>
            
            <div className="personal-intro">
              <h1 className="personal-title">
                Hey there! I'm <span className="highlight">{portfolio.name.split(' ')[0]}</span> 💕
              </h1>
              <p className="personal-subtitle">{personal.intro}</p>
              
              <div className="fun-stats">
                <div className="stat-item">
                  <span className="stat-emoji">☕</span>
                  <span className="stat-text">Coffee Lover</span>
                </div>
                <div className="stat-item">
                  <span className="stat-emoji">🌸</span>
                  <span className="stat-text">Nature Explorer</span>
                </div>
                <div className="stat-item">
                  <span className="stat-emoji">💻</span>
                  <span className="stat-text">Code Artist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="interests-section">
        <div className="container">
          <h2 className="section-title">
            <span className="title-emoji">💖</span>
            Things I Love
          </h2>
          
          <div className="interests-grid">
            {personal.interests.map((interest, index) => {
              const IconComponent = getIconComponent(interest.icon);
              return (
                <div 
                  key={index} 
                  className="interest-card"
                  style={{ '--accent-color': interest.color }}
                >
                  <div className="interest-icon">
                    <IconComponent size={24} />
                  </div>
                  <span className="interest-name">{interest.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="blogs-section">
        <div className="container">
          <h2 className="section-title">
            <span className="title-emoji">📝</span>
            Latest Thoughts
          </h2>
          
          <div className="blogs-grid">
            {personal.recentBlogs.map((blog) => (
              <article key={blog.id} className="blog-card">
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <div className="blog-category" style={{ '--category-color': getCategoryColor(blog.category) }}>
                    {blog.category}
                  </div>
                </div>
                
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  
                  <div className="blog-meta">
                    <span className="blog-date">
                      <Calendar size={14} />
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                    <span className="blog-read-time">
                      <Clock size={14} />
                      {blog.readTime}
                    </span>
                  </div>
                  
                  <button className="read-more-btn">
                    Read More 💕
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">
            <span className="title-emoji">🎨</span>
            My Little Gallery
          </h2>
          
          <div className="gallery-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => setSelectedItem(item)}
              >
                <div className="gallery-media">
                  {item.type === 'video' ? (
                    <div className="video-placeholder">
                      <Play size={32} />
                      <span>Video</span>
                    </div>
                  ) : (
                    <img src={item.src} alt={item.title} />
                  )}
                </div>
                
                <div className="gallery-overlay">
                  <h4 className="gallery-title">{item.title}</h4>
                  <p className="gallery-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for gallery items */}
      {selectedItem && (
        <div className="gallery-modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>
            
            <div className="modal-media">
              {selectedItem.type === 'video' ? (
                <div className="video-placeholder large">
                  <Play size={64} />
                  <span>Video: {selectedItem.title}</span>
                </div>
              ) : (
                <img src={selectedItem.src} alt={selectedItem.title} />
              )}
            </div>
            
            <div className="modal-info">
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
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

export default PersonalPage;

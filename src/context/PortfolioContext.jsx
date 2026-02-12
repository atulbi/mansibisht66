import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  theme: 'light',
  currentSection: 'home',
  isMenuOpen: false,
  portfolio: {
    name: 'Mansi Bisht',
    title: 'Full Stack Developer & Designer',
    email: 'mansi.bisht@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate full-stack developer with 5+ years of experience creating beautiful, functional web applications. I love turning complex problems into simple, elegant solutions.',
    skills: [
      'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript',
      'CSS/SASS', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'
    ],
    experience: [
      {
        id: 1,
        company: 'TechCorp Solutions',
        position: 'Senior Frontend Developer',
        period: '2022 - Present',
        description: 'Led development of customer-facing applications serving 100k+ users. Implemented modern React patterns and improved performance by 40%.',
        technologies: ['React', 'TypeScript', 'GraphQL', 'AWS']
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        period: '2020 - 2022',
        description: 'Built the entire web platform from scratch. Developed both frontend and backend systems, implemented CI/CD pipelines.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Docker']
      },
      {
        id: 3,
        company: 'Digital Agency Pro',
        position: 'Frontend Developer',
        period: '2019 - 2020',
        description: 'Created responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect designs.',
        technologies: ['JavaScript', 'CSS3', 'WordPress', 'PHP']
      }
    ],
    projects: [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'A complete e-commerce solution with payment integration, inventory management, and admin dashboard.',
        image: '/api/placeholder/400/300',
        technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
        github: 'https://github.com/sarah/ecommerce-platform',
        live: 'https://ecommerce-demo.example.com'
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates and team collaboration features.',
        image: '/api/placeholder/400/300',
        technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
        github: 'https://github.com/sarah/task-manager',
        live: 'https://taskapp-demo.example.com'
      },
      {
        id: 3,
        title: 'Weather Dashboard',
        description: 'Beautiful weather application with location-based forecasts and interactive charts.',
        image: '/api/placeholder/400/300',
        technologies: ['React', 'D3.js', 'Weather API', 'CSS3'],
        github: 'https://github.com/sarah/weather-dashboard',
        live: 'https://weather-demo.example.com'
      }
    ],
    personal: {
      intro: "Welcome to my personal space! Here's where I share my thoughts, adventures, and the colorful moments of my life beyond code.",
      recentBlogs: [
        {
          id: 1,
          title: "My Journey into Tech: From Dreams to Reality",
          excerpt: "How I transitioned from a completely different field into software development and what I learned along the way...",
          date: "2024-08-15",
          readTime: "5 min read",
          category: "Life",
          image: "/api/placeholder/300/200",
          slug: "journey-into-tech"
        },
        {
          id: 2,
          title: "Building Beautiful UIs: My Design Philosophy",
          excerpt: "My approach to creating user interfaces that are not just functional, but delightful to use...",
          date: "2024-08-10",
          readTime: "7 min read",
          category: "Design",
          image: "/api/placeholder/300/200",
          slug: "beautiful-ui-philosophy"
        },
        {
          id: 3,
          title: "Weekend Adventures: Hiking & Photography",
          excerpt: "Exploring the beautiful trails around San Francisco and capturing nature's beauty through my lens...",
          date: "2024-08-05",
          readTime: "3 min read",
          category: "Adventure",
          image: "/api/placeholder/300/200",
          slug: "weekend-adventures"
        }
      ],
      gallery: [
        {
          id: 1,
          type: 'image',
          src: '/api/placeholder/400/300',
          title: 'Sunset at Golden Gate',
          description: 'Captured this beautiful sunset during my evening walk',
          category: 'photography'
        },
        {
          id: 2,
          type: 'image',
          src: '/api/placeholder/400/300',
          title: 'Coding Setup',
          description: 'My cozy workspace where the magic happens',
          category: 'workspace'
        },
        {
          id: 3,
          type: 'video',
          src: '/api/placeholder/video/400/300',
          title: 'Day in My Life',
          description: 'A typical day as a developer',
          category: 'lifestyle'
        },
        {
          id: 4,
          type: 'image',
          src: '/api/placeholder/400/300',
          title: 'Mountain Hiking',
          description: 'Weekend adventure in the mountains',
          category: 'adventure'
        }
      ],
      interests: [
        { name: 'Photography', icon: '📸', color: '#FFB6C1' },
        { name: 'Hiking', icon: '🥾', color: '#98FB98' },
        { name: 'Cooking', icon: '👩‍🍳', color: '#F0E68C' },
        { name: 'Reading', icon: '📚', color: '#DDA0DD' },
        { name: 'Yoga', icon: '🧘‍♀️', color: '#87CEEB' },
        { name: 'Travel', icon: '✈️', color: '#FFB347' }
      ]
    }
  }
};

// Action types
export const actionTypes = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_CURRENT_SECTION: 'SET_CURRENT_SECTION',
  TOGGLE_MENU: 'TOGGLE_MENU',
  SET_MENU_OPEN: 'SET_MENU_OPEN',
  UPDATE_PORTFOLIO_DATA: 'UPDATE_PORTFOLIO_DATA'
};

// Reducer function
function portfolioReducer(state, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    
    case actionTypes.SET_CURRENT_SECTION:
      return {
        ...state,
        currentSection: action.payload
      };
    
    case actionTypes.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    
    case actionTypes.SET_MENU_OPEN:
      return {
        ...state,
        isMenuOpen: action.payload
      };
    
    case actionTypes.UPDATE_PORTFOLIO_DATA:
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          ...action.payload
        }
      };
    
    default:
      return state;
  }
}

// Create context
const PortfolioContext = createContext();

// Provider component
export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  const value = {
    state,
    dispatch,
    // Helper functions
    toggleTheme: () => dispatch({ type: actionTypes.TOGGLE_THEME }),
    setCurrentSection: (section) => dispatch({ type: actionTypes.SET_CURRENT_SECTION, payload: section }),
    toggleMenu: () => dispatch({ type: actionTypes.TOGGLE_MENU }),
    setMenuOpen: (isOpen) => dispatch({ type: actionTypes.SET_MENU_OPEN, payload: isOpen }),
    updatePortfolioData: (data) => dispatch({ type: actionTypes.UPDATE_PORTFOLIO_DATA, payload: data })
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Custom hook to use the context
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

export default PortfolioContext;

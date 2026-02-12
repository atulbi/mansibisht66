# Mansi Bisht - Portfolio Website

A modern, responsive portfolio website built with React 18+ and server-side rendering (SSR) support.

## 🚀 Features

- **Server-Side Rendering (SSR)** - Initial HTML rendered on the server for faster loading and better SEO
- **Modern React 18+** - Latest React features including hooks and concurrent features  
- **Global State Management** - useContext and useReducer for application state
- **Responsive Design** - Beautiful, mobile-first design that works on all devices
- **Dark/Light Theme** - Toggle between dark and light themes
- **Smooth Animations** - Subtle animations and transitions throughout
- **SEO Optimized** - Proper meta tags, Open Graph, and Twitter Card support
- **PWA Ready** - Web app manifest for installable experience
- **Modern Build System** - Vite for fast development and optimized production builds

## 🛠️ Tech Stack

- **Frontend:** React 18+, Modern JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables for theming
- **Icons:** Lucide React
- **Build Tool:** Vite
- **SSR:** Custom Node.js HTTP server
- **State Management:** React Context API with useReducer

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout with all sections
├── context/            # Global state management
│   └── PortfolioContext.jsx
├── styles/             # CSS files
│   └── main.css       # Main stylesheet
├── App.jsx            # Root component
├── main.jsx           # Client entry point
└── entry-client.jsx   # Client-side hydration

server/
└── index.js           # SSR server setup

.github/
└── copilot-instructions.md  # Copilot customization
```

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## 🚀 Development

### Client-Side Development (Vite Dev Server)
```bash
npm run dev
```
Starts the Vite development server at `http://localhost:5173`

### Server-Side Rendering Development
```bash
npm run dev:ssr
```
Starts the SSR development server at `http://localhost:3000`

## 🏗️ Building for Production

### Build All
```bash
npm run build
```
This runs both client and server builds.

### Build Client Only
```bash
npm run build:client
```
Builds the client-side application to `dist/client/`

### Build Server Only
```bash
npm run build:server
```
Builds the server-side bundle to `dist/server/`

## 🚀 Production Deployment

### Start Production Server
```bash
npm start
```
Starts the production SSR server at `http://localhost:3000`

### Full Build and Start
```bash
npm run serve
```
Builds and starts the production server

```bash
npm run build
```

This creates optimized builds for both client and server.

### Start Production Server

```bash
npm start
```

### Preview Build

```bash
npm run preview
```

## 📚 Documentation

- **[SSR Implementation Guide](docs/SSR-Implementation.md)** - Detailed technical documentation on how Server-Side Rendering works in this project
- **[Project Structure](#-project-structure)** - Overview of file organization
- **[Development Guide](#-development)** - How to run and develop the project

## 🎨 Customization

### Portfolio Data

Edit the portfolio data in `src/context/PortfolioContext.jsx`:

- Personal information (name, title, contact)
- Skills and technologies
- Work experience
- Projects showcase
- Bio and description

### Styling

The design uses CSS variables for easy theming. Main variables are defined in `src/styles/main.css`:

- Colors and themes
- Typography
- Spacing and layout
- Animations and transitions

### Adding Sections

To add new sections:

1. Create the component in `src/components/`
2. Add it to the Layout component
3. Update the navigation menu
4. Add corresponding state in the context if needed

## 🚀 Deployment

This project can be deployed to various platforms:

- **Vercel/Netlify** - For static builds (client-side rendering)
- **Railway/Render** - For full SSR support
- **Docker** - Container deployment

For SSR deployment, ensure the hosting platform supports Node.js.

## 📝 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server (client-side only) |
| `npm run dev:ssr` | Start SSR development server |
| `npm run build` | Build both client and server for production |
| `npm run build:client` | Build client-side bundle only |
| `npm run build:server` | Build server-side bundle only |
| `npm start` | Start production SSR server |
| `npm run serve` | Build and start production server |
| `npm run preview` | Preview production build with Vite |
| `npm run lint` | Run ESLint |

## 🔧 Environment Variables

The server automatically detects the environment:
- `NODE_ENV=development` - Development mode with hot reloading
- `NODE_ENV=production` - Production mode with optimized builds

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ by Mansi Bisht using React 18+ and modern web technologies.

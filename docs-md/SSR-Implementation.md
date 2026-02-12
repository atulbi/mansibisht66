# Server-Side Rendering (SSR) Implementation Guide

This document explains how Server-Side Rendering (SSR) is implemented in the Mansi Bisht Portfolio website using pure React and a custom Node.js server.

## 📖 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Implementation Details](#implementation-details)
5. [Build Process](#build-process)
6. [Server Implementation](#server-implementation)
7. [Client Hydration](#client-hydration)
8. [Development vs Production](#development-vs-production)
9. [Benefits](#benefits)
10. [Troubleshooting](#troubleshooting)

## Overview

This project implements SSR without using frameworks like Next.js. Instead, it uses:
- **React 18+** with `renderToString` for server-side rendering
- **Custom Node.js HTTP server** for serving pre-rendered HTML
- **Vite** for build tooling and development
- **Client-side hydration** for interactive functionality

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Browser       │    │   Node.js       │    │   React App     │
│   Request       │───▶│   Server        │───▶│   SSR Render    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                        │                        │
         │                        ▼                        │
         │              ┌─────────────────┐                │
         │              │   HTML with     │                │
         └──────────────│   React Content │◀───────────────┘
                        │   + Hydration   │
                        └─────────────────┘
```

## File Structure

```
project/
├── src/
│   ├── App.jsx              # Main React application
│   ├── main.jsx             # Client-side entry point
│   ├── entry-client.jsx     # Client hydration entry
│   ├── entry-server.jsx     # Server-side rendering entry
│   ├── components/
│   │   └── Layout.jsx       # Main layout component
│   └── context/
│       └── PortfolioContext.jsx  # Global state
├── server/
│   └── index.js             # SSR Node.js server
├── public/
│   └── ...                  # Static assets
├── dist/
│   ├── client/              # Client build output
│   └── server/              # Server build output
├── index.html               # HTML template
├── vite.config.js           # Client build config
└── vite.config.ssr.js       # Server build config
```

## Implementation Details

### 1. Entry Points

#### Server Entry (`src/entry-server.jsx`)
```javascript
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../src/App.jsx'

export function render() {
  const html = renderToString(React.createElement(App))
  return html
}
```

**Purpose**: Exports a `render` function that converts React components to HTML string.

#### Client Entry (`src/entry-client.jsx`)
```javascript
import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App.jsx'

const container = document.getElementById('root')

if (container.innerHTML.trim()) {
  // Hydrate server-rendered content
  hydrateRoot(container, <App />)
} else {
  // Create new root for client-only rendering
  createRoot(container).render(<App />)
}
```

**Purpose**: Handles client-side hydration of server-rendered content.

#### Main Client Entry (`src/main.jsx`)
```javascript
import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'

const container = document.getElementById('root')

// Check if the app was server-rendered
if (container.innerHTML.trim()) {
  // Hydrate the server-rendered content
  hydrateRoot(container, <App />)
} else {
  // Create a new root for client-only rendering
  createRoot(container).render(<App />)
}
```

**Purpose**: Main entry point that detects SSR content and chooses hydration vs fresh render.

### 2. HTML Template

The `index.html` file contains a special SSR outlet:

```html
<body>
  <div id="root"><!--ssr-outlet--></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

The `<!--ssr-outlet-->` comment is replaced with rendered React content during SSR.

## Build Process

### 1. Client Build
```bash
npm run build:client
```

**Configuration** (`vite.config.js`):
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
    rollupOptions: {
      input: './index.html'
    }
  }
})
```

**Output**: 
- `dist/client/index.html` - HTML template
- `dist/client/assets/` - JS/CSS bundles
- Static assets and icons

### 2. Server Build
```bash
npm run build:server
```

**Configuration** (`vite.config.ssr.js`):
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: 'dist/server',
    rollupOptions: {
      input: 'src/entry-server.jsx',
      output: {
        format: 'es'
      }
    }
  },
  ssr: {
    noExternal: ['react', 'react-dom', 'lucide-react']
  }
})
```

**Output**:
- `dist/server/entry-server.js` - Server-side rendering bundle

## Server Implementation

### Core Server Logic (`server/index.js`)

```javascript
import http from 'http';
import { renderToString } from 'react-dom/server';
import React from 'react';
import fs from 'fs';
import path from 'path';

const server = http.createServer(async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  try {
    // Handle static files (CSS, JS, images)
    if (pathname.includes('.')) {
      // Serve static assets
      return serveStaticFile(req, res);
    }

    // SSR for all other routes
    let template, App;
    
    if (isProduction) {
      // Production: Use built files
      template = fs.readFileSync('./dist/client/index.html', 'utf-8');
      const { render } = await import('./dist/server/entry-server.js');
      const appHtml = render();
      
      const html = template.replace('<!--ssr-outlet-->', appHtml);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      // Development: Import source files directly
      template = fs.readFileSync('./index.html', 'utf-8');
      const { default: AppComponent } = await import('./src/App.jsx');
      const appHtml = renderToString(React.createElement(AppComponent));

      const html = template.replace('<!--ssr-outlet-->', appHtml);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  } catch (error) {
    // Fallback to client-side rendering
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(template);
  }
});
```

### Key Features:

1. **Static File Serving**: Handles CSS, JS, images, and other assets
2. **Environment Detection**: Different behavior for development vs production
3. **Error Handling**: Fallback to client-side rendering if SSR fails
4. **Template Injection**: Replaces SSR outlet with rendered React content

## Client Hydration

### Hydration Process

1. **Server sends HTML** with pre-rendered React content
2. **Browser loads JavaScript** bundles
3. **React hydrates** the existing DOM instead of replacing it
4. **Interactive features** become available

### Hydration Detection

```javascript
const container = document.getElementById('root')

if (container.innerHTML.trim()) {
  // Content exists = server-rendered
  hydrateRoot(container, <App />)
} else {
  // No content = client-only
  createRoot(container).render(<App />)
}
```

This allows the same code to work in both SSR and client-only scenarios.

## Development vs Production

### Development Mode (`npm run dev:ssr`)

- **Source**: Imports JSX files directly using Node.js ESM
- **Template**: Uses `index.html` from project root
- **Hot Reload**: Server restarts on file changes
- **Error Handling**: Detailed error messages

### Production Mode (`npm start`)

- **Source**: Uses pre-built bundles from `dist/`
- **Template**: Uses built `dist/client/index.html`
- **Optimization**: Minified and optimized code
- **Performance**: Faster execution with compiled bundles

## Benefits

### 1. **SEO Optimization**
```html
<!-- Server-rendered content is immediately available -->
<div id="root">
  <div class="app light">
    <h1>Hi, I'm <span class="highlight">Mansi Bisht</span></h1>
    <p>Passionate full-stack developer...</p>
    <!-- Full content tree -->
  </div>
</div>
```

### 2. **Performance Benefits**
- **Faster First Contentful Paint (FCP)**: Content visible immediately
- **Better Core Web Vitals**: Improved loading metrics
- **Reduced Time to Interactive (TTI)**: Hydration vs full render

### 3. **Social Media Sharing**
```html
<meta property="og:title" content="Mansi Bisht - Full Stack Developer" />
<meta property="og:description" content="Passionate full-stack developer..." />
<!-- Meta tags rendered server-side -->
```

### 4. **Accessibility**
- Content available even if JavaScript fails
- Screen readers can access content immediately
- Progressive enhancement approach

## Troubleshooting

### Common Issues

#### 1. **Hydration Mismatch**
```
Warning: Text content did not match. Server: "X" Client: "Y"
```

**Solution**: Ensure server and client render identical content. Avoid:
- `Date.now()` or random values during render
- Browser-only APIs in components
- Environment-specific logic

#### 2. **Module Import Errors**
```
Error: Cannot find module './src/App.jsx'
```

**Solution**: Check file paths and ensure Node.js can resolve JSX files.

#### 3. **Static Assets Not Loading**
**Solution**: Verify static file serving logic handles all asset types:
```javascript
const mimeTypes = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};
```

### Development Tips

1. **Use SSR-safe patterns**:
   ```javascript
   // ❌ Browser-only
   const width = window.innerWidth;
   
   // ✅ SSR-safe
   const [width, setWidth] = useState(0);
   useEffect(() => {
     setWidth(window.innerWidth);
   }, []);
   ```

2. **Test both modes**:
   - Test `npm run dev:ssr` for SSR functionality
   - Test `npm run dev` for client-only fallback

3. **Check network tab**:
   - Verify HTML contains rendered content
   - Confirm hydration doesn't cause layout shifts

## Performance Monitoring

### Metrics to Track

1. **First Contentful Paint (FCP)**: Should be faster with SSR
2. **Largest Contentful Paint (LCP)**: Main content renders quickly
3. **Time to Interactive (TTI)**: When page becomes fully interactive
4. **Cumulative Layout Shift (CLS)**: Should be minimal with proper hydration

### Testing SSR

```bash
# Test server response includes rendered content
curl -s http://localhost:3000 | grep "Mansi Bisht"

# Check HTML size (should be larger with SSR)
curl -s http://localhost:3000 | wc -c
```

## Conclusion

This SSR implementation provides:
- ✅ **True server-side rendering** without frameworks
- ✅ **Production-ready** with proper build process
- ✅ **Development-friendly** with hot reloading
- ✅ **SEO optimized** with meta tags and content
- ✅ **Performance optimized** with faster initial loads
- ✅ **Accessible** with progressive enhancement

The custom implementation gives full control over the SSR process while maintaining simplicity and performance.

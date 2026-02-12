import http from 'http';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { parse } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// MIME types for static files
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  try {
    // Handle static files
    if (pathname.startsWith('/src/') || pathname.includes('.')) {
      let filePath;
      
      if (isProduction) {
        // In production, serve from dist/client
        if (pathname.startsWith('/assets/')) {
          filePath = path.join(__dirname, '../dist/client', pathname);
        } else if (pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.svg') || pathname.endsWith('.png')) {
          filePath = path.join(__dirname, '../dist/client', pathname);
        } else {
          filePath = path.join(__dirname, '..', pathname);
        }
      } else {
        // In development, serve from root
        filePath = path.join(__dirname, '..', pathname);
      }
      
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath);
        const mimeType = mimeTypes[ext] || 'text/plain';
        
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(content);
        return;
      }
    }

    // SSR for all other routes
    let template, App;
    
    if (isProduction) {
      template = fs.readFileSync(
        path.resolve(__dirname, '../dist/client/index.html'),
        'utf-8'
      );
      // Import the built server bundle
      const { render } = await import('../dist/server/entry-server.js');
      const appHtml = render();
      
      // Replace the SSR outlet with the rendered HTML
      const html = template.replace('<!--ssr-outlet-->', appHtml);
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      template = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8'
      );
      
      // Import and render the app in development
      const { default: AppComponent } = await import('../src/App.jsx');
      const appHtml = renderToString(React.createElement(AppComponent));

      // Replace the SSR outlet with the rendered HTML
      const html = template.replace('<!--ssr-outlet-->', appHtml);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }

  } catch (error) {
    console.error('SSR Error:', error);
    
    // Fallback to client-side rendering
    try {
      const template = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf-8'
      );
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(template);
    } catch (fallbackError) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
  console.log(`Environment: ${isProduction ? 'production' : 'development'}`);
  console.log(`SSR: Simple Node.js HTTP server with React SSR`);
});

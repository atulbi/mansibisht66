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

import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

// Hydrate the app on the client side
hydrateRoot(document.getElementById('root'), <App />)

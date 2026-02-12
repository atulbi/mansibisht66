import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import PortfolioPage from './pages/PortfolioPage'
import PersonalPage from './pages/PersonalPage'
import './styles/main.css'

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/personal" element={<PersonalPage />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  )
}

export default App

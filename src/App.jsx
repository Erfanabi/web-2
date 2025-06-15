import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.css'

// Theme context
export const ThemeContext = React.createContext()

// Pages
const Home = React.lazy(() => import('./pages/Home'))
const StudentProfile = React.lazy(() => import('./pages/StudentProfile'))
const StudentManagement = React.lazy(() => import('./pages/StudentManagement'))

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <React.Suspense fallback={
          <div className="loading">
            <div className="spinner"></div>
      </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student/:id" element={<StudentProfile />} />
            <Route path="/manage" element={<StudentManagement />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App

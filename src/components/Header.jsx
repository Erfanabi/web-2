import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../App'
import './Header.css'

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const location = useLocation()

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>درس وب ۲</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            صفحه اصلی
          </Link>
          <Link to="/manage" className={location.pathname === '/manage' ? 'active' : ''}>
            مدیریت دانشجویان
          </Link>
          <button onClick={toggleTheme} className="theme-toggle">
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          </button>
        </nav>
      </div>
    </header>
  )
} 
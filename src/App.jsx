import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Sun, Moon, Film } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? saved === 'true' : prefersDark;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <Film className="w-6 h-6 text-red-600" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                MovieHub
              </span>
            </Link>
            
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">
                Search
              </Link>
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-red-600">
                Dashboard
              </Link>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Books from './pages/Books';
import Settings from './pages/Settings';
import Activities from './pages/Activities';
import PriceComparison from './pages/PriceComparison';
import Mode from './pages/Mode';
import { FaCog } from 'react-icons/fa'; // Import a gear icon for the settings button

import './Themes.css'; // Import themes
import './App.css'; // Import the main CSS file

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      {isAuthenticated ? (
        <div className="app-container">
          <Sidebar />
          <div className="content">
            {/* Floating Settings Button */}
            <button
              className="settings-button"
              onClick={() => window.location.href = '/theme'}
            >
              <FaCog /> {/* Gear icon */}
            </button>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/books" element={<Books />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/pricecomparison" element={<PriceComparison />} />
              <Route path="/theme" element={<Mode />} />
              {/* Add other authenticated routes here */}
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
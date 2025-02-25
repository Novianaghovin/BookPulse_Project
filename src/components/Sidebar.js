// src/components/Sidebar.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from '../img/bookpulse.png';  // Adjust the path as necessary


function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    // Clear the simulated authentication (e.g., from localStorage)
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h2>
        <img src={logo} alt="BookPulse Logo" className="sidebar-logo" />
  
      </h2>
        <ul>
          <li>
            <NavLink to="/dashboard" activeclassname="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/books" activeclassname="active">
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" activeclassname="active">
              User Feedback
            </NavLink>
          </li>
          <li>
            <NavLink to="/activities" activeclassname="active">
              Activities
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeclassname="active">
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/pricecomparison" activeclassname="active">
              Price Comparison
            </NavLink>
          </li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        &#61;
      </button>
    </>
  );
}

export default Sidebar;

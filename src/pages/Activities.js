import React, { useState, useEffect } from 'react';
import './Activities.css';

function Activities() {
  // Combined state object
  const [state, setState] = useState({
    dailyHours: [
      { day: 'Mon', hours: 2 },
      { day: 'Tue', hours: 1 },
      { day: 'Wed', hours: 3 },
      { day: 'Thu', hours: 2 },
      { day: 'Fri', hours: 4 },
      { day: 'Sat', hours: 1 },
      { day: 'Sun', hours: 2 },
    ],
    readingHours: '',
    userBooks: {
      toRead: [],
      ongoing: [],
      completed: [],
    },
    feedbackCount: 0,
    genreData: [],
    onlineUsers: 0,
    recommendedActivities: [],
  });

  // Modified submit handler
  const handleReadingHoursSubmit = () => {
    const newHours = [...state.dailyHours];
    const today = new Date().getDay(); // 0 (Sunday) to 6
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Update today's hours
    newHours[today === 0 ? 6 : today - 1] = { 
      ...newHours[today === 0 ? 6 : today - 1], 
      hours: parseInt(state.readingHours) 
    };
    
    setState((prevState) => ({
      ...prevState,
      dailyHours: newHours,
    }));
    console.log('Updated daily hours:', newHours);
  };

  return (
    <div className="activities">
      <h2>Activities Overview</h2>

      <div className="dashboard-grid">
        {/* Books Section */}
        <div className="dashboard-card books-section">
          <h3>Books</h3>
          <div className="book-categories">
            {['toRead', 'ongoing', 'completed'].map((category) => (
              <div key={category} className="book-category">
                <h4>{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <ul>
                  {state.userBooks[category].map((book) => (
                    <li key={book.id}>{book.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Reading Hours Chart */}
        <div className="dashboard-card">
          <h3>Daily Reading Hours</h3>
          <div className="chart-container">
            {state.dailyHours.map((day, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar" 
                  style={{ height: `${day.hours * 30}px` }}
                >
                  <span className="bar-value">{day.hours}h</span>
                </div>
                <span className="bar-label">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="hours-input">
            <input
              type="number"
              value={state.readingHours}
              onChange={(e) => setState({ ...state, readingHours: e.target.value })}
              min="0"
              max="24"
            />
            <button onClick={handleReadingHoursSubmit}>
              Update Today's Hours
            </button>
          </div>
        </div>

        {/* Other Sections */}
        <div className="dashboard-card">
          <h3>Feedback Given</h3>
          <div className="metric-box">
            <span className="metric-value">{state.feedbackCount}</span>
            <span className="metric-label">Total Reviews</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Genre Comparison</h3>
          <div className="genre-chart">
            {state.genreData.map((genre, index) => (
              <div key={index} className="genre-item">
                <span className="genre-name">{genre.name}</span>
                <div className="genre-bar">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(genre.count / 15) * 100}%` }}
                  ></div>
                </div>
                <span className="genre-count">{genre.count} books</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Online Users</h3>
          <div className="metric-box">
            <span className="metric-value">{state.onlineUsers}</span>
            <span className="metric-label">Currently Active</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Recommended Activities</h3>
          <ul className="activity-list">
            {state.recommendedActivities.map((activity, index) => (
              <li key={index} className="activity-item">
                <span className="bullet">✓</span>
                {activity.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Activities;

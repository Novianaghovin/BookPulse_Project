// src/pages/Settings.js
import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Apply the selected theme to the body
    document.body.className = `${theme}-theme`;
  }, [theme]);

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>
          <input
            type="radio"
            value="light"
            checked={theme === 'light'}
            onChange={() => setTheme('light')}
          />
          Light Theme
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => setTheme('dark')}
          />
          Dark Theme
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="pink"
            checked={theme === 'pink'}
            onChange={() => setTheme('pink')}
          />
          Pastel Pink Theme
        </label>
      </div>
    </div>
  );
};

export default Settings;
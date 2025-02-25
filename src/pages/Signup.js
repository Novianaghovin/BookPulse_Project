// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic here (API call, saving user data, etc.)
    console.log('Signup details:', { username, email, password, favoriteGenre });
    // After successful signup, navigate to login or directly log in the user
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Sign Up for BookPulse</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Favorite Genre:</label>
          <input 
            type="text" 
            value={favoriteGenre} 
            onChange={(e) => setFavoriteGenre(e.target.value)} 
            placeholder="E.g., Mystery, Sci-Fi, Romance..."
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} className="auth-link">
          Login here
        </span>
      </p>
    </div>
  );
}

export default Signup;

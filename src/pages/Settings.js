import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function UserSettings() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    favoriteBooks: [],
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [newBookInput, setNewBookInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user/data');
      setUserData({
        username: response.data.username,
        email: response.data.email,
        favoriteBooks: response.data.favoriteBooks,
      });
    } catch (error) {
      handleError(error, 'Failed to fetch user data');
    }
  };

  const handleError = (error, defaultMessage) => {
    const message = error.response?.data?.message || defaultMessage;
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!userData.username.trim()) return;
    
    try {
      setLoading(true);
      await axios.put('/api/user/username', { username: userData.username });
      setSuccess('Username updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      handleError(error, 'Failed to update username');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      await axios.put('/api/user/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Password changed successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      handleError(error, 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBookInput.trim()) return;

    try {
      setLoading(true);
      const updatedBooks = [...userData.favoriteBooks, newBookInput.trim()];
      await axios.put('/api/user/books', { favoriteBooks: updatedBooks });
      setUserData({ ...userData, favoriteBooks: updatedBooks });
      setNewBookInput('');
      setSuccess('Book added successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      handleError(error, 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBook = async (bookIndex) => {
    try {
      setLoading(true);
      const updatedBooks = userData.favoriteBooks.filter((_, index) => index !== bookIndex);
      await axios.put('/api/user/books', { favoriteBooks: updatedBooks });
      setUserData({ ...userData, favoriteBooks: updatedBooks });
      setSuccess('Book removed successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      handleError(error, 'Failed to remove book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Account Settings</h1>
      
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="settings-section">
        <h2>Profile Information</h2>
        <form onSubmit={handleUsernameSubmit} className="settings-form">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={userData.email} disabled />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="settings-section">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="settings-form">
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
              minLength="8"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>

      <div className="settings-section">
        <h2>Favorite Books</h2>
        <form onSubmit={handleAddBook} className="settings-form">
          <div className="form-group">
            <label>Add New Book:</label>
            <input
              type="text"
              value={newBookInput}
              onChange={(e) => setNewBookInput(e.target.value)}
              placeholder="Enter book title"
            />
          </div>
          <button type="submit" className="btn secondary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
        
        <div className="books-list">
          {userData.favoriteBooks.map((book, index) => (
            <div key={index} className="book-item">
              <span>{book}</span>
              <button 
                onClick={() => handleRemoveBook(index)}
                className="btn danger"
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
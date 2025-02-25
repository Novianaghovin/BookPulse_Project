import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import './Dashboard.css';

// Sample data
const bookSalesData = [
  { title: 'The Mystery Novel', sales: 120, revenue: 2400 },
  { title: 'Sci-Fi Adventures', sales: 95, revenue: 1900 },
  { title: 'Romance in Paris', sales: 75, revenue: 1500 },
  { title: 'Historical Tales', sales: 200, revenue: 4000 },
];

const genreInsights = [
  { genre: 'Mystery', count: 40 },
  { genre: 'Sci-Fi', count: 25 },
  { genre: 'Romance', count: 35 },
  { genre: 'Non-fiction', count: 20 },
];

const monthlySalesData = [
  { month: 'January', Mystery: 30, SciFi: 20, Romance: 15, NonFiction: 10 },
  { month: 'February', Mystery: 25, SciFi: 18, Romance: 12, NonFiction: 8 },
  { month: 'March', Mystery: 35, SciFi: 22, Romance: 20, NonFiction: 15 },
];

const recommendations = [
  {
    title: 'Secrets of the Night',
    genre: 'Mystery',
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1727905518i/219878883.jpg',
  },
  {
    title: 'Hidden Clues',
    genre: 'Mystery',
    image: 'https://i.ebayimg.com/images/g/JLAAAOSw7KFkWvMX/s-l400.jpg',
  },
  {
    title: 'Galactic Odyssey',
    genre: 'Sci-Fi',
    image: 'https://example.com/sci-fi-book.jpg',
  },
  {
    title: 'Love in the Air',
    genre: 'Romance',
    image: 'https://example.com/romance-book.jpg',
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [visibleGenres, setVisibleGenres] = useState({
    Mystery: true,
    SciFi: true,
    Romance: true,
    NonFiction: true,
  });

  const [selectedGenre, setSelectedGenre] = useState('Mystery');

  const handleCheckboxChange = (genre) => {
    setVisibleGenres((prevState) => ({
      ...prevState,
      [genre]: !prevState[genre],
    }));
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="dashboard">
      <h1>Book Sales Dashboard</h1>

      <div className="grid-container">
        {/* Book Sales and Revenue */}
        <div className="card">
          <h3>Book Sales vs Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Genre Insights */}
        <div className="card">
          <h3>Genre Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreInsights}
                dataKey="count"
                nameKey="genre"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {genreInsights.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales by Genre */}
        <div className="card">
          <h3>Monthly Sales by Genre</h3>
          <div className="checkbox-controls">
            {Object.keys(visibleGenres).map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  checked={visibleGenres[genre]}
                  onChange={() => handleCheckboxChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {visibleGenres.Mystery && <Line type="monotone" dataKey="Mystery" stroke="#8884d8" />}
              {visibleGenres.SciFi && <Line type="monotone" dataKey="SciFi" stroke="#82ca9d" />}
              {visibleGenres.Romance && <Line type="monotone" dataKey="Romance" stroke="#ffc658" />}
              {visibleGenres.NonFiction && <Line type="monotone" dataKey="NonFiction" stroke="#ff7300" />}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div className="card">
          <h3>Top Recommendations</h3>
          <div className="genre-filter">
            <label>
              Filter by Genre:
              <select value={selectedGenre} onChange={handleGenreChange}>
                <option value="Mystery">Mystery</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
                <option value="Non-fiction">Non-fiction</option>
              </select>
            </label>
          </div>
          <div className="recommendations-list">
            {recommendations
              .filter((book) => book.genre === selectedGenre)
              .map((book, index) => (
                <div key={index} className="recommendation-item">
                  <img src={book.image} alt={book.title} className="recommendation-image" />
                  <div className="recommendation-details">
                    <strong>{book.title}</strong>
                    <p>Genre: {book.genre}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
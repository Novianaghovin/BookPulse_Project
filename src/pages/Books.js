import React, { useState, useEffect } from 'react';
import './Books.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    author: '',
    title: '',
    year: '',
    rating: '',
  });
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortByYear, setSortByYear] = useState(false); // Add state for sorting by year

  useEffect(() => {
    // Sample book data
    const sampleBooks = [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, rating: 4.5 },
      { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, rating: 4.7 },
      { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, rating: 4.8 },
      { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', year: 1951, rating: 4.2 },
      { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813, rating: 4.6 },
      { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937, rating: 4.9 },
      { id: 7, title: 'Moby-Dick', author: 'Herman Melville', genre: 'Adventure', year: 1851, rating: 4.3 },
      { id: 8, title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical Fiction', year: 1869, rating: 4.4 },
      { id: 9, title: 'The Odyssey', author: 'Homer', genre: 'Epic Poetry', year: -800, rating: 4.8 },
      { id: 10, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Psychological Fiction', year: 1866, rating: 4.7 },
    ];

    // Filter books based on selected filters
    let filteredBooks = sampleBooks.filter((book) => {
      return (
        (filters.genre ? book.genre === filters.genre : true) &&
        (filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true) &&
        (filters.title ? book.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.year ? matchesYear(book.year, filters.year) : true) &&
        (filters.rating ? book.rating >= parseFloat(filters.rating) : true)
      );
    });

    // Sort books based on the selected criteria
    if (sortByYear) {
      filteredBooks.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.year - b.year;
        } else {
          return b.year - a.year;
        }
      });
    } else {
      filteredBooks.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
    }

    setBooks(filteredBooks);
  }, [filters, sortOrder, sortByYear]);

  const matchesYear = (bookYear, filterYear) => {
    if (filterYear === '') return true; // No filter on year
    const regex = new RegExp(`^${filterYear.replace('%', '.*')}$`);
    return regex.test(bookYear.toString());
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortByYearChange = () => {
    setSortByYear((prevSortByYear) => !prevSortByYear); // Toggle sorting by year
  };

  return (
    <div className="book-list-container">
      <h1>Book List</h1>
      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            name="title"
            placeholder="Search by title"
            value={filters.title}
            onChange={handleFilterChange}
            className="search-input"
          />
          <input
            type="text"
            name="author"
            placeholder="Search by author"
            value={filters.author}
            onChange={handleFilterChange}
            className="search-input"
          />
          <select
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="dropdown-filter"
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Adventure">Adventure</option>
            <option value="Historical Fiction">Historical Fiction</option>
            <option value="Epic Poetry">Epic Poetry</option>
            <option value="Psychological Fiction">Psychological Fiction</option>
          </select>
          <input
            type="text"
            name="year"
            placeholder="Search by year (e.g., 19%%)"
            value={filters.year}
            onChange={handleFilterChange}
            className="search-input"
          />
          <div className="rating-filter">
            <input
              type="number"
              name="rating"
              placeholder="Min Rating"
              value={filters.rating}
              onChange={handleFilterChange}
              min="1"
              max="5"
              step="0.1"
              className="rating-input"
            />
          </div>
        </div>
      </div>
      <div className="table-and-rating-bar">
        <div className="rating-bar">
          <label>
            Sort by Rating:
            <button onClick={handleSortOrderChange} className="sort-button">
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </label>
        </div>
        <div className="year-sort-bar">
          <label>
            Sort by Year:
            <button onClick={handleSortByYearChange} className="sort-button">
              {sortByYear ? 'By Year (Ascending)' : 'By Rating'}
            </button>
          </label>
        </div>
        <div className="table-wrapper">
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.year}</td>
                    <td>
                      <span className="rating-badge">{book.rating}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-results">
                    No books found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookList;

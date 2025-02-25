// src/PriceComparison.js
import React, { useState } from 'react';
import { Table, Button, Input, Container } from 'reactstrap';
import './PriceComparison.css'; // Custom CSS for styling

const PriceComparison = () => {
  // Sample data for books and their prices on different websites
  const [books, setBooks] = useState([
    { id: 1, title: 'Book One', website1: 10, website2: 12, website3: 11, url1: '#', url2: '#', url3: '#' },
    { id: 2, title: 'Book Two', website1: 15, website2: 14, website3: 16, url1: '#', url2: '#', url3: '#' },
    { id: 3, title: 'Book Three', website1: 20, website2: 18, website3: 19, url1: '#', url2: '#', url3: '#' },
    // Add more books as needed
  ]);

  const [filter, setFilter] = useState('');

  // Filter books based on the search input
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Function to determine the best price for a book
  const getBestPrice = (book) => {
    const prices = [book.website1, book.website2, book.website3];
    return Math.min(...prices);
  };

  return (
    <Container className="price-comparison-container">
      <h2 className="text-center mb-4">Price Comparison</h2>
      <Input
        type="text"
        placeholder="Search for a book..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 search-input"
      />
      <div className="table-container">
        <Table striped responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Website 1</th>
              <th>Website 2</th>
              <th>Website 3</th>
              <th>Best Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => {
              const bestPrice = getBestPrice(book);
              return (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>
                    <span className={book.website1 === bestPrice ? 'best-price' : ''}>
                      ${book.website1}
                    </span>{' '}
                    <Button
                      color="link"
                      onClick={() => window.open(book.url1, '_blank')}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <span className={book.website2 === bestPrice ? 'best-price' : ''}>
                      ${book.website2}
                    </span>{' '}
                    <Button
                      color="link"
                      onClick={() => window.open(book.url2, '_blank')}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <span className={book.website3 === bestPrice ? 'best-price' : ''}>
                      ${book.website3}
                    </span>{' '}
                    <Button
                      color="link"
                      onClick={() => window.open(book.url3, '_blank')}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <strong>${bestPrice}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PriceComparison;
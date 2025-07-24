import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(`/api/products?search=${query}`) // Adjust if using local filtering
        .then(res => setResults(res.data))
        .catch(err => console.log(err));
    }
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {results.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;

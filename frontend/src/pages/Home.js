import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import '../styles/ProductCard.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const getQuantity = (id) => {
    const item = cart.find(p => p._id === id);
    return item ? item.quantity : 0;
  };

  const filteredProducts = searchTerm.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const escapedQuery = query.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <>
      {searchTerm && (
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <button onClick={() => setSearchTerm('')} className="clear-search-btn">
            ❌ Clear Search
          </button>
        </div>
      )}

      {loading ? (
        <div className="loader">Loading products...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p style={{ padding: '20px', fontWeight: 'bold' }}>
              No products found for "<span style={{ color: '#ffa500' }}>{searchTerm}</span>"
            </p>
          ) : (
            filteredProducts.map(product => {
              const quantity = getQuantity(product._id);
              const randomRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
              const shortDescription = product.description?.split(' ').slice(0, 3).join(' ') + '...';
              const randomDiscount = Math.floor(Math.random() * 20) + 10;

              return (
                <div
                  key={product._id}
                  className="product-card"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img src={product.image} alt={product.name} />

                  <div className="product-info">
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(
                          product.name.split(' ').slice(0, 12).join(' ') + (product.name.split(' ').length > 12 ? '...' : ''),
                          searchTerm
                        ),
                      }}
                    />
                    <p className="rating">⭐ {randomRating} / 5</p>
                    <p className="description">{shortDescription}</p>
                    <p className="price">
                      ₹{product.price.toLocaleString()} &nbsp;
                      <span className="discount">({randomDiscount}% OFF)</span>
                    </p>
                  </div>

                  <div className="btn-container" onClick={(e) => e.stopPropagation()}>
                    {quantity === 0 ? (
                      <button
                        className="add-btn"
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-control">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_ONE', payload: product._id })}
                        >−</button>
                        <span>{quantity}</span>
                        <button
                          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                        >+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}

export default Home;

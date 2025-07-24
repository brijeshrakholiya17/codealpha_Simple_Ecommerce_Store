import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ✅ added
import axios from 'axios';
import '../styles/ProductDetails.css';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const { cart, dispatch } = useCart(); // ✅ added
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBuyNow = () => {
  const productToBuy = {
    ...product,
    quantity: quantity === 0 ? 1 : quantity
  };

  localStorage.setItem('checkoutItem', JSON.stringify([productToBuy]));
  navigate('/checkout');
};

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const getQuantity = () => {
    const item = cart.find(p => p._id === id);
    return item ? item.quantity : 0;
  };

  const quantity = getQuantity(); // ✅ gets current quantity from cart

  if (loading) return <p>Loading product details...</p>;
  if (!product || !product.name) return <p>Product not found.</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>

          <div className="product-price">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            <span className="old-price">
              ₹{Math.round(product.price * 1.3).toLocaleString()}
            </span>
          </div>


          <div className="product-rating">⭐ 4.5/5 (120 reviews)</div>

          <div className="product-description">{product.description}</div>

          <div className="delivery-info">🚚 Delivery in 2–5 business days</div>

          {/* ✅ Cart logic copied from Home.js */}
          <div className="product-buttons">
            {quantity === 0 ? (
              <button
                className="add-cart-btn"
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
              >
                🛒 Add to Cart
              </button>
            ) : (
              <div className="quantity-selector">
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_ONE', payload: product._id })
                  }
                >−</button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    dispatch({ type: 'ADD_TO_CART', payload: product })
                  }
                >+</button>
              </div>
            )}

            <button className="buy-now-btn" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

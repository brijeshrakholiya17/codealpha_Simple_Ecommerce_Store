import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

function Cart() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty 🛒</p>
          <Link to="/" className="shop-now-link">Let’s shop something →</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="quantity-control">
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ONE', payload: item._id })}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                    >+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item._id })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="total">Total: ₹{total.toLocaleString()}</h3>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              ✅ Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

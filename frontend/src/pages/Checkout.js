import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Checkout.css';

function Checkout() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token');

    const res = await axios.post(
      '/api/orders',
      {
        products: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        totalAmount: total
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(res.data);
    dispatch({ type: 'CLEAR_CART' });
    alert('✅ Order placed successfully!');
    navigate('/orders');
  } catch (err) {
    alert('❌ Failed to place order. Please login first.');
    console.error(err.response?.data || err.message);
  }
};


  return (
    <div className="checkout-container">
      <h2>🧾 Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="checkout-summary">
          {cart.map(item => (
            <div key={item._id} className="checkout-item">
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <h3>Total: ₹{total.toLocaleString()}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            🛍️ Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;

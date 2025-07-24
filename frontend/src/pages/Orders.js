import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Orders.css';
import DeliveryTimeline from '../components/DeliveryTimeline';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/orders/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data))
      .catch(err => console.error('Failed to fetch orders:', err));
  }, []);

  return (
    <div className="orders-page">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount.toLocaleString()}</p>

            <div className="timeline-wrapper">
              <DeliveryTimeline status={order.status} />
            </div>

            <ul className="product-list">
              {order.products.map(p => (
                <li key={p.productId._id}>
                  {p.productId.name} – Qty: {p.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

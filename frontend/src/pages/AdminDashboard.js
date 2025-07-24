import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // ✅ external CSS

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token }
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('❌ Failed to delete product');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-title">🛠️ Admin Product Management</h2>

      <div className="admin-products-list">
        {products.map(product => (
          <div key={product._id} className="admin-product-card">
            <img src={product.image} alt={product.name} className="admin-product-thumb" />
            <div className="admin-product-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
            <div className="admin-product-actions">
              <button
                className="edit-btn"
                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
              >✏️ Edit</button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(product._id)}
              >🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

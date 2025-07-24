import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/AdminAddProduct.css'; // 👈 Import external CSS

const AdminAddProduct = () => {
  const { token } = useAuth(); // ✅ This is the correct token
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!token) return navigate('/');
    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') navigate('/');
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'image') setPreview(value);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products/add', form, {
        headers: { Authorization: `Bearer ${token}` } // ✅ FIXED HERE
      });
      alert('✅ Product added!');
      setForm({ name: '', description: '', price: '', image: '' });
      setPreview('');
    } catch (err) {
      alert('❌ ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>🛒 Add New Product</h2>
        <form onSubmit={submitProduct} className="add-product-form">
          <label>Product Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Sony Headphones" required />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter product description..." rows="4" required />

          <label>Price (₹)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 24999" required />

          <label>Image URL</label>
          <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" required />

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="preview" />
            </div>
          )}

          <button type="submit">➕ Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;

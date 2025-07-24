// src/pages/AddProduct.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/products', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('✅ Product added!');
      navigate('/admin/products');
    } catch (err) {
      toast.error('❌ Failed to add product');
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="name" placeholder="Product Name" onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
        <input name="image" placeholder="Image URL" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;

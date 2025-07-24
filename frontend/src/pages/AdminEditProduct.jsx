import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/AdminEditProduct.css';

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
  const [preview, setPreview] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setForm(res.data);
        setPreview(res.data.image);
      })
      .catch(() => toast.error('❌ Failed to load product'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'image') setPreview(value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ Product updated');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || '❌ Update failed');
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate} className="edit-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
        {preview && <img src={preview} alt="Preview" className="edit-image-preview" />}
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={4}></textarea>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default AdminEditProduct;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('❌ Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('🗑️ Product deleted');
      fetchProducts(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Delete failed');
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      {products.map(p => (
        <div key={p._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <img src={p.image} alt={p.name} width={100} />
          <div style={{ marginTop: 5 }}>
            <button onClick={() => navigate(`/admin/edit-product/${p._id}`)}>✏️ Edit</button>
            <button onClick={() => deleteProduct(p._id)}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProductList;

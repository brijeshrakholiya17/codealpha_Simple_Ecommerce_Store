// src/components/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginModal.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      toast.success('✅ Logged in!');
      onClose(); // Close modal
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>🔐 Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

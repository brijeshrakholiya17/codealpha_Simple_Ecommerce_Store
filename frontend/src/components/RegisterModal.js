// src/components/RegisterModal.js
import React, { useState } from 'react';
import '../styles/RegisterModal.css';

function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 TODO: Send data to backend here
    console.log('Registering:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="register-modal-overlay">
      <div className="register-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;

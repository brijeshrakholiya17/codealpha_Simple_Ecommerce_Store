import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/Login.css'; // ✅ Import external styles

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      toast.success('✅ Logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>🔐 Welcome Back</h2>

        <input
          placeholder='📧 Email'
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder='🔑 Password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;

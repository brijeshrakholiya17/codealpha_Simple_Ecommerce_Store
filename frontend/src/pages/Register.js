import { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // default role
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', { name, email, password, role });

      // Auto login after register
      const res = await axios.post('/api/users/login', { email, password });
      setToken(res.data.token);

      toast.success('You registered and logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '250px' }}>
      <input
        placeholder='Name'
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        placeholder='Email'
        type="email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        placeholder='Password'
        type='password'
        onChange={e => setPassword(e.target.value)}
        required
      />

      <select onChange={e => setRole(e.target.value)} value={role}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <button type='submit'>Register</button>
    </form>
  );
}

export default Register;

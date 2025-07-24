const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body; // 👈 accept role

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role }); // 👈 store role
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Registration failed', error: err.message });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    // 👇 Include role in JWT payload
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
};

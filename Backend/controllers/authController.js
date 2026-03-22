const jwt = require('jsonwebtoken');
const { dummyUsers } = require('../data/dummyData');

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department,
  employeeId: user.employeeId,
});

const signToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
    employeeId: user.employeeId,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = dummyUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ message: `Selected role does not match account role (${user.role})` });
    }

    const token = signToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Login failed' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = dummyUsers.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user: sanitizeUser(user) });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to load user profile' });
  }
};

const logout = async (req, res) => {
  return res.json({ success: true });
};

module.exports = {
  login,
  getMe,
  logout,
};

const authService = require('../services/authService');

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const result = authService.login(email, password);

  if (!result.success) {
    return res.status(401).json({ message: result.message });
  }

  return res.status(200).json({
    message: 'Login successful',
    token: result.token,
    user: result.user
  });
};

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const result = authService.register(name, email, password);

  if (!result.success) {
    return res.status(409).json({ message: result.message });
  }

  return res.status(201).json({
    message: 'User registered successfully',
    token: result.token,
    user: result.user
  });
};

module.exports = {
  login,
  register
};

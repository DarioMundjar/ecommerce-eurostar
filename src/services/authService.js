const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = 'eurostar-ecommerce-secret-key';

const login = (email, password) => {
  const user = userModel.findByEmail(email);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: 'Invalid email or password' };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email }
  };
};

const register = (name, email, password) => {
  const existingUser = userModel.findByEmail(email);

  if (existingUser) {
    return { success: false, message: 'Email already registered' };
  }

  const newUser = userModel.createUser(name, email, password);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    success: true,
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  };
};

module.exports = {
  login,
  register,
  JWT_SECRET
};

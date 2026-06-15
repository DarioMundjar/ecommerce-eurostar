const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10)
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password456', 10)
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: bcrypt.hashSync('password789', 10)
  }
];

const findByEmail = (email) => {
  return users.find(user => user.email === email);
};

const findById = (id) => {
  return users.find(user => user.id === id);
};

const createUser = (name, email, password) => {
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: bcrypt.hashSync(password, 10)
  };
  users.push(newUser);
  return newUser;
};

module.exports = {
  users,
  findByEmail,
  findById,
  createUser
};

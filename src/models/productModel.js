const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    stock: 50
  },
  {
    id: 2,
    name: 'Smartphone Case',
    price: 19.99,
    stock: 200
  },
  {
    id: 3,
    name: 'USB-C Charger',
    price: 29.99,
    stock: 100
  }
];

const findById = (id) => {
  return products.find(product => product.id === id);
};

const getAll = () => {
  return products;
};

module.exports = {
  products,
  findById,
  getAll
};

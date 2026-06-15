const request = require('supertest');
const { expect } = require('chai');

const BASE_URL = 'http://localhost:3000';

describe('Path Coverage Tests', function () {
  let authToken;

  describe('GET /api/healthcheck', function () {
    it('should return health status of the API', async function () {
      const response = await request(BASE_URL)
        .get('/api/healthcheck')
        .expect(200);

      expect(response.body).to.have.property('status', 'OK');
      expect(response.body).to.have.property('timestamp');
      expect(response.body).to.have.property('uptime');
    });
  });

  describe('POST /api/register', function () {
    it('should register a new user successfully', async function () {
      const newUser = {
        name: 'Test User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'testpassword123'
      };

      const response = await request(BASE_URL)
        .post('/api/register')
        .send(newUser)
        .expect(201);

      expect(response.body).to.have.property('message', 'User registered successfully');
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('name', newUser.name);
      expect(response.body.user).to.have.property('email', newUser.email);
    });
  });

  describe('POST /api/login', function () {
    it('should login with valid credentials', async function () {
      const credentials = {
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(BASE_URL)
        .post('/api/login')
        .send(credentials)
        .expect(200);

      expect(response.body).to.have.property('message', 'Login successful');
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('name', 'John Doe');
      expect(response.body.user).to.have.property('email', 'john@example.com');

      authToken = response.body.token;
    });
  });

  describe('POST /api/checkout', function () {
    it('should perform checkout with valid token and items', async function () {
      // First login to get a token
      const loginResponse = await request(BASE_URL)
        .post('/api/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        });

      authToken = loginResponse.body.token;

      const checkoutData = {
        items: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 }
        ],
        paymentMethod: 'cash'
      };

      const response = await request(BASE_URL)
        .post('/api/checkout')
        .set('Authorization', `Bearer ${authToken}`)
        .send(checkoutData)
        .expect(200);

      expect(response.body).to.have.property('message', 'Checkout completed successfully');
      expect(response.body).to.have.property('order');
      expect(response.body.order).to.have.property('items');
      expect(response.body.order).to.have.property('paymentMethod', 'cash');
      expect(response.body.order).to.have.property('subtotal');
      expect(response.body.order).to.have.property('discount');
      expect(response.body.order).to.have.property('total');
    });
  });
});

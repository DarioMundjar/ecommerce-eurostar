# E-Commerce Eurostar API

## Description

A RESTful API for an e-commerce platform built with Node.js and Express. This API provides user authentication using JWT tokens and a checkout system with support for cash and credit card payments. All data is stored in-memory (no database required).

## Installation

1. Clone the repository:
```bash
git clone git@github.com:DarioMundjar/ecommerce-eurostar.git
cd ecommerce-eurostar
```

2. Install dependencies:
```bash
npm install
```

## How to Run

Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`.

## Rules

- **Payment Methods**: The checkout accepts only `cash` or `credit_card`.
- **Cash Discount**: Paying with cash gives a **10% discount** on the total order.
- **Authentication Required**: Only authenticated users (with a valid JWT token) can perform a checkout.
- **Token Format**: The JWT token must be sent in the `Authorization` header as `Bearer <token>`.

## Existent Data

### Users

| Name         | Email             | Password      |
|--------------|-------------------|---------------|
| John Doe     | john@example.com  | password123   |
| Jane Smith   | jane@example.com  | password456   |
| Bob Johnson  | bob@example.com   | password789   |

### Products

| ID | Name                | Price   | Stock |
|----|---------------------|---------|-------|
| 1  | Wireless Headphones | $79.99  | 50    |
| 2  | Smartphone Case     | $19.99  | 200   |
| 3  | USB-C Charger       | $29.99  | 100   |

## How to Use the REST API

### 1. Health Check

Check if the API is running.

```bash
curl http://localhost:3000/api/healthcheck
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 10.5
}
```

### 2. Register

Create a new user account.

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "newuser@example.com",
    "password": "mypassword"
  }'
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 4,
    "name": "New User",
    "email": "newuser@example.com"
  }
}
```

### 3. Login

Authenticate with an existing user to get a JWT token.

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 4. Checkout

Perform a checkout (requires authentication).

**With Credit Card:**
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token-here>" \
  -d '{
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 3, "quantity": 1 }
    ],
    "paymentMethod": "credit_card"
  }'
```

**With Cash (10% discount):**
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token-here>" \
  -d '{
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 3, "quantity": 1 }
    ],
    "paymentMethod": "cash"
  }'
```

**Response (200):**
```json
{
  "message": "Checkout completed successfully",
  "order": {
    "items": [
      {
        "productId": 1,
        "name": "Wireless Headphones",
        "price": 79.99,
        "quantity": 2,
        "subtotal": 159.98
      },
      {
        "productId": 3,
        "name": "USB-C Charger",
        "price": 29.99,
        "quantity": 1,
        "subtotal": 29.99
      }
    ],
    "paymentMethod": "cash",
    "subtotal": 189.97,
    "discount": 19.0,
    "total": 170.97
  }
}
```

### Error Responses

- **400** - Bad Request (missing fields, invalid data)
- **401** - Unauthorized (missing or invalid token)
- **409** - Conflict (email already registered)

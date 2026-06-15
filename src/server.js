const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = require(path.join(__dirname, '..', 'swagger.json'));
const authRoutes = require('./routes/authRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const healthcheckRoutes = require('./routes/healthcheckRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', authRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', healthcheckRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`E-commerce API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/healthcheck`);
});

module.exports = app;

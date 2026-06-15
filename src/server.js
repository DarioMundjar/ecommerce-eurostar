const express = require('express');
const authRoutes = require('./routes/authRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const healthcheckRoutes = require('./routes/healthcheckRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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

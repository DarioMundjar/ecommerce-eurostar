const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/checkout', authenticate, checkoutController.checkout);

module.exports = router;

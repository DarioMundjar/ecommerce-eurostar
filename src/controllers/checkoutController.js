const checkoutService = require('../services/checkoutService');

const checkout = (req, res) => {
  const { items, paymentMethod } = req.body;

  if (!items || !paymentMethod) {
    return res.status(400).json({ message: 'Items and paymentMethod are required' });
  }

  const result = checkoutService.checkout(items, paymentMethod);

  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }

  return res.status(200).json({
    message: 'Checkout completed successfully',
    order: result.order
  });
};

module.exports = {
  checkout
};

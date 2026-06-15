const productModel = require('../models/productModel');

const PAYMENT_METHODS = {
  CASH: 'cash',
  CREDIT_CARD: 'credit_card'
};

const CASH_DISCOUNT = 0.10;

const checkout = (items, paymentMethod) => {
  // Validate payment method
  if (!Object.values(PAYMENT_METHODS).includes(paymentMethod)) {
    return {
      success: false,
      message: 'Invalid payment method. Accepted methods: cash, credit_card'
    };
  }

  // Validate items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return {
      success: false,
      message: 'Items array is required and must not be empty'
    };
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of items) {
    const product = productModel.findById(item.productId);

    if (!product) {
      return {
        success: false,
        message: `Product with id ${item.productId} not found`
      };
    }

    if (!item.quantity || item.quantity <= 0) {
      return {
        success: false,
        message: `Invalid quantity for product ${product.name}`
      };
    }

    if (product.stock < item.quantity) {
      return {
        success: false,
        message: `Insufficient stock for product ${product.name}. Available: ${product.stock}`
      };
    }

    const itemTotal = product.price * item.quantity;
    totalPrice += itemTotal;

    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: parseFloat(itemTotal.toFixed(2))
    });
  }

  // Apply cash discount
  let discount = 0;
  if (paymentMethod === PAYMENT_METHODS.CASH) {
    discount = totalPrice * CASH_DISCOUNT;
  }

  const finalTotal = totalPrice - discount;

  // Update stock
  for (const item of items) {
    const product = productModel.findById(item.productId);
    product.stock -= item.quantity;
  }

  return {
    success: true,
    order: {
      items: orderItems,
      paymentMethod,
      subtotal: parseFloat(totalPrice.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      total: parseFloat(finalTotal.toFixed(2))
    }
  };
};

module.exports = {
  checkout,
  PAYMENT_METHODS
};

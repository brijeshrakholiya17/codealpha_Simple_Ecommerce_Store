const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const { placeOrder, updateOrderStatus } = require('../controllers/orderController');
const { requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/', requireAuth, placeOrder);
router.get('/my', requireAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.productId');
  res.json(orders);
});

router.put('/status', requireAdmin, updateOrderStatus);


module.exports = router;
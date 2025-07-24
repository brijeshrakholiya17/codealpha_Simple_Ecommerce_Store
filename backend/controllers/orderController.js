const Order = require('../models/Order');
const Product = require('../models/Product'); // move to top

exports.placeOrder = async (req, res) => {
  try {
    // Create Order
    const order = await Order.create({
      user: req.user.id,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
    });

    // Update product stock
    for (const item of req.body.products) {
      const quantityToDeduct = item.quantity || 1;
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -quantityToDeduct }
      });
    }

    // Respond AFTER all updates are done
    res.json(order);
  } catch (err) {
    console.error('❌ Order Placement Failed:', err.message);
    res.status(500).json({ message: 'Internal server error while placing order.' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = status;

    if (status === 'Delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update order status' });
  }
};

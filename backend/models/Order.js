const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['Placed', 'Processing', 'Shipped', 'Delivered'],
    default: 'Placed',
  },
  createdAt: { type: Date, default: Date.now },
  deliveredAt: Date,
});

module.exports = mongoose.model('Order', orderSchema);

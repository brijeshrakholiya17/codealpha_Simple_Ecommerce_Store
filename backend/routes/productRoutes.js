const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// ✅ Public: Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: '❌ Server error', error: err.message });
  }
});

// ✅ Admin Only: Add new product
router.post('/add', requireAuth, requireAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(201).json({ message: '✅ Product added successfully', product: newProduct });
  } catch (err) {
    res.status(400).json({ message: '❌ Failed to add product', error: err.message });
  }
});

// ✅ Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: '❌ Product not found' });
  } catch (err) {
    res.status(500).json({ message: '❌ Server error', error: err.message });
  }
});

// ✅ Admin Only: Delete product
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: '🗑️ Product deleted' });
  } catch (err) {
    res.status(500).json({ message: '❌ Server error', error: err.message });
  }
});

// ✅ Admin Only: Update product
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: '✅ Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to update', error: err.message });
  }
});

module.exports = router;

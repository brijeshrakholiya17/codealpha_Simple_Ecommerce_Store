const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // use bcrypt in real app
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123',
      },
    ]);

    const products = await Product.insertMany([
  {
    name: 'Apple MacBook Pro M2',
    description: 'Powerful performance with 16GB RAM and 512GB SSD.',
    price: 189999,
    image: 'https://m.media-amazon.com/images/I/61L5QgPvgqL._SL1500_.jpg',
  },
  {
    name: 'Sony WH-1000XM4 Headphones',
    description: 'Industry-leading noise canceling with up to 30 hours battery.',
    price: 24999,
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._SL1500_.jpg',
  },
  {
    name: 'iPhone 13 Blue 128GB',
    description: 'Super Retina XDR display with A15 Bionic chip.',
    price: 69999,
    image: 'https://m.media-amazon.com/images/I/71gm8v4uPBL._SL1500_.jpg',
  },
  {
    name: 'Samsung 43-inch Smart TV',
    description: 'Crystal 4K UHD with built-in Alexa and HDR.',
    price: 38999,
    image: 'https://m.media-amazon.com/images/I/91fAU6mxFsL._SL1500_.jpg',
  },
  {
    name: 'OnePlus Nord CE 3 Lite 5G',
    description: '108 MP camera, Snapdragon 695, 67W SuperVOOC charging.',
    price: 19999,
    image: 'https://m.media-amazon.com/images/I/61QRgOgBx0L._SL1500_.jpg',
  },
  {
    name: 'Digital Alarm Clock',
    description: 'LED display, night light, USB charging, snooze function.',
    price: 799,
    image: 'https://source.unsplash.com/featured/?alarm-clock',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Thermal insulated, 1L capacity, hot & cold.',
    price: 599,
    image: 'https://source.unsplash.com/featured/?water-bottle',
  },
  {
    name: 'Modern Office Chair',
    description: 'Ergonomic chair with lumbar support and wheels.',
    price: 3599,
    image: 'https://source.unsplash.com/featured/?office-chair',
  },
  {
    name: 'Bluetooth Keyboard',
    description: 'Compact wireless keyboard with silent keys.',
    price: 899,
    image: 'https://source.unsplash.com/featured/?keyboard',
  },
  {
    name: 'Table Lamp',
    description: 'Adjustable brightness, USB powered, modern look.',
    price: 1199,
    image: 'https://source.unsplash.com/featured/?lamp',
  }
]);


    await Order.insertMany([
      {
        user: users[1]._id,
        products: [
          { product: products[0]._id, quantity: 1 },
          { product: products[1]._id, quantity: 2 },
        ],
        total: products[0].price + products[1].price * 2,
      },
    ]);

    console.log('✅ Dummy users, products, and orders inserted');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding:', err.message);
    process.exit(1);
  }
};

seedData();

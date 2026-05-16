const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected to:', process.env.MONGO_URI);
    // Seed data if DB is empty
    const Product = require('./models/Product');
    const count = await Product.countDocuments();
    if (count === 0) {
      await require('./utils/seeder')();
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🛒 Ecommerce API Running',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      productById: '/api/products/:id',
      orders: '/api/orders'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

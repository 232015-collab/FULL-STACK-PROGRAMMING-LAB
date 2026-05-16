// Mock server - works without MongoDB for demo/screenshots
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// In-memory mock data
const products = [
  { _id: '1', name: 'Apple iPhone 15 Pro', description: 'The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.', price: 149999, originalPrice: 169999, category: 'Electronics', brand: 'Apple', stock: 25, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80', rating: 4.8, numReviews: 120, isFeatured: true },
  { _id: '2', name: 'Samsung Galaxy S24 Ultra', description: 'Samsung flagship with S Pen, 200MP camera, and 6.8" Dynamic AMOLED display.', price: 139999, originalPrice: 159999, category: 'Electronics', brand: 'Samsung', stock: 18, image: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=500&q=80', rating: 4.7, numReviews: 98, isFeatured: true },
  { _id: '3', name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise cancellation with 30-hour battery life and crystal-clear audio.', price: 54999, originalPrice: 64999, category: 'Electronics', brand: 'Sony', stock: 40, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', rating: 4.9, numReviews: 200, isFeatured: true },
  { _id: '4', name: 'MacBook Air M3', description: 'Supercharged by M3 chip with 18-hour battery life and Liquid Retina display.', price: 249999, originalPrice: 279999, category: 'Electronics', brand: 'Apple', stock: 12, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80', rating: 4.9, numReviews: 75, isFeatured: true },
  { _id: '5', name: 'Nike Air Max 270', description: 'Lightweight running shoes with Max Air unit for all-day comfort and modern style.', price: 19999, originalPrice: 24999, category: 'Sports', brand: 'Nike', stock: 60, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', rating: 4.5, numReviews: 320, isFeatured: true },
  { _id: '6', name: "Men's Premium Polo Shirt", description: "Classic polo shirt made from 100% pima cotton. Perfect for casual occasions.", price: 2999, originalPrice: 4499, category: 'Clothing', brand: 'Khaadi', stock: 150, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80', rating: 4.3, numReviews: 89, isFeatured: false },
  { _id: '7', name: 'The Alchemist - Paulo Coelho', description: 'A mystical story of Santiago, an Andalusian shepherd boy. Bestselling novel of all time.', price: 799, originalPrice: 1200, category: 'Books', brand: 'HarperCollins', stock: 200, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80', rating: 4.8, numReviews: 512, isFeatured: false },
  { _id: '8', name: 'Instant Pot Duo 7-in-1', description: 'Electric pressure cooker replacing 7 kitchen appliances. Cook up to 70% faster.', price: 14999, originalPrice: 18999, category: 'Home & Kitchen', brand: 'Instant Pot', stock: 35, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80', rating: 4.6, numReviews: 445, isFeatured: false },
  { _id: '9', name: 'Neutrogena Hydro Boost Moisturizer', description: 'Water-gel formula with hyaluronic acid that keeps skin hydrated 24/7.', price: 2499, originalPrice: 3200, category: 'Beauty', brand: 'Neutrogena', stock: 80, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80', rating: 4.4, numReviews: 230, isFeatured: false },
  { _id: '10', name: 'Dell XPS 15 Laptop', description: '15.6" OLED display, Intel Core i7, 32GB RAM, 1TB SSD, and NVIDIA RTX 4060.', price: 319999, originalPrice: 359999, category: 'Electronics', brand: 'Dell', stock: 8, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80', rating: 4.7, numReviews: 55, isFeatured: true },
  { _id: '11', name: 'Yoga Mat Premium Non-Slip', description: 'Extra thick 6mm yoga mat with alignment lines and eco-friendly TPE material.', price: 3499, originalPrice: 4999, category: 'Sports', brand: 'Liforme', stock: 90, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80', rating: 4.6, numReviews: 178, isFeatured: false },
  { _id: '12', name: "Women's Embroidered Kurta", description: 'Beautiful hand-embroidered kurta made from premium lawn fabric for all occasions.', price: 4500, originalPrice: 6500, category: 'Clothing', brand: 'Gul Ahmed', stock: 75, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80', rating: 4.5, numReviews: 143, isFeatured: false },
];

let orders = [];

// Root
app.get('/', (req, res) => {
  res.json({ message: '🛒 Ecommerce API Running (Mock Mode)', version: '1.0.0', endpoints: { products: '/api/products', orders: '/api/orders' } });
});

// GET all products
app.get('/api/products', (req, res) => {
  const { category, search, sort, featured } = req.query;
  let result = [...products];
  if (category) result = result.filter(p => p.category === category);
  if (featured) result = result.filter(p => p.isFeatured);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  res.json({ success: true, count: result.length, products: result });
});

// GET categories
app.get('/api/products/categories', (req, res) => {
  const cats = [...new Set(products.map(p => p.category))];
  res.json({ success: true, categories: cats });
});

// GET featured
app.get('/api/products/featured', (req, res) => {
  res.json({ success: true, products: products.filter(p => p.isFeatured).slice(0, 6) });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

// POST product
app.post('/api/products', (req, res) => {
  const product = { _id: String(products.length + 1), ...req.body };
  products.push(product);
  res.status(201).json({ success: true, product });
});

// GET all orders
app.get('/api/orders', (req, res) => {
  res.json({ success: true, count: orders.length, orders });
});

// GET order by id
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});

// POST order
app.post('/api/orders', (req, res) => {
  const order = { _id: 'ORD-' + Date.now(), ...req.body, status: 'Pending', createdAt: new Date() };
  orders.push(order);
  res.status(201).json({ success: true, message: 'Order placed successfully!', order });
});

// PUT order status
app.put('/api/orders/:id/status', (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  order.status = req.body.status;
  res.json({ success: true, order });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mock Server running on http://localhost:${PORT}`);
  console.log(`📦 Loaded ${products.length} products (no MongoDB required)`);
  console.log(`🌐 Test: http://localhost:${PORT}/api/products`);
});

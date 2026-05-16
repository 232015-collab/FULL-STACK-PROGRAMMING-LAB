'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw, FiTool } from 'react-icons/fi';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const categories = [
  {
    name: 'Chairs',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80',
    count: 'View all'
  },
  {
    name: 'Beds',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80',
    count: 'View all'
  },
  {
    name: 'Tables',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    count: 'View all'
  },
];

const features = [
  { icon: FiTruck, title: 'Free Delivery', desc: 'On orders over Rs. 5,000', color: 'text-orange-500' },
  { icon: FiShield, title: 'Quality Guaranteed', desc: 'Solid wood construction', color: 'text-orange-500' },
  { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day hassle-free returns', color: 'text-orange-500' },
  { icon: FiTool, title: 'Assembly Help', desc: 'Professional installation', color: 'text-orange-500' },
];

const brands = ['fib', 'Sainsurys', 'Tesco', 'Amara', 'Debenhams', 'Habitat'];

const SLIDER_IMAGES = [
  {
    headline: 'Handcrafted',
    sub: 'Solid Wood Furniture',
    tag: 'New Collection 2025',
    price: 'Rs. 12,500',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80',
    cta: '/products?category=Sofas',
  },
  {
    headline: 'Premium Chairs',
    sub: 'Comfort & Style',
    tag: 'Best Sellers',
    price: 'From Rs. 4,500',
    img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=700&q=80',
    cta: '/products?category=Chairs',
  },
  {
    headline: 'Luxury Beds',
    sub: 'Sleep in Style',
    tag: 'Sale — Up to 30% Off',
    price: 'From Rs. 22,000',
    img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=700&q=80',
    cta: '/products?category=Beds',
  },
];

const latestCollectionImgs = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80',
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    axios.get(`${API}/products?featured=true`)
      .then(res => setFeatured(res.data.products?.slice(0, 8) || []))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDER_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const current = SLIDER_IMAGES[slide];

  return (
    <div>
      {/* ── Hero Slider ── */}
      <section className="bg-white border-b border-gray-100 overflow-hidden relative" style={{ minHeight: '420px' }}>
        {/* Orange diagonal accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-orange-50 hidden lg:block" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-16">
            {/* Text */}
            <div className="animate-fade-in">
              <div className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded mb-4 uppercase tracking-wider">
                {current.tag}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight mb-2">
                {current.headline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-light mb-4">{current.sub}</p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black text-orange-500">{current.price}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link href={current.cta} className="btn-primary inline-flex items-center gap-2">
                  Shop Now <FiArrowRight />
                </Link>
                <Link href="/products" className="btn-outline">
                  Browse All
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square">
                <img
                  key={slide}
                  src={current.img}
                  alt={current.headline}
                  className="w-full h-full object-cover rounded-lg shadow-lg animate-fade-in"
                />
              </div>
            </div>
          </div>

          {/* Slide Dots */}
          <div className="flex justify-center gap-2 pb-6">
            {SLIDER_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === slide ? 'bg-orange-500 w-6' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section className="bg-gray-800 text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-center gap-3">
                <Icon className={`${color} text-2xl flex-shrink-0`} />
                <div>
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="section-title orange-underline">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/products?category=${cat.name}`}
                className="group relative overflow-hidden rounded shadow hover:shadow-md transition-all duration-300 bg-white">
                <div className="aspect-video overflow-hidden">
                  <img src={cat.image} alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                  <span className="text-orange-300 text-sm font-medium">{cat.count} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title orange-underline">Featured Products</h2>
            </div>
            <Link href="/products?featured=true" className="text-orange-500 hover:text-orange-700 text-sm font-semibold flex items-center gap-1 transition-colors">
              View All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="card h-72 animate-pulse bg-gray-100">
                  <div className="h-44 bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/products" className="btn-secondary inline-flex items-center gap-2">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sale Banner ── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Living Room */}
            <div className="relative overflow-hidden rounded shadow group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
                alt="New Collection"
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-5">
                <div>
                  <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Exclusive</p>
                  <h3 className="text-white text-xl font-bold mb-2">New Collection</h3>
                  <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded inline-flex items-center gap-1 transition-colors">
                    Shop Now <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sale Off */}
            <div className="relative overflow-hidden rounded shadow group cursor-pointer bg-gray-900 flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-gray-300 text-sm uppercase tracking-widest mb-2">Limited Time</p>
                <h3 className="text-white text-5xl font-black mb-1">Sale Off</h3>
                <div className="text-orange-400 text-7xl font-black leading-none">50%</div>
                <p className="text-gray-400 text-sm mt-3 mb-4">On selected bedroom & living room furniture</p>
                <Link href="/products" className="btn-primary inline-flex items-center gap-2 text-sm">
                  Grab Deal <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Buy Online Banner ── */}
      <section className="py-6 bg-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wide">BUY ONLINE</h2>
            <p className="text-gray-700 text-sm font-medium">SAME GREAT FACTORY STORE SYSTEM — DELIVERED TO YOUR DOOR</p>
          </div>
          <div className="flex gap-3">
            <Link href="/products" className="bg-gray-900 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded text-sm transition-colors inline-flex items-center gap-2">
              Shop Online <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Collection ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title" style={{ display: 'inline-block' }}>Latest Collection</h2>
            <p className="text-gray-500 text-sm mt-2">Explore our newest arrivals in premium furniture</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestCollectionImgs.map((img, i) => (
              <Link key={i} href="/products" className="group overflow-hidden rounded shadow block">
                <div className="aspect-video overflow-hidden">
                  <img src={img} alt={`Collection ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-6 font-semibold">Trusted Brands & Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brands.map((brand) => (
              <div key={brand} className="text-gray-400 hover:text-orange-500 font-bold text-lg transition-colors cursor-default tracking-wide">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

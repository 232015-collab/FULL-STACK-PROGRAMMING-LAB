'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiArrowLeft, FiStar, FiTruck, FiShield, FiMinus, FiPlus, FiPackage, FiRefreshCw } from 'react-icons/fi';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios.get(`${API}/products/${id}`)
      .then(res => setProduct(res.data.product))
      .catch(() => router.push('/products'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${qty}x ${product.name.substring(0, 25)}... added to cart!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <FiStar key={i} className={`text-lg ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
  ));

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading product...</p>
      </div>
    </div>
  );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-orange-500 transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-orange-500 transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Product Image */}
          <div className="bg-white border border-gray-100 shadow-sm rounded p-4">
            <div className="relative aspect-square rounded overflow-hidden bg-gray-50 product-img-wrap">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-3 left-3 sale-badge">-{discount}% OFF</div>
              )}
              {product.isFeatured && (
                <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-semibold px-2 py-0.5 rounded-sm">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-5">
            {/* Category & Brand */}
            <div>
              <span className="text-xs text-orange-500 font-semibold uppercase tracking-widest">
                {product.category} · {product.brand}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600 font-medium">{product.rating} / 5</span>
              <span className="text-sm text-gray-400">({product.numReviews} reviews)</span>
            </div>

            {/* Price Box */}
            <div className="bg-orange-50 border border-orange-100 rounded p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-gray-800">Rs. {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {discount && (
                <p className="text-green-600 font-semibold text-xs mt-1">
                  You save Rs. {(product.originalPrice - product.price).toLocaleString()} ({discount}% OFF)
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <FiPackage className={product.stock > 0 ? 'text-green-500' : 'text-red-500'} />
              <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock — ${product.stock} available` : 'Out of Stock'}
              </span>
            </div>

            {/* Qty + CTA */}
            {product.stock > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors">
                      <FiMinus className="text-xs" />
                    </button>
                    <span className="px-5 py-2 font-semibold text-gray-800 border-x border-gray-300 min-w-12 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors">
                      <FiPlus className="text-xs" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded font-bold text-white transition-all duration-300 text-sm ${
                      added
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-orange-500 hover:bg-orange-600 hover:shadow-md'
                    }`}>
                    <FiShoppingCart />
                    {added ? 'Added to Cart ✓' : `Add to Cart — Rs. ${(product.price * qty).toLocaleString()}`}
                  </button>
                  <Link href="/cart"
                    className="px-5 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded font-semibold transition-all duration-200 text-sm flex items-center">
                    View Cart
                  </Link>
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              {[
                { icon: FiTruck, text: 'Free Delivery', sub: 'Orders over Rs. 5,000', color: 'text-orange-500' },
                { icon: FiShield, text: 'Quality Guaranteed', sub: 'Solid wood construction', color: 'text-orange-500' },
                { icon: FiRefreshCw, text: 'Easy Returns', sub: '30-day return policy', color: 'text-orange-500' },
                { icon: FiPackage, text: 'Warranty', sub: '1-year manufacturer warranty', color: 'text-orange-500' },
              ].map(({ icon: Icon, text, sub, color }) => (
                <div key={text} className="flex items-center gap-2.5 p-3 bg-gray-50 border border-gray-100 rounded">
                  <Icon className={`${color} flex-shrink-0`} />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{text}</div>
                    <div className="text-xs text-gray-400">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 pt-5 border-t border-gray-200">
          <button onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">
            <FiArrowLeft /> Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

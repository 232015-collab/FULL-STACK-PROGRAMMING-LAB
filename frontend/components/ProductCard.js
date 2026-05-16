'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`Added to cart!`, { icon: '🛒' });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} className={`text-xs ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
    ));

  return (
    <Link href={`/products/${product._id}`} className="group block bg-white border border-gray-100 rounded shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300">
      {/* Image — fixed height, not percentage */}
      <div className="relative overflow-hidden bg-gray-50 rounded-t" style={{ height: '200px' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />
        {/* Discount Badge */}
        {discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-semibold px-2 py-0.5 rounded-sm">
            Sold Out
          </span>
        )}
        {/* Quick View hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-white text-gray-800 px-4 py-2 text-xs font-semibold shadow-lg rounded-sm">
            <FiEye className="text-orange-500" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3">
        {/* Category */}
        <p className="text-xs text-orange-500 font-medium uppercase tracking-wide mb-1">{product.category}</p>

        {/* Name */}
        <h3 className="text-gray-800 font-semibold text-sm leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors mb-1" style={{ minHeight: '36px' }}>
          {product.name}
        </h3>

        {/* Brand */}
        <p className="text-xs text-gray-400 mb-2">{product.brand}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Basket Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded transition-all duration-200 ${
            product.stock === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          <FiShoppingCart className="text-xs" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Basket'}
        </button>
      </div>
    </Link>
  );
}

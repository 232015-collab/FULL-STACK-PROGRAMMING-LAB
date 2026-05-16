'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiShield, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, dispatch, totalItems, totalPrice } = useCart();

  const updateQty = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const removeItem = (id, name) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success(`Item removed`);
  };
  const clearCart = () => { dispatch({ type: 'CLEAR_CART' }); toast.success('Cart cleared'); };

  const shipping = totalPrice >= 5000 ? 0 : 350;
  const grandTotal = totalPrice + shipping;

  if (cart.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center py-24 animate-fade-in">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added any furniture yet.</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <FiShoppingBag /> Browse Furniture
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <span>/</span>
            <span className="text-gray-700">Shopping Cart</span>
          </div>
          <h1 className="text-2xl font-black text-gray-800">Shopping Cart
            <span className="text-orange-500 ml-2 text-lg">({totalItems} items)</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">{totalItems} items in your cart</span>
              <button onClick={clearCart}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                <FiTrash2 /> Clear All
              </button>
            </div>

            {cart.map((item) => (
              <div key={item._id} className="bg-white border border-gray-100 shadow-sm rounded p-4 flex gap-4 items-start animate-fade-in">
                <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-50 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-orange-500 font-medium uppercase">{item.category}</p>
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug mt-0.5 line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{item.brand}</p>
                  <p className="text-base font-bold text-gray-900 mt-2">Rs. {item.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  {/* Qty Control */}
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button onClick={() => updateQty(item._id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors">
                      <FiMinus className="text-xs text-gray-600" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-bold text-gray-800 border-x border-gray-300 min-w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item._id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors">
                      <FiPlus className="text-xs text-gray-600" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-orange-600">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => removeItem(item._id, item.name)}
                    className="text-gray-400 hover:text-red-500 transition-colors">
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
            ))}

            <Link href="/products" className="flex items-center gap-2 text-orange-500 hover:text-orange-700 font-medium text-sm mt-4 transition-colors">
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-gray-100 shadow-sm rounded p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400 bg-orange-50 border border-orange-100 rounded p-2">
                    Add Rs. {(5000 - totalPrice).toLocaleString()} more for free delivery!
                  </p>
                )}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-gray-900 font-black text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">Rs. {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout"
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2 text-center text-sm">
                Proceed to Checkout
              </Link>

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                {[
                  { icon: FiShield, text: 'Secure & Encrypted Checkout', color: 'text-green-500' },
                  { icon: FiTruck, text: 'Free Delivery on orders over Rs. 5,000', color: 'text-orange-500' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-400">
                    <Icon className={`${color} flex-shrink-0`} /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

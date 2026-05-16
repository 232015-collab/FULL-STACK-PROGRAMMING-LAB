'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiShoppingBag, FiUser, FiMail, FiMapPin, FiCreditCard } from 'react-icons/fi';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function CheckoutPage() {
  const { cart, dispatch, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    customerName: '', email: '', street: '', city: '', paymentMethod: 'Cash on Delivery'
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const shipping = totalPrice >= 5000 ? 0 : 350;
  const grandTotal = totalPrice + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) { toast.error('Your cart is empty!'); return; }
    setLoading(true);
    try {
      const orderData = {
        customerName: form.customerName,
        email: form.email,
        address: { street: form.street, city: form.city, country: 'Pakistan' },
        orderItems: cart.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        totalPrice: grandTotal,
        paymentMethod: form.paymentMethod,
      };
      const res = await axios.post(`${API}/orders`, orderData);
      setOrderId(res.data.order._id);
      dispatch({ type: 'CLEAR_CART' });
      setSuccess(true);
      toast.success('Order placed successfully! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center py-24">
        <div className="text-6xl mb-4">🪑</div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">Your cart is empty</h2>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2 mt-4">
          <FiShoppingBag /> Browse Furniture
        </Link>
      </div>
    </div>
  );

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white border border-gray-100 shadow rounded p-10 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <FiCheckCircle className="text-green-500 text-3xl" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Order Confirmed! 🎉</h2>
        <p className="text-gray-500 text-sm mb-4">Thank you! Your furniture order has been placed and is being processed.</p>
        {orderId && (
          <div className="bg-orange-50 border border-orange-100 rounded p-3 mb-6">
            <p className="text-xs text-gray-400">Order ID</p>
            <p className="text-sm font-mono font-bold text-gray-800 break-all">{orderId}</p>
          </div>
        )}
        <div className="space-y-3">
          <Link href="/products" className="btn-primary w-full flex items-center justify-center gap-2">
            <FiShoppingBag /> Continue Shopping
          </Link>
          <Link href="/" className="btn-outline w-full flex items-center justify-center text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-orange-500">Cart</Link>
            <span>/</span>
            <span className="text-gray-700">Checkout</span>
          </div>
          <h1 className="text-2xl font-black text-gray-800">Checkout</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left: Form */}
            <div className="space-y-5">
              {/* Customer Info */}
              <div className="bg-white border border-gray-100 shadow-sm rounded p-5">
                <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <FiUser className="text-orange-500" /> Customer Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input name="customerName" value={form.customerName} onChange={handleChange}
                      required placeholder="Sundas Maria Hayat" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      required placeholder="sundas@email.com" className="input-field" />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white border border-gray-100 shadow-sm rounded p-5">
                <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <FiMapPin className="text-orange-500" /> Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                    <input name="street" value={form.street} onChange={handleChange}
                      required placeholder="House 12, Street 5, F-7/3" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <input name="city" value={form.city} onChange={handleChange}
                      required placeholder="Islamabad" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <input value="Pakistan" disabled className="input-field opacity-60 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white border border-gray-100 shadow-sm rounded p-5">
                <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <FiCreditCard className="text-orange-500" /> Payment Method
                </h2>
                <div className="space-y-2.5">
                  {['Cash on Delivery', 'JazzCash', 'EasyPaisa', 'Credit / Debit Card'].map((method) => (
                    <label key={method} className={`flex items-center gap-3 p-3.5 rounded border-2 cursor-pointer transition-all ${
                      form.paymentMethod === method ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input type="radio" name="paymentMethod" value={method}
                        checked={form.paymentMethod === method} onChange={handleChange} className="text-orange-500 w-4 h-4" />
                      <span className="font-medium text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="bg-white border border-gray-100 shadow-sm rounded p-5 sticky top-6">
                <h2 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide border-b border-gray-100 pb-3">
                  Order Summary ({cart.length} items)
                </h2>
                <div className="space-y-2.5 max-h-64 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-800 font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-800 flex-shrink-0">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-black text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-orange-600">Rs. {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className={`btn-primary w-full mt-5 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Placing Order...</>
                  ) : (
                    <><FiCheckCircle /> Place Order — Rs. {grandTotal.toLocaleString()}</>
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const footerCategories = ['Chairs', 'Sofas', 'Beds', 'Tables', 'Cabinets', 'Outdoor'];
const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  { href: '/cart', label: 'Shopping Cart' },
  { href: '/checkout', label: 'Checkout' },
];
const infoLinks = [
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Delivery Info' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Return Policy' },
  { href: '#', label: 'Terms & Conditions' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-black text-white">
                Rustik <span className="text-orange-400">Plant</span>
              </h2>
              <p className="text-xs text-gray-400 tracking-widest uppercase">Premium Furniture</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Handcrafted furniture made from sustainably sourced solid wood. Quality that lasts a lifetime. Delivered to your door across Pakistan.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-700 hover:bg-orange-500 rounded flex items-center justify-center transition-colors duration-200">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Our Categories</h3>
            <ul className="space-y-2">
              {footerCategories.map(cat => (
                <li key={cat}>
                  <Link href={`/products?category=${cat}`}
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 mb-6">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 border-b border-gray-700 pb-2">Information</h3>
            <ul className="space-y-2">
              {infoLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Shop No. 12, Furniture Market,<br />Blue Area, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-orange-400 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-orange-400 flex-shrink-0" />
                <span>info@rustikplant.com</span>
              </li>
            </ul>
            <div className="mt-6 bg-gray-700 rounded p-4">
              <p className="text-xs text-gray-400 mb-2 font-semibold">Store Hours</p>
              <p className="text-xs text-gray-300">Mon – Sat: 9:00am – 6:00pm</p>
              <p className="text-xs text-gray-300">Sunday: Closed</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2025 Rustik Plant. All rights reserved. | Developed by <span className="text-orange-400 font-semibold">Sundas Maria Hayat (232015)</span></p>
          <p>MERN Stack App — Next.js + Node.js + Express.js + MongoDB</p>
        </div>
      </div>
    </footer>
  );
}

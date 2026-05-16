'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiPhone, FiMail, FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Chairs', 'Sofas', 'Beds', 'Tables', 'Cabinets', 'Outdoor'];

export default function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [showCats, setShowCats] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="top-bar hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><FiPhone className="text-orange-400 text-xs" /> +92 300 1234567</span>
            <span className="flex items-center gap-1.5"><FiMail className="text-orange-400 text-xs" /> info@rustikplant.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free delivery on orders over Rs. 5,000</span>
            <span className="text-orange-400">|</span>
            <span>Mon-Sat: 9am - 6pm</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-gray-800 tracking-tight">
                  Rustik <span className="text-orange-500">Plant</span>
                </span>
                <span className="text-[9px] text-gray-400 font-medium tracking-widest uppercase">Premium Furniture</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="nav-link">Home</Link>
              <div className="relative group" onMouseEnter={() => setShowCats(true)} onMouseLeave={() => setShowCats(false)}>
                <button className="nav-link flex items-center gap-1">
                  Products <FiChevronDown className="text-xs" />
                </button>
                {showCats && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-lg rounded py-2 min-w-[160px] z-50 animate-fade-in">
                    <Link href="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium">All Products</Link>
                    {CATEGORIES.map(cat => (
                      <Link key={cat} href={`/products?category=${cat}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/products?category=Chairs" className="nav-link">Chairs</Link>
              <Link href="/products?category=Sofas" className="nav-link">Sofas</Link>
              <Link href="/products?category=Beds" className="nav-link">Beds</Link>
              <Link href="/products?category=Tables" className="nav-link">Tables</Link>
              <Link href="/products?category=Cabinets" className="nav-link">Cabinets</Link>
              <Link href="/products?category=Outdoor" className="nav-link">Outdoor</Link>
            </div>

            {/* Search + Cart */}
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="hidden md:flex">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-orange-400 transition-colors">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search furniture..."
                    className="pl-3 pr-2 py-2 text-sm outline-none w-44 bg-white"
                  />
                  <button type="submit" className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                    <FiSearch className="text-sm" />
                  </button>
                </div>
              </form>

              <Link href="/cart" id="cart-btn" className="relative flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors">
                <FiShoppingCart className="text-base" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700">
                {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in">
            <form onSubmit={handleSearch} className="flex gap-2 p-4 border-b border-gray-100">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search furniture..." className="input-field text-sm py-2" />
              <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Go</button>
            </form>
            <div className="py-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'All Products' },
                { href: '/products?category=Chairs', label: 'Chairs' },
                { href: '/products?category=Sofas', label: 'Sofas' },
                { href: '/products?category=Beds', label: 'Beds' },
                { href: '/products?category=Tables', label: 'Tables' },
                { href: '/cart', label: `Cart (${totalItems})` },
              ].map(link => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-b border-gray-50">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

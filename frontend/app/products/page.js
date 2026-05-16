'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { FiSearch, FiX } from 'react-icons/fi';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const CATEGORIES = ['All', 'Chairs', 'Sofas', 'Beds', 'Tables', 'Cabinets', 'Outdoor'];
const SORT_OPTIONS = [
  { label: 'Newest First', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [total, setTotal] = useState(0);

  // ✅ FIX: Sync state whenever URL searchParams change (e.g. clicking navbar links)
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const src = searchParams.get('search') || '';
    setCategory(cat);
    setSearch(src);
    setSearchInput(src);
  }, [searchParams]);

  // Fetch products when filters change
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (sort) params.append('sort', sort);
    if (search) params.append('search', search);

    axios.get(`${API}/products?${params}`)
      .then(res => { setProducts(res.data.products || []); setTotal(res.data.count || 0); })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, sort, search]);

  const handleSearch = (e) => { e.preventDefault(); setSearch(searchInput); };
  const clearFilters = () => { setCategory('All'); setSort(''); setSearch(''); setSearchInput(''); };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">{category !== 'All' ? category : 'All Products'}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-800">
            {category !== 'All' ? category : search ? `Results for "${search}"` : 'All Furniture'}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{total} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 border-b border-gray-200">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`flex-shrink-0 text-sm font-medium px-4 py-1.5 rounded transition-all duration-200 ${
                category === cat
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-orange-400 hover:text-orange-500'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search furniture..." className="input-field pl-9 py-2.5 text-sm" />
            </div>
            <button type="submit" className="px-4 py-2.5 bg-orange-500 text-white rounded text-sm font-semibold hover:bg-orange-600 transition-colors">
              Search
            </button>
          </form>

          <div className="flex items-center gap-3">
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white cursor-pointer">
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            {(category !== 'All' || sort || search) && (
              <button onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2.5 bg-orange-50 text-orange-600 rounded border border-orange-200 hover:bg-orange-100 text-sm font-medium">
                <FiX className="text-xs" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded shadow-sm animate-pulse">
                <div className="h-44 bg-gray-200 rounded-t" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded shadow">
            <div className="text-6xl mb-4">🪑</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No furniture found</h3>
            <p className="text-gray-500 text-sm mb-5">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-gray-400">Loading furniture...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

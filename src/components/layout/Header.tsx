import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, User, Search } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Badge from '../ui/Badge';
import { getCategories } from '../../data/products';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { getCartCount } = useCart();
  const categories = getCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isSticky ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-800">
            LuxeShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium flex items-center">
                Categories
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium">
              All Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, Wishlist, Account */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-1 rounded-full text-sm border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
              <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-gray-400" />
            </form>
            
            <Link to="/wishlist" className="text-gray-700 hover:text-primary-600">
              <Heart size={20} />
            </Link>
            
            <Link to="/account" className="text-gray-700 hover:text-primary-600">
              <User size={20} />
            </Link>
            
            <Link to="/cart" className="text-gray-700 hover:text-primary-600 relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="text-gray-700 hover:text-primary-600 relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-in origin-top">
          <div className="px-4 py-2">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-lg text-sm border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 py-2 hover:text-primary-600 font-medium">
                Home
              </Link>
              <div className="border-b border-gray-200 py-2">
                <div className="text-gray-700 font-medium mb-2">Categories</div>
                <div className="pl-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="block text-gray-600 hover:text-primary-600"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/products" className="text-gray-700 py-2 hover:text-primary-600 font-medium">
                All Products
              </Link>
              <Link to="/wishlist" className="text-gray-700 py-2 hover:text-primary-600 font-medium flex items-center">
                <Heart size={18} className="mr-2" /> Wishlist
              </Link>
              <Link to="/account" className="text-gray-700 py-2 hover:text-primary-600 font-medium flex items-center">
                <User size={18} className="mr-2" /> My Account
              </Link>
              <Link to="/about" className="text-gray-700 py-2 hover:text-primary-600 font-medium">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 py-2 hover:text-primary-600 font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
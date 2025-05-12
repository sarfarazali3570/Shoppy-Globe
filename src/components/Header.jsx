import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  
  // Check if we're on mobile
  const isMobile = window.innerWidth < 768;
  
  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center">
              <ShoppingCart className="h-6 w-6 mr-2 text-accent" />
              ShoppyGlobe
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 text-sm font-medium ${location.pathname === '/' ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Home
              </Link>
              <Link 
                to="#products" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-accent"
              >
                Products
              </Link>
              <Link 
                to="/categories" 
                className={`px-3 py-2 text-sm font-medium ${location.pathname === '/categories' ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 text-sm font-medium ${location.pathname === '/about' ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 text-sm font-medium ${location.pathname === '/contact' ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Contact
              </Link>
            </nav>
          )}
          
          {/* Desktop Search */}
          {!isMobile && (
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          )}
          
          {/* Right Icons */}
          <div className="flex items-center">
            {/* Mobile Search Toggle */}
            {isMobile && (
              <button 
                onClick={toggleSearch}
                className="p-1 rounded-full text-gray-700 hover:text-accent focus:outline-none"
              >
                <span className="sr-only">Search</span>
                <Search className="h-6 w-6" />
              </button>
            )}
            
            {/* Cart Icon */}
            <Link to="/cart" className="ml-4 relative p-1 rounded-full text-gray-700 hover:text-accent focus:outline-none">
              <span className="sr-only">View shopping cart</span>
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="ml-4 p-1 rounded-md text-gray-700 hover:text-accent focus:outline-none"
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {isMobile && searchOpen && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-4 border-t border-gray-100 bg-white">
              <Link 
                to="/" 
                className={`block px-4 py-2 text-base font-medium ${location.pathname === '/' ? 'text-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Home
              </Link>
              <Link 
                to="#products" 
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-accent"
              >
                Products
              </Link>
              <Link 
                to="/categories" 
                className={`block px-4 py-2 text-base font-medium ${location.pathname === '/categories' ? 'text-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className={`block px-4 py-2 text-base font-medium ${location.pathname === '/about' ? 'text-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`block px-4 py-2 text-base font-medium ${location.pathname === '/contact' ? 'text-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
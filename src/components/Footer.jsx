import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold flex items-center mb-4">
              <ShoppingCart className="h-6 w-6 mr-2 text-accent" />
              ShoppyGlobe
            </Link>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for all your shopping needs. Browse our wide range of products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">Products</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">123 Shopping St, Commerce City, CO 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-white">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a href="mailto:info@shoppyglobe.com" className="text-gray-400 hover:text-white">info@shoppyglobe.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
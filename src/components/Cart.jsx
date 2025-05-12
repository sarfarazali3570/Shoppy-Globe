import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import CartItem from './CartItem';
import { clearCart } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Handle clearing the cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };
  
  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-4 rounded-full">
            <ShoppingCart size={40} className="text-gray-400" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Shopping Cart ({cartItems.length} items)</h2>
            <button 
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (7%)</span>
              <span>${(subtotal * 0.07).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex justify-between font-bold mb-6">
              <span>Total</span>
              <span>${(subtotal + (subtotal * 0.07)).toFixed(2)}</span>
            </div>
            
            <Link 
              to="/checkout" 
              className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
            >
              Proceed to Checkout
            </Link>
            
            <Link 
              to="/" 
              className="block w-full text-primary hover:text-primary/90 font-medium py-2 mt-2 text-center"
            >
              Continue Shopping
            </Link>
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="flex items-start text-xs text-gray-500">
              <AlertCircle size={16} className="mr-2 flex-shrink-0 mt-0.5" />
              <p>
                Shipping costs and taxes calculated at checkout. Delivery times may vary based on your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
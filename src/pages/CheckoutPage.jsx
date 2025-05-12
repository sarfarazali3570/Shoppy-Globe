import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-yellow-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="mb-4">Add some products to your cart to proceed with checkout.</p>
          <Link to="/" className="inline-block bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="divide-y">
                {cartItems.map(item => (
                  <div key={item.id} className="py-4 flex items-center">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Customer Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Payment Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(cartTotal * 0.07).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(cartTotal + (cartTotal * 0.07)).toFixed(2)}</span>
                </div>
              </div>
              <button 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Place Order
              </button>
              <Link to="/cart" className="block text-center mt-4 text-primary hover:text-primary/90">
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
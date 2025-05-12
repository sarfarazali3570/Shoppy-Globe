import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
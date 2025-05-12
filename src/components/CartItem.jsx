import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';
import { updateCartItemQuantity, removeFromCart } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  // Format price to include 2 decimal places
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Calculate item total
  const itemTotal = item.price * item.quantity;
  
  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    
    dispatch(updateCartItemQuantity({ id: item.id, quantity: newQuantity }));
  };
  
  // Handle remove item
  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
  };
  
  return (
    <div className="p-4 flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
        <Link to={`/product/${item.id}`}>
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="w-full sm:w-24 h-24 object-cover rounded-md"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <Link to={`/product/${item.id}`}>
              <h3 className="font-medium text-gray-800 hover:text-primary mb-1">{item.title}</h3>
            </Link>
            <p className="text-sm text-gray-500 mb-2">
              {item.brand} | {item.category}
            </p>
            <p className="text-sm text-gray-800 font-medium mb-4">
              {formatPrice(item.price)}
            </p>
          </div>
          
          <div className="flex flex-row sm:flex-col items-center sm:items-end">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-200 rounded-lg mb-2">
              <button 
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="px-2 py-1 text-gray-600 hover:text-primary"
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-2 py-1 border-x border-gray-200">{item.quantity}</span>
              <button 
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:text-primary"
              >
                <Plus size={16} />
              </button>
            </div>
            
            {/* Item Total */}
            <div className="text-right">
              <span className="font-medium">{formatPrice(itemTotal)}</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleRemoveItem}
            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
          >
            <Trash size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Star, ShoppingCart } from 'lucide-react';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  
  // Format price to include 2 decimal places
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Calculate discounted price
  const calculateDiscountedPrice = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold rounded-full px-2 py-1">
              {Math.round(product.discountPercentage)}% OFF
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-800 hover:text-accent truncate">{product.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{product.description}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                  className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div>
              {product.discountPercentage > 0 ? (
                <div className="flex items-center">
                  <span className="font-bold text-lg text-gray-800">
                    {formatPrice(calculateDiscountedPrice(product.price, product.discountPercentage))}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-lg text-gray-800">{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
        </Link>
        
        <button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
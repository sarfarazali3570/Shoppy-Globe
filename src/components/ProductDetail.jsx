import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  RotateCcw, 
  Shield, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { addToCart } from '../store/cartSlice';

const ProductDetail = ({ productId }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProductDetail();
  }, [productId]);
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product }));
      // Optionally, show a success message
      alert(`${product.title} added to cart!`);
    }
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
  
  // Loading skeleton
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg h-96"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4 my-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-12 bg-gray-200 rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-lg text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-2" />
        <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
        <p className="mb-4">We couldn't load the product details. Please try again.</p>
        <button 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  // If product is loaded
  if (!product) {
    return null;
  }
  
  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex mb-4 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
        <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
        <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-primary">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
        <span className="text-gray-700">{product.title}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title} 
              className="w-full h-96 object-contain"
            />
          </div>
          
          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer border rounded overflow-hidden ${selectedImage === index ? 'border-primary' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} - thumbnail ${index + 1}`} 
                    className="w-full h-16 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">{product.title}</h1>
            
            {/* Rating */}
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
              <span className="text-sm text-gray-500 ml-1">({product.rating} stars)</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">In Stock: {product.stock} units</span>
            </div>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            {product.discountPercentage > 0 ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-800">
                  {formatPrice(calculateDiscountedPrice(product.price, product.discountPercentage))}
                </span>
                <div className="ml-4">
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-2 bg-accent text-white text-sm font-bold rounded-full px-2 py-1">
                    {Math.round(product.discountPercentage)}% OFF
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-800">{formatPrice(product.price)}</span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <input 
                type="number" 
                className="w-16 text-center py-1 border-y border-gray-300"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
            <button className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </button>
            <button className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors sm:w-auto">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm">30-Day Returns</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm">Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import React from 'react';
import { useSelector } from 'react-redux';
import useProductList from '../hooks/useProductList';
import ProductItem from './ProductItem';
import { Search, AlertCircle, Home, Smartphone, Shirt, MoreHorizontal } from 'lucide-react';

const ProductList = () => {
  const { products, isLoading, isError } = useProductList();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  
  const filteredProducts = searchQuery 
    ? products?.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const LoadingSkeleton = () => (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2 shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 shimmer"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 shimmer"></div>
              <div className="h-8 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="bg-red-50 text-red-700 p-6 rounded-xl text-center animate-fade-in">
      <AlertCircle className="h-12 w-12 mx-auto mb-2" />
      <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
      <p className="mb-4">We couldn't load the products. Please try again.</p>
      <button 
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" 
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );

  const EmptyResults = () => (
    <div className="text-center py-12 animate-fade-in">
      <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-bold mb-2">No products found</h3>
      <p className="text-gray-500 mb-4">We couldn't find any products matching your search.</p>
      <button 
        className="text-primary hover:text-primary/90 font-medium" 
        onClick={() => window.location.reload()}
      >
        Clear search
      </button>
    </div>
  );

  return (
    <section className="mb-10">
      {/* Banner/Hero Section */}
      <div className="bg-blue-500 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-black mb-6 md:mb-0 md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h1>
          <p className="text-blue-900 mb-6">Get up to 50% off on our latest products. Limited time offer!</p>
          <button className="bg-white text-primary font-medium hover:bg-gray-100 py-2 px-6 rounded-lg">
            Shop Now
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
            alt="Summer sale shopping items" 
            className="rounded-lg max-h-52 object-cover" 
          />
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-50 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition">
          <Smartphone className="text-accent h-6 w-6 mb-2" />
          <span className="font-medium">Electronics</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition">
          <Shirt className="text-blue-500 h-6 w-6 mb-2" />
          <span className="font-medium">Fashion</span>
        </div>
        <div className="bg-green-50 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition">
          <Home className="text-green-500 h-6 w-6 mb-2" />
          <span className="font-medium">Home</span>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition">
          <MoreHorizontal className="text-purple-500 h-6 w-6 mb-2" />
          <span className="font-medium">More</span>
        </div>
      </div>
      
      {/* Product List Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">All Products</h2>
          <p className="text-gray-500">
            {filteredProducts ? filteredProducts.length : 0} products available
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
          <select 
            id="sort" 
            className="bg-white border border-gray-200 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      {/* Loading, Error, Empty States or Product Grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorDisplay />
      ) : filteredProducts && filteredProducts.length === 0 ? (
        <EmptyResults />
      ) : (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          
          {/* Pagination - Static for now */}
          <div className="flex justify-center mt-10">
            <nav className="flex items-center space-x-1">
              <button className="h-8 w-8 rounded-md border border-gray-300 flex items-center justify-center">
                <span className="sr-only">Go to previous page</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="h-8 w-8 rounded-md bg-primary text-white flex items-center justify-center">1</button>
              <button className="h-8 w-8 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center">2</button>
              <button className="h-8 w-8 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center">3</button>
              <button className="h-8 w-8 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center">4</button>
              <button className="h-8 w-8 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center">5</button>
              <button className="h-8 w-8 rounded-md border border-gray-300 flex items-center justify-center">
                <span className="sr-only">Go to next page</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
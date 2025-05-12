import { useState, useEffect } from 'react';

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    isError,
    error,
  };
};

export default useProductList;
import { useState, useEffect } from 'react';

const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return {
    product,
    isLoading,
    isError,
    error,
  };
};

export default useProductDetail;
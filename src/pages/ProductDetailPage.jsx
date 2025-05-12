import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto px-4">
      <ProductDetail productId={id} />
    </div>
  );
};

export default ProductDetailPage;
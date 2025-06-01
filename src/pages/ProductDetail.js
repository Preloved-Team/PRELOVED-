import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Product Details</h2>
      <p>Product ID: {id}</p>
      <p>This is a placeholder for detailed product information.</p>
    </div>
  );
};

export default ProductDetail;

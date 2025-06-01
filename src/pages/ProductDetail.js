import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  // You can fetch real product data here using `id` in the future
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Product Details</h2>
      <p className="text-gray-600 mb-4">Product ID: {id}</p>
      <div className="border p-4 rounded shadow">
        <p>This is where full product details like images, price, seller info, and description will appear.</p>
      </div>
    </div>
  );
};

export default ProductDetail;

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const product = products.find((item) => item.id.toString() === id);

  if (!product) return <div className="p-6">Product not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.image} alt={product.name} className="w-full object-cover rounded shadow" />
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-700 mt-2 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <button
            onClick={() => addToCart(product.id)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

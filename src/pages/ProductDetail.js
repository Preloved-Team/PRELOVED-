import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const product = products.find((item) => item.id.toString() === id);

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success(`${product.name} added to cart!`);
  };

  if (!product)
    return (
      <div className="p-10 text-center text-xl text-gray-600">
        ❌ Product not found.
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded-md shadow-lg object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>

            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Condition:</strong> {product.condition || 'Good'}</p>
              <p><strong>Seller:</strong> Shubham Store</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-2xl font-semibold text-green-700 mb-3">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

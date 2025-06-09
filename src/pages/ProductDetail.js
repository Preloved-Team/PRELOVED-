import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const product = products.find((item) => item.id.toString() === id);

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success(`✅ "${product.name}" added to cart!`);
  };

  if (!product) {
    return (
      <div className="p-10 text-center text-xl text-gray-600">
        ❌ Product not found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10 bg-white rounded-lg shadow">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> &gt;{' '}
        <Link to="/BuyerDashboard" className="hover:underline">Shop</Link> &gt;{' '}
        <span className="text-gray-700">{product.name}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg max-w-full h-auto shadow-md hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Condition:</strong> {product.condition || 'Used'}</p>
            <p><strong>Seller:</strong> Shubham Store</p>
            <p><strong>Availability:</strong> <span className="text-green-600">In Stock</span></p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400 text-lg">
            {'⭐'.repeat(4)}<span className="text-gray-600 text-sm ml-1">(120 reviews)</span>
          </div>

          {/* Pricing + Action */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-2xl font-semibold text-green-700 mb-3">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products (Placeholder) */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">🔁 You might also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-400 italic">
          <div className="p-6 border rounded">Related product 1</div>
          <div className="p-6 border rounded">Related product 2</div>
          <div className="p-6 border rounded">Related product 3</div>
          <div className="p-6 border rounded">Related product 4</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

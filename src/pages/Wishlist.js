import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    products
  } = useContext(ShopContext);

  const wishlistData = wishlistItems
    .map((id) => products.find((p) => p.id === id))
    .filter((item) => item);

  const handleMoveToCart = (item) => {
    addToCart(item.id);
    removeFromWishlist(item.id);
    toast.success(`✅ "${item.name}" moved to cart!`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaHeart className="text-pink-500" /> Your Wishlist
      </h2>

      {wishlistData.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p className="text-xl mb-4">💔 Your wishlist is empty.</p>
          <Link to="/BuyerDashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              🛍️ Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-green-600 font-medium mb-2">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <Link
                  to={`/product/${item.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

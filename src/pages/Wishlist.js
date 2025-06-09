import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, products } = useContext(ShopContext);

  const wishlistData = wishlistItems
    .map((id) => products.find((p) => p.id === id))
    .filter((item) => item); // filter out nulls if product doesn't exist

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaHeart className="text-pink-500" /> Your Wishlist
      </h2>

      {wishlistData.length === 0 ? (
        <p className="text-gray-600 text-lg">Your wishlist is empty. 💔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistData.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-green-600 font-medium mb-2">${item.price.toFixed(2)}</p>
              <div className="flex justify-between items-center text-sm mt-2">
                <Link
                  to={`/product/${item.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

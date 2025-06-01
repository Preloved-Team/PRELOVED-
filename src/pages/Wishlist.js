import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, products } = useContext(ShopContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlistItems.map((id) => {
            const item = products.find((p) => p.id === id);
            return (
              <div key={id} className="border p-4 rounded shadow">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price}</p>
                <div className="flex justify-between mt-2">
                  <Link to={`/product/${item.id}`} className="text-blue-600">View</Link>
                  <button onClick={() => removeFromWishlist(id)} className="text-red-600">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

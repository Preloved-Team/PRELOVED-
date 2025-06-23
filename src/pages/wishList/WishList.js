import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../Firebase';
import './WishList.css';

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistCollection = collection(db, 'wishlist');
        const wishlistSnapshot = await getDocs(wishlistCollection);
        
        const items = wishlistSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setWishlistItems(items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) return <div>Loading wishlist...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <h3>{item.productID}</h3>
              <p>{item.productName}</p>
              <p>Price: ${item.productPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
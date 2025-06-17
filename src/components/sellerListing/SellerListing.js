import React, { useState, useEffect } from 'react';
import { db } from './../../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './SellerListing.css';

const SellerListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (!user) return;
        
        const listingsRef = collection(db, 'products');
        const q = query(listingsRef, where('sellerId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const listingsData = [];
        querySnapshot.forEach((doc) => {
          listingsData.push({ id: doc.id, ...doc.data() });
        });
        
        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings: ", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [user]);

  if (loading) {
    return <div className="loading-message">Loading your listings...</div>;
  }

  if (listings.length === 0) {
    return <div className="empty-message">You haven't listed any products yet.</div>;
  }

  return (
    <div className="seller-listings-container">
      <h2>Your Listings</h2>
      <table className="listings-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="listing-image"
                />
              </td>
              <td>{listing.name}</td>
              <td>${listing.price}</td>
              <td>{listing.description}</td>
              <td className="actions-cell">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerListings;
import React from 'react';
import './Listing.css';
import Item from '../../Items/Items';
import Products from '../../Assets/Products.json';
import { useNavigate } from 'react-router-dom';

const Listing = () => {
  const navigate = useNavigate();

  return (
    <div className="listing-container">
      <div className="listing-header">
        <h1 className="listing-title">📦 Product Listings</h1>
        <button className="addProduct-bttn" onClick={() => navigate('/AddProduct')}>
          + ADD PRODUCT
        </button>
      </div>

      {Products.length === 0 ? (
        <p className="no-products-msg">No products available.</p>
      ) : (
        <div className="item-listing-grid">
          {Products.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Listing;

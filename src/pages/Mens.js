import React, { useState } from 'react';
import products from '../data/products'; // Your product data
import './Category.css';

const Men = () => {
  // Filter products with category 'men'
  const menProducts = products.filter(product => product.category === 'men');

  // Nearby listings mock data (replace with real data fetching if available)
  const sampleItems = [
    { id: 1, name: "Used Shoes", location: "Auckland" },
    { id: 2, name: "Jeans", location: "Wellington" },
    { id: 3, name: "Leather Jacket", location: "Auckland" },
  ];

  const userLocation = "Auckland";
  const nearbyItems = sampleItems.filter(item => item.location === userLocation);

  // Local state to simulate adding to cart
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="category-container">
      <h2>Men's Collection</h2>

      {/* Products Grid */}
      <div className="product-grid">
        {menProducts.length > 0 ? (
          menProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No men’s products available at the moment.</p>
        )}
      </div>

      {/* Nearby Listings Section */}
      <div
        style={{
          marginTop: '40px',
          padding: '15px',
          backgroundColor: '#ffe4b5',
          color: 'black',
          border: '2px dashed #000',
          borderRadius: '10px'
        }}
      >
        <h3>Nearby Listings in {userLocation}</h3>
        {nearbyItems.length > 0 ? (
          <ul>
            {nearbyItems.map(item => (
              <li key={item.id}>{item.name} – {item.location}</li>
            ))}
          </ul>
        ) : (
          <p>No nearby listings found.</p>
        )}
      </div>
    </div>
  );
};

export default Men;

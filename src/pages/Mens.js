import React from 'react';
import products from '../data/products';
import './Category.css';

const Men = () => {
  const menProducts = products.filter(product => product.category === 'men');

  // 🔸 Nearby listings mock data
  const sampleItems = [
    { id: 1, name: "Used Shoes", location: "Auckland" },
    { id: 2, name: "Jeans", location: "Wellington" },
    { id: 3, name: "Leather Jacket", location: "Auckland" },
  ];

  const userLocation = "Auckland";
  const nearbyItems = sampleItems.filter(item => item.location === userLocation);

  return (
    <div className="category-container">
      <h2>Men's Collection</h2>

      {/* 🔹 Products Grid */}
      <div className="product-grid">
        {menProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* 🔧 Debug: ensure this paragraph appears */}
      <p style={{ color: 'white', fontWeight: 'bold', marginTop: '40px' }}>
        👋 This should be visible — if not, layout is broken.
      </p>

      {/* 📍 Nearby Listings */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#ffe4b5',
        color: 'black',
        border: '2px dashed #000',
        borderRadius: '10px'
      }}>
        <h3>Nearby Listings in {userLocation}</h3>
        <ul>
          {nearbyItems.map(item => (
            <li key={item.id}>{item.name} – {item.location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Men;

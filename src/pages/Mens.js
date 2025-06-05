import React from 'react';
import products from '../data/products';
import './Category.css';

const Men = () => {
  const menProducts = products.filter(product => product.category === 'men');

  return (
    <div className="category-container">
      <h2>Men's Collection</h2>
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
    </div>
  );
};

export default Men;

import React, { useContext } from 'react';
import './Popular.css';
import Item from '../Items/Items';
import { ShopContext } from '../Context/ShopContext';

const Popular = () => {
  const { products, loading } = useContext(ShopContext);

  if (loading) {
    return <div className='popular'>Loading products...</div>;
  }

  // Filter products by category 'Popular'
  const popularProducts = products.filter(
    (item) => item.category && item.category.toLowerCase() === 'popular'
  );

  return (
    <div className='popular'>
      <h1>Popular Items</h1>

      <div className='popular-item'>
        {popularProducts.length > 0 ? (
          popularProducts.map((item, i) => (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              price={item.price}
            />
          ))
        ) : (
          <p>No popular items found.</p>
        )}
      </div>
    </div>
  );
};

export default Popular;

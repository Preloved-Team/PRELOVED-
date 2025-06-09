import React, { useContext } from 'react';
import './Popular.css';
import Item from '../Items/Items';
import { ShopContext } from '../Context/ShopContext';

const Popular = () => {
  const { products, loading } = useContext(ShopContext);

  if (loading) {
    return <div className='popular'>Loading products...</div>;
  }

  return (
    <div className='popular'>
      <h1>All Items</h1>
      
      <div className='popular-item'>
        {products.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
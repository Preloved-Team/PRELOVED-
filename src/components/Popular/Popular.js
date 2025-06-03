<<<<<<< HEAD
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
=======
import React from 'react'
import './Popular.css';
import Products from '../Assets/Products.json';
import Item from '../Items/Items';

const Popular = () => {
  return (
    <div className='popular'>
      <h1>ALL ITEMS </h1>
      
      <div className='popular-item'>
        {Products.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5

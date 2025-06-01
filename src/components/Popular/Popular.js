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

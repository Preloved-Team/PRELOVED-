import React from 'react'
import './Item.css';
import Product from '../Assets/Products.json';

const Items = (props) => {
  return (
    <div className='item'>
      <img src={props.image} alt=''/>
      <p>{props.name}</p>
      <div className='item-price'>
        <div className='itemPrice'>
          ${props.price}
        </div>
      </div>
    </div>
  )
}

export default Items

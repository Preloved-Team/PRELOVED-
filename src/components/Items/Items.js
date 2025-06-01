import React from 'react'
import { Link } from 'react-router-dom';
import './Item.css';


const Items = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img src={props.image} alt=''/></Link>
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

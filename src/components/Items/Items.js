import React from 'react'
<<<<<<< HEAD
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
=======

const Items = () => {
  return (
    <div>
      
>>>>>>> a517e045b1014febe2067dce28d35ff7f2bbe603
    </div>
  )
}

export default Items

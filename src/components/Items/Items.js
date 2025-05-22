import React from 'react'
<<<<<<< HEAD

const Items = () => {
  return (
    <div>
      
=======
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
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
    </div>
  )
}

export default Items

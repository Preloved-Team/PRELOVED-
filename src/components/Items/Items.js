import React from 'react'
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD

const Items = () => {
  return (
    <div>
      
=======
=======
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
=======
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
    </div>
  )
}

export default Items

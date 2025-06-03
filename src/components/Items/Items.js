import React from 'react'
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import './Item.css';

const Items = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img src={props.image} alt="" />
      </Link>
=======
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
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
      <p>{props.name}</p>
      <div className='item-price'>
        <div className='itemPrice'>
          ${props.price}
        </div>
      </div>
<<<<<<< HEAD
=======
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
    </div>
  )
}

<<<<<<< HEAD
export default Items
=======
export default Items
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5

import React from 'react'
import ListingStyle from './Listing.css';
import Item from '../../Items/Items';
import Products from '../../Assets/Products.json';

const Listing = () => {
  return (
    <div>
      <h1>LISTING</h1>
      <button className='addProduct-bttn'>ADD PRODUCTS</button>
      <div className='ITEM-LISTING'>
        {Products.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
      </div>
    </div>
  )
}

export default Listing

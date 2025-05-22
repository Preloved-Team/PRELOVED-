import React from 'react'
import './Breadcrum.css';

const Breadcrum = (props) => {
const {product} = props;
      return (
       <div className='breadcrum'>
         {product.category}{product.name}
       </div>
  )
}

export default Breadcrum

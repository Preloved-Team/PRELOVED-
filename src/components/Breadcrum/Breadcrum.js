import React from 'react'
// Import CSS styles specific to the Breadcrum component
import './Breadcrum.css';

const Breadcrum = (props) => {
const {product} = props;
      return (
        // Main container with breadcrum class for styling
       <div className='breadcrum'>
         {product.category}{product.name}
       </div>
  )
}

export default Breadcrum

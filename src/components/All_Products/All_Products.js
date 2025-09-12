import React from 'react'

import Top from '../AdminBodySection/TopSection/Top'
import Navbar from '../navbar/navbar'
import Footer from '../footer/Footer'
import Listing from '../AdminBodySection/ListingSection/Listing'

const AllProducts = () => {
  return (
    <div>
      <Top/>
      <Navbar/>
      <Listing />
      <Footer/>
    </div>
  )
}

export default AllProducts

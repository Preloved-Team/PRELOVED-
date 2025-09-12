import React from 'react'

import Top from './TopSection/Top';
import Listing from './ListingSection/Listing';

import TopAdmin from './TopSection/TopAdmin';

const Body = () => {
  return (
    <div className='mainContent'>
  <Top />
  <TopAdmin/>
  <div className='bottons'>
    <div className='listing'>
      <Listing />
    </div>
    
  </div>
</div>

  )
}

export default Body

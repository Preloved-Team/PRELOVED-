import React from 'react'
import BodyStyle from './Body.css';
import Top from './TopSection/Top';
import Listing from './ListingSection/Listing';
import Activity from './ActivitySection/Activity';
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
    <div className='activity'>
      <Activity />
    </div>
  </div>
</div>

  )
}

export default Body

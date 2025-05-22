import React from 'react'
import TopAdminStyle from './TopAdmin.css';

const TopAdmin = () => {
  return (
    <div className='cardSection'>
        <div className='cardSection-right'>
            <h1>PRELOVED- BUY OR SELL USED ITEMS</h1>
            <p>This website allows you to sell or buy products while sitting at your place!</p>
            <div className='buttons'>
                <button className='btm'>Explore more</button>
                <button className='btn-transparent'>Top sellers</button>
            </div>
            <div className='videoPreloved'>
                <video src=''></video>
            </div>
        </div>
        <div className='cardSection-left'>
            <div className='main'>
                <div className='textDiv'>
                    <h1>MY STAT</h1>
                    <div className='flex'>
                      
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default TopAdmin

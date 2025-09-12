import React from 'react'
import './TopAdmin.css';
import Shubham from './../../../components/Assets/shubham.jpg';
import OrdersChart from '../../Charts/OrdersChart';

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
                <img className='shubham' src={Shubham} alt=''></img>
            </div>
        </div>
        <div className='cardSection-left'>
            <div className='main'>
                <div className='textDiv'>
                    <h1>MY STAT</h1>
                    <div className='flex'>
                      <OrdersChart/>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default TopAdmin

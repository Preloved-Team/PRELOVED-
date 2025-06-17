import React from 'react'
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <div className="hero-container">
        <h1 className="heading">Welcome to Preloved</h1>
        <p className="context">Buy and sell second-hand treasures effortlessly</p>
        <div className='explore-bttn'>
            <Link to='/All_Products'>Explore Now</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero

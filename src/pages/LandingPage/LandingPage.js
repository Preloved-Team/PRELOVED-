import React from 'react'
import './LandingPage.css';
import Top from '../../components/AdminBodySection/TopSection/Top';
import Navbar from '../../components/navbar/navbar';
import Popular from '../../components/Popular/Popular';
import Hero from '../../components/hero/Hero';
import HighLights from '../../components/highlighs/HighLights';
import Footer from '../../components/footer/Footer';

const LandingPage = () => {
  return (
    <div>
      <Top/>
      <Navbar/>
      <Hero/>
      <Popular/>
      <HighLights/>
      <Footer/>
    </div>
  )
}

export default LandingPage

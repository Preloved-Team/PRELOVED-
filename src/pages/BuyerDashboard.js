import Navbar from '../components/navbar/navbar';
import './BuyerDashboard.css';
import Popular from '../components/Popular/Popular';
import Top from '../components/AdminBodySection/TopSection/Top';
import Footer from '../components/footer/Footer';
import Hero from '../components/hero/Hero';
import HighLights from '../components/highlighs/HighLights';

const BuyerDashboard = () => {
  return (
    <div>
      <Top/>
    <div>
      <Navbar/>
      <Hero/>
      <Popular/>
      <HighLights/>
      <Footer/>
    </div>
      
    </div>
  );
};

export default BuyerDashboard;

import Navbar from '../components/navbar/navbar';
import './BuyerDashboard.css';
import Popular from '../components/Popular/Popular';
import Top from '../components/AdminBodySection/TopSection/Top';
import Footer from '../components/footer/Footer';

const BuyerDashboard = () => {
  return (
    <div>
      <Top/>
    <div>
      <Navbar/>
      <Popular/>
      <Footer/>
    </div>
      
    </div>
  );
};

export default BuyerDashboard;

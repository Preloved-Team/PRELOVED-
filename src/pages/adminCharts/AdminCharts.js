import React from 'react';
import ProfitChart from '../../components/Charts/ProfitChart';
import Top from '../../components/AdminBodySection/TopSection/Top';
import UserChart from '../../components/Charts/UserChart';
import OrdersChart from '../../components/Charts/OrdersChart'; 
import './AdminCharts.css';

const AdminCharts = () => {
  return (
    <div>
      <Top />
      <ProfitChart />

      <div className='user-order-chart'>
        <div>
          <UserChart />
        </div>
        <div>
          <OrdersChart />
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PreLoved. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminCharts;

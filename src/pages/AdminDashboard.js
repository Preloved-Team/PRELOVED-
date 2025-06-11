import React from 'react';
import SideBar from '../components/AdminSideBar/SideBar';
import Body from '../components/AdminBodySection/Body';
import './AdminDashboard.css';
import Footer from '../components/footer/Footer';

// ✅ Import the bulk update function
import { bulkAddSellerId } from '../utils/bulkUpdateSeller';

const AdminDashboard = () => {
  return (
    <div>
      <div className='container'>
        <div className='sidebar'>
          <SideBar />
        </div>
        <div className='body'>
          <Body />

          {/* ✅ Optional button for admin use */}
          <div style={{ marginTop: '30px', padding: '20px', textAlign: 'center' }}>
            <button
              onClick={bulkAddSellerId}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🛠️ Fix Products (Add Missing Seller IDs)
            </button>
          </div>

          <Footer />
        </div>
      </div>
      <div className='footer'></div>
    </div>
  );
};

export default AdminDashboard;

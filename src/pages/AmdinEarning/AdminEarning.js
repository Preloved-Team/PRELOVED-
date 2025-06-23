import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './AdminEarning.css';
import Top from '../../components/AdminBodySection/TopSection/Top';
import ProfitChart from '../../components/Charts/ProfitChart';

function AdminEarning() {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const orderList = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      const totalCommission = orderList.reduce((sum, order) => {
        return sum + (order.adminCommission || 0);
      }, 0);
      
      setOrders(orderList);
      setTotal(totalCommission);
    };

    fetchEarnings();
  }, []);

  return (
    <div className="admin-earning-container">
      <Top/>
      <h2>Admin Earnings</h2>
      <div className="total-earning">
        <h3>Total Earnings: ${total.toFixed(2)}</h3>
      </div>
      <ProfitChart/>
      <table className="Admin-profit-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name on Card</th>
            <th>Items</th>
            <th>Product Value</th>
            <th>Date</th>
            <th>Admin Commission</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.nameOnCard}</td>
              <td>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>
                      {item.title} × {item.quantity} (${item.price})
                    </li>
                  ))}
                </ul>
              </td>
              <td>${order.totalAmount?.toFixed(2)}</td>
              <td>{order.createdAt?.toDate().toLocaleString()}</td>
              <td>${order.adminCommission?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PreLoved. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AdminEarning;
import React, { useEffect, useState } from 'react';
import './AdminOrders.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import Top from '../../components/AdminBodySection/TopSection/Top';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'orders'));
        const orderList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <Top/>
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name on Card</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Date</th>
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
                <td>${order.totalAmount}</td>
                <td>{order.createdAt?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PreLoved. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminOrders;

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './AdminEarning.css';

function AdminEarning() {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      const snapshot = await getDocs(collection(db, 'adminEarnings'));
      const shubh = await getDocs(collection(db, "orders"))
      const orderList = shubh.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      let sum = 0;
      snapshot.forEach(doc => {
        sum += doc.data().amount;
      });
      setOrders(orderList);
      setTotal(sum);
    };

    fetchEarnings();
  }, []);

  return (
    <div>
      <h2>Admin Total Earnings</h2>
      <table className="Admin-profit-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name on Card</th>
              <th>Items</th>
              <th>Product Value</th>
              <th>Date</th>
              <th>Admin Profit</th>
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
                <td><p>${total.toFixed(2)}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default AdminEarning;

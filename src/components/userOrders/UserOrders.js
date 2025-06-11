import React, { useEffect, useState } from 'react';
import './UserOrders.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import { getAuth } from 'firebase/auth';

const UserOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.warn("No user logged in.");
        setUserOrders([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'orders'), where('userEmail', '==', user.email));
        const snapshot = await getDocs(q);
        const orders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserOrders(orders);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <div className="user-orders-container">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userOrders.length === 0 ? (
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
            {userOrders.map(order => (
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
    </div>
  );
};

export default UserOrders;

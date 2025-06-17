import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../Firebase';
import './AdminEarning.css';
import Top from '../../components/AdminBodySection/TopSection/Top';
import { format } from 'date-fns';

function AdminEarning() {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const q = query(
          collection(db, "orders"),
          orderBy(sortConfig.key, sortConfig.direction)
        );
        
        const ordersSnapshot = await getDocs(q);
        const orderList = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        
        const totalCommission = orderList.reduce((sum, order) => {
          return sum + (order.adminCommission || 0);
        }, 0);
        
        setOrders(orderList);
        setTotal(totalCommission);
      } catch (err) {
        console.error("Error fetching earnings:", err);
        setError('Failed to load earnings data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return date ? format(date, 'MMM dd, yyyy h:mm a') : 'N/A';
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (error) {
    return (
      <div className="admin-earning-container">
        <Top />
        <div className="error-message">
          <h2>Admin Earnings</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-earning-container">
        <Top />
        <h2>Admin Earnings</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading earnings data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-earning-container">
      <Top />
      <h2>Admin Earnings</h2>
      
      <div className="total-earning">
        <h3>Total Earnings: {formatCurrency(total)}</h3>
      </div>

      {orders.length === 0 ? (
        <div className="empty-earnings">
          <p>No earnings data available</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="Admin-profit-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>
                  Order ID {getSortIndicator('id')}
                </th>
                <th onClick={() => handleSort('nameOnCard')}>
                  Customer {getSortIndicator('nameOnCard')}
                </th>
                <th>Items</th>
                <th onClick={() => handleSort('totalAmount')}>
                  Order Value {getSortIndicator('totalAmount')}
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  Date {getSortIndicator('createdAt')}
                </th>
                <th onClick={() => handleSort('adminCommission')}>
                  Commission {getSortIndicator('adminCommission')}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} style={{ '--row-index': index }}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.nameOnCard || 'N/A'}</td>
                  <td>
                    <ul className="table-list">
                      {order.items?.map(item => (
                        <li key={item.id}>
                          {item.title} × {item.quantity} ({formatCurrency(item.price)})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td className={order.adminCommission ? 'highlight-profit' : ''}>
                    {formatCurrency(order.adminCommission)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminEarning;
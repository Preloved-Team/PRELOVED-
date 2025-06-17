import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../Firebase';
import './AdminOrders.css';
import Top from '../../components/AdminBodySection/TopSection/Top';
import { format } from 'date-fns';
import { FiSearch, FiFilter, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 10;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const q = query(
          collection(db, 'orders'),
          orderBy(sortConfig.key, sortConfig.direction)
        );
        
        const snapshot = await getDocs(q);
        const orderList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        
        setOrders(orderList);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.nameOnCard?.toLowerCase().includes(searchLower) ||
        order.items.some(item => 
          item.title.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return date ? format(date, 'MMM dd, yyyy h:mm a') : 'N/A';
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />;
  };

  if (error) {
    return (
      <div className="admin-orders-container">
        <Top />
        <h2>All Orders</h2>
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="action-btn"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-orders-container">
        <Top />
        <h2>All Orders</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <Top />
      <h2>All Orders</h2>
      
      <div className="controls">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select 
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found matching your criteria</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="orders-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>
                    Order ID {getSortIcon('id')}
                  </th>
                  <th onClick={() => handleSort('nameOnCard')}>
                    Customer {getSortIcon('nameOnCard')}
                  </th>
                  <th>Items</th>
                  <th onClick={() => handleSort('totalAmount')}>
                    Total {getSortIcon('totalAmount')}
                  </th>
                  <th onClick={() => handleSort('createdAt')}>
                    Date {getSortIcon('createdAt')}
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => (
                  <tr key={order.id} style={{ '--row-index': index }}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.nameOnCard || 'N/A'}</td>
                    <td>
                      <ul className="order-items-list">
                        {order.items.map(item => (
                          <li key={item.id}>
                            {item.title} × {item.quantity} ({formatCurrency(item.price)})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <span className={`status-badge status-${order.status || 'pending'}`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
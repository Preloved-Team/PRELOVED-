import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase';
import './AdminPermissions.css';
import Top from '../../components/AdminBodySection/TopSection/Top';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCheck, FiX, FiTrash2, FiUser, FiShield } from 'react-icons/fi';

const AdminPermissions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'email',
    direction: 'asc'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const snapshot = await getDocs(collection(db, 'users'));
        const userList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Failed to load users. Please try again.');
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId, email) => {
    try {
      await updateDoc(doc(db, 'users', userId), { isAuthorized: true });
      toast.success(`Seller ${email} approved successfully`);
      setUsers(users.map(user => 
        user.id === userId ? {...user, isAuthorized: true} : user
      ));
    } catch (err) {
      console.error("Error approving user:", err);
      toast.error(`Failed to approve ${email}`);
    }
  };

  const handleReject = async (userId, email) => {
    try {
      await updateDoc(doc(db, 'users', userId), { isAuthorized: false });
      toast.warning(`Seller ${email} rejected`);
      setUsers(users.map(user => 
        user.id === userId ? {...user, isAuthorized: false} : user
      ));
    } catch (err) {
      console.error("Error rejecting user:", err);
      toast.error(`Failed to reject ${email}`);
    }
  };

  const handleDelete = async (userId, email) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        toast.info(`User ${email} deleted`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
        toast.error(`Failed to delete ${email}`);
      }
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getStatusClass = (user) => {
    if (user.role !== 'seller') return 'status-neutral';
    return user.isAuthorized ? 'status-active' : 'status-inactive';
  };

  if (error) {
    return (
      <div className="manage-users-container">
        <Top />
        <h2>Manage Users</h2>
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="action-btn btn-retry"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="manage-users-container">
        <Top />
        <h2>Manage Users</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-users-container">
      <Top />
      <h2>Manage Users</h2>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('email')}>
                  Email {sortConfig.key === 'email' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th onClick={() => handleSort('role')}>
                  Role {sortConfig.key === 'role' && (
                    sortConfig.direction === 'asc' ? '↑' : '↓'
                  )}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={user.id} style={{ '--row-index': index }}>
                  <td>{user.email}</td>
                  <td>
                    <span className="role-badge">
                      {user.role === 'admin' ? <FiShield /> : <FiUser />}
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-indicator ${getStatusClass(user)}`}>
                      {user.role === 'seller'
                        ? user.isAuthorized ? 'Approved' : 'Pending'
                        : 'N/A'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      {user.role === 'seller' && (
                        <>
                          <button 
                            className="action-btn btn-approve"
                            onClick={() => handleApprove(user.id, user.email)}
                            disabled={user.isAuthorized}
                          >
                            <FiCheck /> Approve
                          </button>
                          <button 
                            className="action-btn btn-reject"
                            onClick={() => handleReject(user.id, user.email)}
                            disabled={!user.isAuthorized}
                          >
                            <FiX /> Reject
                          </button>
                        </>
                      )}
                      <button 
                        className="action-btn btn-delete"
                        onClick={() => handleDelete(user.id, user.email)}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPermissions;
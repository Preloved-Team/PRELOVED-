import React, { useEffect, useState } from 'react';
import './AdminPermissions.css';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase';
import Top from '../../components/AdminBodySection/TopSection/Top';
 
const AdminPermissions = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
 
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };
 
    fetchUsers();
  }, [refresh]);
 
  const handleApprove = async (userId) => {
    await updateDoc(doc(db, 'users', userId), { isAuthorized: true });
    setRefresh(prev => !prev);
  };
 
  const handleReject = async (userId) => {
    await updateDoc(doc(db, 'users', userId), { isAuthorized: false });
    setRefresh(prev => !prev);
  };
 
  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, 'users', userId));
    setRefresh(prev => !prev);
  };
 
  return (
    <div className="manage-users-container">
      <Top/>
      <h2>Manage Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Authorized</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role === 'seller'
                  ? user.isAuthorized ? ' Yes' : ' No'
                  : 'N/A'}
              </td>
              <td>
                {user.role === 'seller' && (
                  <>
                    <button className="approve" onClick={() => handleApprove(user.id)}>Approve</button>
                    <button className="reject" onClick={() => handleReject(user.id)}>Reject</button>
                  </>
                )}
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PreLoved. All rights reserved.</p>
      </div>
    </div>
  );
};
 
export default AdminPermissions;
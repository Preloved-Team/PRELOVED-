import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SellerMessages = () => {
  const [messages, setMessages] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'messages'),
        where('sellerId', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setMessages(messagesData);
    };

    fetchMessages();
  }, [auth]); // Fixed: Added auth to the dependency array

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div>
          {messages.map(message => (
            <div key={message.id} style={{
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px'
            }}>
              <p><strong>Product:</strong> {message.productName}</p>
              <p><strong>From:</strong> {message.userEmail}</p>
              <p><strong>Message:</strong> {message.text}</p>
              <small>
                {message.timestamp?.toDate().toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerMessages;
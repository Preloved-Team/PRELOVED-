import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './Notification.css';

const Notifications = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({
          id: doc.id,
          userEmail: data.userEmail,
          timestamp: data.timestamp,
          text: data.text
        });
      });
      setMessages(messagesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="notifications-container">
      <h2>Your Messages</h2>
      
      {messages.length === 0 ? (
        <p className="no-messages">No messages yet</p>
      ) : (
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className="message-card">
              <div className="message-header">
                <span className="sender">{message.userEmail || 'Unknown sender'}</span>
                <span className="timestamp">
                  {message.timestamp?.toDate().toLocaleString() || 'Just now'}
                </span>
              </div>
              <p className="message-text">{message.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
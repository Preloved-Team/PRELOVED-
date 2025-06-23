import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './../../Firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import './Messages.css';

const Messages = () => {
  const [message, setMessage] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const auth = getAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setProductInfo({
        productId: location.state.productId,
        productName: location.state.productName,
        sellerId: location.state.sellerId
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    try {
      const user = auth.currentUser; 
      if (!user) {
        console.error("No user logged in");
        return;
      }
      
      if (!productInfo) {
        console.error("No product information available");
        return;
      }

      await addDoc(collection(db, 'messages'), {
        text: message,
        userId: user.uid, 
        userEmail: user.email,
        productId: productInfo.productId,
        productName: productInfo.productName,
        sellerId: productInfo.sellerId,
        timestamp: serverTimestamp()
      });
      
      setMessage('');
      alert('Message sent successfully!');
    } catch (error) {
      console.error("Error sending message:", error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="message-container">
      <div className="message-header">
        {productInfo && (
          <h2>Message regards {productInfo.productName}</h2>
        )}
      </div>
      
      <div className="message-history">
        
      </div>
      
      <form className="message-input-area" onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
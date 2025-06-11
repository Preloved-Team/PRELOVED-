import React, { useEffect, useState, useRef } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db, auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Image } from 'react-bootstrap';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './Messages.css';

const Messages = () => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productImage, setProductImage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  const searchParams = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const sellerId = searchParams.get('sellerId');
    const prodId = searchParams.get('productId');
    const prodName = searchParams.get('productName');
    const prodImage = searchParams.get('productImage');

    if (sellerId) setReceiverId(sellerId);
    if (prodId) setProductId(prodId);
    if (prodName) setProductName(decodeURIComponent(prodName));
    if (prodImage) setProductImage(decodeURIComponent(prodImage));
  }, []);

  useEffect(() => {
    if (!user || !receiverId || !productId) return;

    const conversationId = [user.uid, receiverId, productId].sort().join('_');

    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const msgs = [];
      for (let docSnap of snapshot.docs) {
        const msg = { id: docSnap.id, ...docSnap.data() };
        if (msg.receiverId === user.uid && !msg.read) {
          await updateDoc(doc(db, 'messages', msg.id), { read: true });
        }
        msgs.push(msg);
      }
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [receiverId, user, productId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!user) return alert('❌ You must be logged in.');
    if (!receiverId) return alert('❌ Receiver ID missing.');
    if (!productId) return alert('❌ Product ID missing.');
    if (!message.trim()) return alert('❌ Message is empty.');

    const conversationId = [user.uid, receiverId, productId].sort().join('_');

    const newMessage = {
      senderId: user.uid,
      receiverId,
      message: message.trim(),
      read: false,
      timestamp: Timestamp.now(),
      conversationId,
      productId,
      productName
    };

    try {
      await addDoc(collection(db, 'messages'), newMessage);
      setMessage('');
      setShowEmoji(false);
    } catch (err) {
      console.error('❌ Firestore Error:', err.message);
      alert('Message failed to send.');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container className="mt-4">
      <Card className="mb-3 p-3 bg-light border-info">
        <Row>
          <Col>
            <h5 className="mb-1">Product Chat:</h5>
            <p className="mb-0"><strong>{productName}</strong></p>
          </Col>
        </Row>
      </Card>

      <div className="message-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.senderId === user.uid ? 'sent' : 'received'}`}
          >
            <div className="chat-text">{msg.message}</div>
            <div className="chat-timestamp">{formatTime(msg.timestamp)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <Form onSubmit={handleSend} className="chat-input-area mt-3">
        <Button variant="light" onClick={() => setShowEmoji(!showEmoji)}>😊</Button>
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flexGrow: 1, marginRight: '8px' }}
        />
        <Button type="submit" variant="primary">Send</Button>
      </Form>

      {showEmoji && (
        <div className="mt-2">
          <Picker data={data} onEmojiSelect={(emoji) => setMessage((m) => m + emoji.native)} />
        </div>
      )}
    </Container>
  );
};

export default Messages;
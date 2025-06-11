import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Container, Badge } from 'react-bootstrap';

const Inbox = () => {
  const [user] = useAuthState(auth);
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'messages'),
      where('conversationId', '>=', ''),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const grouped = {};

      snapshot.docs.forEach((docSnap) => {
        const msg = docSnap.data();
        const isMine =
          msg.senderId === user.uid || msg.receiverId === user.uid;
        if (!isMine) return;

        const key = `${msg.conversationId}`;
        if (!grouped[key] || grouped[key].timestamp < msg.timestamp) {
          grouped[key] = { ...msg, id: docSnap.id };
        }
      });

      setThreads(Object.values(grouped));
    });

    return () => unsubscribe();
  }, [user]);

  const getOtherUser = (msg) =>
    msg.senderId === user.uid ? msg.receiverId : msg.senderId;

  return (
    <Container className="mt-4">
      <h3>Your Conversations</h3>
      <ListGroup>
        {threads.map((msg, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() =>
              navigate(
                `/messages?sellerId=${getOtherUser(msg)}&productId=${
                  msg.productId
                }&productName=${encodeURIComponent(msg.productName)}`
              )
            }
          >
            <div>
              <strong>With:</strong> {getOtherUser(msg)}
            </div>
            {msg.productName && (
              <div>
                <strong>Product:</strong> {msg.productName}
              </div>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <small>
                {msg.senderId === user.uid ? 'You' : 'Them'}: {msg.message}
              </small>
              {!msg.read && msg.receiverId === user.uid && (
                <Badge bg="danger" pill>
                  New
                </Badge>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;

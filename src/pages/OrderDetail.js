import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { Container, Card, ListGroup } from 'react-bootstrap';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, 'orders', orderId);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        setOrder(orderSnap.data());
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <Container><p>Loading order...</p></Container>;

  return (
    <Container className="mt-4">
      <h2>Order Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>Order ID: {orderId}</Card.Title>
          <Card.Text>Date: {new Date(order.timestamp).toLocaleString()}</Card.Text>
          <Card.Text>Status: {order.status || "Pending"}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          {order.items.map((item, idx) => (
            <ListGroup.Item key={idx}>
              <strong>{item.name}</strong> — ${item.price} × {item.quantity}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Footer>Total: ${order.total}</Card.Footer>
      </Card>
    </Container>
  );
};

export default OrderDetail;

import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  addDoc
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import {
  Button,
  Container,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [user] = useAuthState(auth);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      const q = query(collection(db, 'wishlist'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWishlist(items);
    };
    fetchWishlist();
  }, [user]);

  const removeFromWishlist = async (id) => {
    await deleteDoc(doc(db, 'wishlist', id));
    setWishlist(prev => prev.filter(item => item.id !== id));
    toast.info("Removed from wishlist");
  };

  const addToWishlist = async (product) => {
    if (!user) return toast.error("Please login to save items.");
    await addDoc(collection(db, 'wishlist'), {
      ...product,
      userId: user.uid,
      addedAt: Date.now()
    });
    toast.success("Added to wishlist!");
  };

  return (
    <Container className="mt-4">
      <h2>My Wishlist</h2>
      <Row>
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          wishlist.map((item) => (
            <Col md={4} className="mb-3" key={item.id}>
              <Card>
                <Card.Img variant="top" src={item.image} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>${item.price}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromWishlist(item.id)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Wishlist;

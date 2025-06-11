import React, { useState, useEffect } from 'react';
import { db } from './../../Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import './DisplayFeedback.css';

const DisplayFeedback = ({ productId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    
    const q = query(
      collection(db, 'feedback'),
      where('productId', '==', productId)
    );
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const feedbackList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          feedbackList.push({
            id: doc.id,
            comment: data.comment,
            createdAt: data.createdAt,
            productId: data.productId,
            productName: data.productName,
            rating: data.rating,
            userEmail: data.userEmail
          });
        });
        setFeedbacks(feedbackList);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  if (loading) return <div>Loading feedback...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feedback-container">
      <h3>Customer Feedback</h3>
      
      {feedbacks.length === 0 ? (
        <p>No feedback yet for this product.</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              <div className="feedback-header">
                <span className="user-email">{feedback.userEmail}</span>
                <span className="rating">Rating: {feedback.rating}/5</span>
              </div>
              <div className="feedback-comment">
                <p>{feedback.comment}</p>
              </div>
              <div className="feedback-date">
                {feedback.createdAt?.toDate ? 
                  new Date(feedback.createdAt.toDate()).toLocaleDateString() : 
                  'No date available'}
              </div>
              {feedback.productName && (
                <div className="product-name">
                  For: {feedback.productName}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFeedback;
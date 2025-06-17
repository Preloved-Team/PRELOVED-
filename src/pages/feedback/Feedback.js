import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Feedback.css';
import Top from '../../components/AdminBodySection/TopSection/Top';

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        const feedbackList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeedbacks(feedbackList);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-container">
      <Top/>
      <h2>Product Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Submitted At</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.productName || 'N/A'}</td>
                <td>{feedback.rating || 'N/A'}</td>
                <td>{feedback.comment || 'N/A'}</td>
                <td>{feedback.createdAt?.toDate().toLocaleString() || 'N/A'}</td>
                <td>{feedback.userEmail || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Feedback;

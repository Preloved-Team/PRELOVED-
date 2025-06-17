import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Feedback.css';
import Top from '../../components/AdminBodySection/TopSection/Top';

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const q = query(
          collection(db, 'feedback'),
          orderBy(sortConfig.key, sortConfig.direction)
        );

        const querySnapshot = await getDocs(q);
        const feedbackList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        
        setFeedbacks(feedbackList);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setError('Failed to load feedback data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderRatingStars = (rating) => {
    if (!rating) return 'N/A';
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="feedback-container">
      <Top />
      <h2>Product Feedback</h2>

      {error ? (
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading feedback...</p>
        </div>
      ) : feedbacks.length === 0 ? (
        <p className="empty-message">No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('productName')}>
                Product Name {sortConfig.key === 'productName' && (
                  sortConfig.direction === 'asc' ? '↑' : '↓'
                )}
              </th>
              <th onClick={() => handleSort('rating')}>
                Rating {sortConfig.key === 'rating' && (
                  sortConfig.direction === 'asc' ? '↑' : '↓'
                )}
              </th>
              <th>Comment</th>
              <th onClick={() => handleSort('createdAt')}>
                Submitted At {sortConfig.key === 'createdAt' && (
                  sortConfig.direction === 'asc' ? '↑' : '↓'
                )}
              </th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.productName || 'N/A'}</td>
                <td className="rating-cell">
                  <span className="star-rating">
                    {renderRatingStars(feedback.rating)}
                    <span className="rating-value">({feedback.rating})</span>
                  </span>
                </td>
                <td>{feedback.comment || 'No comment provided'}</td>
                <td>{formatDate(feedback.createdAt)}</td>
                <td>{feedback.userEmail || 'Anonymous'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Feedback;
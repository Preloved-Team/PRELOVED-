import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import Footer from '../footer/Footer';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Top from '../AdminBodySection/TopSection/Top';
import { db } from '../../Firebase';
import { collection, addDoc, Timestamp, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import DisplayFeedback from '../displayFeedback/DisplayFeedback';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleAddToCart = () => {
    addToCart(product.id);
    navigate('/cart');
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      alert('Please log in to save items to your wishlist.');
      return;
    }

    try {
      await addDoc(collection(db, 'wishlist'), {
        userId: user.uid,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        timestamp: Timestamp.now(),
      });
      alert('Added to Wishlist!');
    } catch (error) {
      console.error('Wishlist Error:', error);
      alert('Could not add to wishlist.');
    }
  };

  const handleMessageSeller = () => {
    if (!product.sellerId || !product.id || !product.name) {
      alert('Missing product or seller information.');
      return;
    }

    navigate(
      `/messages?sellerId=${product.sellerId}&productId=${product.id}&productName=${encodeURIComponent(
        product.name
      )}`
    );
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      alert('Please provide both a rating and a comment.');
      return;
    }

    let userEmail = 'Guest';
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        userEmail = userSnap.data().email;
      }
    }

    try {
      await addDoc(collection(db, 'feedback'), {
        productId: product.id,
        productName: product.name,
        rating,
        comment,
        createdAt: Timestamp.now(),
        userEmail,
      });

      alert('Thank you for your feedback!');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review: ', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div>
      <Top />
      <div className="productDisplay">
        <div className="productDisplay-left">
          <div className="product-image">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={product.image} alt="" />
            ))}
          </div>
          <div className="productDisplay-image">
            <img className="main-image" src={product.image} alt="" />
          </div>
        </div>

        <div className="productDisplay-right">
          <h1>{product.name}</h1>
          <div className="star-rating">
            {[...Array(5)].map((_, i) => (
              <img key={i} src="/images/star-icon.png" alt="" />
            ))}
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-description">{product.description}</div>

          <button onClick={handleAddToCart}>🛒 ADD TO CART</button>
          <button onClick={handleAddToWishlist} style={{ marginLeft: '10px' }}>
            ❤️ Save to Wishlist
          </button>
          <button onClick={handleMessageSeller} style={{ marginLeft: '10px' }}>
            💬 Message Seller
          </button>

          <div className="review-section">
            <h2>Leave a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="review-stars">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => setRating(index + 1)}
                    style={{
                      cursor: 'pointer',
                      color: rating > index ? '#ffc107' : '#e4e5e9',
                      fontSize: '24px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Write your feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                cols="40"
              />
              <br />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      </div>

      <DisplayFeedback />
      <Footer />
    </div>
  );
};

export default ProductDisplay;

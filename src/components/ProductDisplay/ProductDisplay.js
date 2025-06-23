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

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleAddToCart = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert('Please sign in to add items to your Cart');
            navigate('/login'); 
            return;
        }
        addToCart(product.id);
    };

    const handleAddToWishlist = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            alert('Please sign in to add items to your wishlist');
            navigate('/login'); 
            return;
        }

        try {
            await addDoc(collection(db, 'wishlist'), {
                userId: user.uid,
                productId: product.id,  
                productName: product.name,
                productImage: product.image,
                productPrice: product.price,
                addedAt: Timestamp.now()
            });
            
            alert('Product added to wishlist!');
        } catch (error) {
            console.error('Error adding to wishlist: ', error);
            alert('Failed to add to wishlist. Please try again.');
        }
    };

        const handleMessage = () => {
          navigate('/message', { 
            state: { 
              productId: product.id,
              productName: product.name,
              sellerId: product.sellerId 
              } 
            });
        }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !comment.trim()) {
            alert('Please provide both a rating and a comment.');
            return;
        }
        
        const auth = getAuth();
        const user = auth.currentUser;
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
            <div className='productDisplay'>
                <div className='productDisplay-left'>
                    <div className='product-image'>
                        <img src={product.image} alt='' />
                        <img src={product.image} alt='' />
                        <img src={product.image} alt='' />
                        <img src={product.image} alt='' />
                    </div>
                    <div className='productDisplay-image'>
                        <img className='main-image' src={product.image} alt='' />
                    </div>
                </div>
                <div className='productDisplay-right'>
                    <h1>{product.name}</h1>
                    <div className='star-rating'>
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src="/images/star-icon.png" alt="" />
                        ))}
                    </div>
                    <div className='product-price'>${product.price.toFixed(2)}</div>
                    <div className='product-description'>{product.description}</div>

                    <button className='cartButton' onClick={handleAddToCart}>ADD TO CART</button>
                    <button className='wishlistbutton' onClick={handleAddToWishlist}>SAVE TO WISHLIST</button>
                    <button className='messegebutton' onClick={handleMessage}>MESSAGE SELLER</button>

                    <div className='review-section'>
                        <h2>Leave a Review</h2>
                        <form onSubmit={handleReviewSubmit}>
                            <div className='review-stars'>
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
                                placeholder='Write your feedback...'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="4"
                                cols="40"
                            />
                            <br />
                            <button type='submit'>Submit Review</button>
                        </form>
                        <DisplayFeedback productId={product.id} /> 
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDisplay;
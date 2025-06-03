import React, { useContext } from 'react';
import './ProductDisplay.css';
import Footer from '../footer/Footer';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom'; 
import Top from '../AdminBodySection/TopSection/Top';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate(); 

    const handleAddToCart = () => {
        addToCart(product.id);
        navigate('/cart'); 
    };

    return (
        <div>
          <Top/>
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
                            <img key={i} src="/images/star-icon.png" alt="star" />
                        ))}
                    </div>
                    <div className='product-price'>${product.price.toFixed(2)}</div>
                    <div className='product-description'>{product.description}</div>
                    
                    <button onClick={handleAddToCart}>ADD TO CART</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ProductDisplay;
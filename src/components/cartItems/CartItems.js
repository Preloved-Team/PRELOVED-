import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './CartItems.css';
import { useNavigate } from 'react-router-dom'; 

const CartItems = () => {
    const { products, cartItem, addToCart, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate(); 
    
    const cartProducts = products.filter(product => cartItem[product.id] > 0);
    
    const totalPrice = cartProducts.reduce(
        (sum, product) => sum + (product.price * cartItem[product.id]),
        0
    );

    if (!cartProducts.length) {
        return <div className="empty-cart">Your cart is empty</div>;
    }

    const handlePayment = () => {
        navigate("/payment"); 
    }

    return (
        <div className="cartitems">
            <div className="cartitems-header">
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            
            {cartProducts.map((product) => (
                <div key={product.id} className="cartitems-format">
                    <img src={product.image} alt="" />
                    <p>{product.name}</p>
                    <p>${product.price.toFixed(2)}</p>
                    <div className="cartitems-quantity">
                        <button onClick={() => removeFromCart(product.id)}>-</button>
                        <span>{cartItem[product.id]}</span>
                        <button onClick={() => addToCart(product.id)}>+</button>
                    </div>
                    <p>${(product.price * cartItem[product.id]).toFixed(2)}</p>
                </div>
            ))}
            
            <div className="cartitems-total">
                <h3>Cart Totals</h3>
                <div>
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div>
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <div className="cartitems-total-item">
                    <p>Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
            </div>
        </div>
    );
};

export default CartItems;
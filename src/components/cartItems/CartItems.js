import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './CartItems.css';

const CartItems = () => {
    const { Products, cartItem, addToCart, removeFromCart } = useContext(ShopContext);

    const cartProducts = Products.filter(product => 
        cartItem && cartItem[product.id] > 0
    );

    if (!cartProducts.length) {
        return <div className="empty-cart">Your cart is empty</div>;
    }

    return (
        <div className="cartitems">
            {cartProducts.map((product) => (
                <div key={product.id} className="cartitems-format">
                    <img 
                        src={product.image}  
                        alt='' 
                        className="carticon-product-icon" 
                    />
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
        </div>
    );
};

export default CartItems;
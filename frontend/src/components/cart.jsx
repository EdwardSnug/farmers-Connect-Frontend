import React from "react";
import '../styles/components.css';

function Cart({ cartItems, onRemoveFromCart }) {
    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <span>{item.name} - Ksh {item.price} ({item.unit})</span>
                            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;

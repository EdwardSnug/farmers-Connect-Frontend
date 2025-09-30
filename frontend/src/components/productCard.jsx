import React from "react";
import '../styles/components.css';
import img from '../assets/logo.svg';

function ProductCard({ product, inCart, onAddToCart, onRemoveFromCart }) {
    const {
        name,
        description,
        price,
        quantity,
        location,
        image,
        unit,
    } = product;

    return (
        <div className="product-card">
            <img src={image || img} alt={name} />
            <h3>{name}</h3>

            <div className="price-quantity">
                <p className="price">Ksh {Number(price).toFixed(2)} <span className="unit">/{unit}</span></p>
                <p className="unit">Quantity: {quantity}</p>
            </div>

            <p>{description}</p>
            <div className="product-details">
                <p><strong>Location:</strong> {location}</p>
            </div>

            <div className="product-card-actions">
                {/* ✅ Cart toggle */}
                {inCart ? (
                    <button onClick={() => onRemoveFromCart(product)} className="remove-cart">
                        Remove from Cart
                    </button>
                ) : (
                    <button onClick={() => onAddToCart(product)} className="add-cart">
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;

import React from "react";
import '../styles/components.css';
import img from '../assets/logo.svg';

function ProductCard({ product, inCart, onAddToCart, onRemoveFromCart }) {
    const {
        name,
        product_name,
        description,
        price,
        quantity,
        location,
        image,
        image_url,
        unit,
        contact,
        contact_info,
    } = product || {};

    // normalize fields coming from different payload shapes
    const displayName = name || product_name || "Unnamed product";
    const displayImage = image || image_url || img;
    const displayContact = contact || contact_info || "Not provided";
    const displayDescription = description || "";
    const displayUnit = unit || "";
    const displayQuantity = typeof quantity !== "undefined" ? quantity : "";
    const displayPrice = (() => {
        const p = typeof price === "number" ? price : parseFloat(price || 0);
        return isNaN(p) ? 0 : p;
    })();

    return (
        <div className="product-card">
            <img src={displayImage} alt={displayName} />
            <h3>{displayName}</h3>

            <div className="price-quantity">
                <p className="price">Ksh {displayPrice.toFixed(2)} <span className="unit">/{displayUnit}</span></p>
                <p className="unit">Quantity: {displayQuantity}</p>
            </div>

            <p>{displayDescription}</p>
            <div className="product-details">
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Contact:</strong> {displayContact}</p>
            </div>

            <div className="product-card-actions">
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

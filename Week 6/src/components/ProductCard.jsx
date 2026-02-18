import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, showDelivery = true, compact = false, onAddToCart }) => {
    // Helper to render stars
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fa-solid fa-star text-warning"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half" className="fa-solid fa-star-half-stroke text-warning"></i>);
        }
        // Fill remaining with empty stars if needed (optional, not in original design but good for consistency)
        // For now, mirroring original behavior which just lists stars.
        return stars;
    };

    // Calculate price parts
    const priceParts = product.price.toFixed(2).split('.');
    const dollars = priceParts[0];
    const cents = priceParts[1];

    if (compact) {
        // Compact version for Home page (matching original Home.jsx structure)
        return (
            <div className="card product-card h-100 border-0">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body px-0">
                    <h5 className="card-title text-truncate">{product.title}</h5>
                    <div className="rating mb-2">
                        {renderStars(product.rating)}
                        <span className="text-muted small ms-1">({product.reviewCount})</span>
                    </div>
                    <p className="price mb-2">
                        <span className="small align-top">$</span>{dollars}<span className="small align-top">{cents}</span>
                    </p>
                    <button className="btn btn-primary-custom w-100" onClick={onAddToCart}>Add to Cart</button>
                </div>
            </div>
        );
    }

    // Default version for Products page
    return (
        <div className="card product-card h-100 border-0 shadow-sm">
            <div className="position-relative text-center bg-white rounded p-2">
                <img src={product.image} className="card-img-top" alt={product.title} />
            </div>
            <div className="card-body px-0 pt-2">
                <Link to="/product-details" className="text-decoration-none text-dark">
                    <h5 className="card-title text-truncate">{product.title}</h5>
                </Link>
                <div className="rating mb-1">
                    {renderStars(product.rating)}
                    <span className="text-muted small ms-1">{product.reviewCount}</span>
                </div>
                <div className="price mb-1">
                    <span className="small align-top">$</span>{dollars}<span className="small align-top">{cents}</span>
                </div>
                {showDelivery && (
                    <div className="small text-muted mb-2">Delivery <span className="fw-bold">{product.deliveryDate || 'Tomorrow'}</span></div>
                )}
                <button className="btn btn-primary-custom w-100 btn-sm" onClick={onAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;

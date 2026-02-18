import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onRemove, onSaveForLater, onUpdateQty }) => {
    return (
        <div className="cart-item" style={{ borderBottom: '1px solid #ddd', padding: '20px 0' }}>
            <div className="row">
                <div className="col-md-2">
                    <div className="form-check d-flex align-items-center mb-2">
                        <input className="form-check-input me-2 item-check" type="checkbox" defaultChecked />
                        <img src={item.image} className="img-fluid" alt={item.title} style={{ maxHeight: '100px', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="col-md-8">
                    <Link to="/product-details" className="text-dark text-decoration-none">
                        <h5 className="fw-bold mb-1">{item.title}</h5>
                    </Link>
                    <div className="text-success small mb-1">In Stock</div>
                    <div className="d-flex flex-wrap align-items-center cart-actions">
                        <select
                            className="form-select form-select-sm w-auto me-3 shadow-sm border-secondary-subtle item-qty"
                            defaultValue={item.qty}
                            onChange={(e) => onUpdateQty && onUpdateQty(item.id, parseInt(e.target.value))}
                        >
                            <option value="1">Qty: 1</option>
                            <option value="2">Qty: 2</option>
                            <option value="3">Qty: 3</option>
                            <option value="4">Qty: 4</option>
                            <option value="5">Qty: 5</option>
                        </select>
                        <Link to="#" onClick={(e) => { e.preventDefault(); onRemove && onRemove(item.id); }} className="text-decoration-none me-3" style={{ fontSize: '0.9rem', color: '#007185', borderRight: '1px solid #ddd', paddingRight: '15px' }}>Delete</Link>
                        <Link to="#" onClick={(e) => { e.preventDefault(); onSaveForLater && onSaveForLater(item.id); }} className="text-decoration-none me-3" style={{ fontSize: '0.9rem', color: '#007185', borderRight: '1px solid #ddd', paddingRight: '15px' }}>Save for later</Link>
                        <Link to="#" className="text-decoration-none" style={{ fontSize: '0.9rem', color: '#007185' }}>Share</Link>
                    </div>
                </div>
                <div className="col-md-2 text-end">
                    <span className="cart-price fw-bold item-price" style={{ fontSize: '1.2rem', fontWeight: 700 }}>${item.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;

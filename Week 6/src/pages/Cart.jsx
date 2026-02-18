import React from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty } = useOutletContext();
    const navigate = useNavigate();
    // const [cartItems, setCartItems] = useState([]); in previous version

    // Removed simulation useEffect...

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

    // Event handlers
    const handleUpdateQty = (id, newQty) => {
        updateQty(id, newQty);
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleSaveForLater = (id) => {
        console.log("Save for later", id);
        removeFromCart(id);
    };

    return (
        <main className="container-fluid my-4 px-lg-5">
            <div className="row">
                {/* Left Column: Cart Items */}
                <div className="col-lg-9 col-md-8">
                    <div className="bg-white p-4 shadow-sm cart-container">
                        <div className="d-flex justify-content-between align-items-end cart-header">
                            <h1 className="h3 fw-normal mb-0">Shopping Cart</h1>
                            <Link to="#" className="text-decoration-none small text-muted">Deselect all items</Link>
                        </div>

                        <div className="text-end mb-2 border-bottom pb-1">
                            <span className="text-muted small">Price</span>
                        </div>

                        <div id="cart-items-wrapper">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-5 empty-cart-message">
                                    <h4>Your cart is empty</h4>
                                    <p>Check out our products and add items to your cart.</p>
                                    <Link to="/products" className="btn btn-primary-custom mt-3">Continue Shopping</Link>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQty={handleUpdateQty}
                                        onRemove={handleRemove}
                                        onSaveForLater={handleSaveForLater}
                                    />
                                ))
                            )}
                        </div>

                        <div className="text-end pt-3">
                            <span className="h5">Subtotal (<span id="cart-count-subtotal">{totalQty} items</span>): <span className="fw-bold" id="cart-subtotal-price">${subtotal.toFixed(2)}</span></span>
                        </div>

                    </div>

                    {/* Saved for Later (Optional Visual) */}
                    <div className="bg-white p-4 shadow-sm mt-4">
                        <h5 className="mb-3">Your Items Saved for Later (<span id="saved-count">1</span>)</h5>
                        <div id="saved-items-container">
                            <div className="row align-items-center border-top py-3 saved-item">
                                <div className="col-md-2">
                                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60"
                                        className="img-fluid" alt="Saved Item" />
                                </div>
                                <div className="col-md-8">
                                    <Link to="#" className="text-decoration-none fw-bold text-dark">Red Athletic Running Shoes</Link>
                                    <div className="text-success small">In Stock</div>
                                    <div className="cart-actions mt-1">
                                        <Link to="#" className="ms-0 action-move-to-cart text-decoration-none" style={{ fontSize: '0.9rem', color: '#007185', borderRight: '1px solid #ddd', paddingRight: '15px', marginRight: '15px' }}>Move to Cart</Link>
                                        <Link to="#" className="action-delete-saved text-decoration-none" style={{ fontSize: '0.9rem', color: '#007185' }}>Delete</Link>
                                    </div>
                                </div>
                                <div className="col-md-2 text-end">
                                    <span className="cart-price fw-bold" style={{ fontSize: '1.2rem', fontWeight: 700 }}>$85.50</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar: Order Summary */}
                <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                    <div className="cart-summary shadow-sm bg-white" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <div className="mb-3">
                            <span className="h5 fw-normal">Subtotal (<span id="cart-summary-count">{totalQty} items</span>):</span>
                            <div className="h5 fw-bold mt-1" id="cart-summary-price">${subtotal.toFixed(2)}</div>
                        </div>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="giftSummary" />
                            <label className="form-check-label small" htmlFor="giftSummary">
                                This order contains a gift
                            </label>
                        </div>

                        <button
                            id="checkout-btn"
                            className="btn btn-primary-custom w-100 rounded-pill mb-3"
                            onClick={() => navigate('/invoice')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>

                    {/* Sponsored or Recommendations */}
                    <div className="bg-white p-3 shadow-sm mt-3 border rounded text-center">
                        <p className="small fw-bold mb-2">Customers who bought items in your cart also bought:</p>
                        <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                            className="img-fluid mb-2" style={{ height: '100px' }} alt="Recommendation" />
                        <Link to="#" className="d-block text-decoration-none small mb-1 text-truncate">Headphones</Link>
                        <div className="rating small mb-1 text-warning">
                            <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i
                                className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i>
                        </div>
                        <span className="text-danger small fw-bold">$15.99</span>
                        <button className="btn btn-sm btn-warning w-100 rounded-pill mt-2">Add to Cart</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;

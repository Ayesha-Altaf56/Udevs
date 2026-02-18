import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="text-center py-3 mb-4">
                <a href="#" className="text-white text-decoration-none" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top</a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3">Get to Know Us</h5>
                        <Link to="#" className="footer-link">Careers</Link>
                        <Link to="#" className="footer-link">Blog</Link>
                        <Link to="#" className="footer-link">About E-Shop</Link>
                        <Link to="#" className="footer-link">Investor Relations</Link>
                    </div>
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3">Make Money with Us</h5>
                        <Link to="/sell" className="footer-link">Sell products on E-Shop</Link>
                        <Link to="#" className="footer-link">Sell on E-Shop Business</Link>
                        <Link to="#" className="footer-link">Sell apps on E-Shop</Link>
                        <Link to="#" className="footer-link">Become an Affiliate</Link>
                    </div>
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3">Payment Products</h5>
                        <Link to="#" className="footer-link">Business Card</Link>
                        <Link to="#" className="footer-link">Shop with Points</Link>
                        <Link to="#" className="footer-link">Reload Your Balance</Link>
                    </div>
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3">Let Us Help You</h5>

                        <Link to="/login" className="footer-link">Your Orders</Link>
                        <Link to="#" className="footer-link">Shipping Rates & Policies</Link>
                        <Link to="#" className="footer-link">Returns & Replacements</Link>
                        <Link to="/customer-service" className="footer-link">Help</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <Link className="navbar-brand d-inline-block mb-3" to="/">E-Shop</Link>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <p>&copy; 2026 E-Shop, Inc. or its affiliates</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

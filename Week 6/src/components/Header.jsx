import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onOpenSidenav }) => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* Brand */}
                    <Link className="navbar-brand me-4" to="/">
                        <i className="fa-solid fa-cart-shopping me-2"></i>E-Shop
                    </Link>

                    {/* Mobile Toggle */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Content */}
                    <div className="collapse navbar-collapse" id="navbarContent">

                        {/* Search Bar */}
                        <form className="d-flex navbar-search my-2 my-lg-0" role="search">
                            <div className="input-group">
                                <input className="form-control" type="search" placeholder="Search E-Shop" aria-label="Search" />
                                <button className="btn btn-search" type="submit">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>

                        {/* Nav Links */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <div className="small">Hello, Sign in</div>
                                    <div className="fw-bold">Account & Lists</div>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link position-relative" to="/cart">
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                    <span className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle rounded-pill" id="cart-badge-count">0</span>
                                    <span className="fw-bold ms-1">Cart</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sub-header for Categories */}
            <div className="bg-dark text-white py-1 px-3 d-none d-lg-block" style={{ backgroundColor: '#232f3e' }}>
                <div className="container-fluid d-flex align-items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); onOpenSidenav(); }} id="nav-hamburger-menu" className="text-white text-decoration-none me-3">
                        <i className="fa-solid fa-bars me-1"></i>
                    </a>
                    <Link to="/products" className="text-white text-decoration-none me-3">All Products</Link>
                    <Link to="/todays-deals" className="text-white text-decoration-none me-3">Today's Deals</Link>
                    <Link to="/customer-service" className="text-white text-decoration-none me-3">Customer Service</Link>
                    <Link to="/registry" className="text-white text-decoration-none me-3">Registry</Link>
                    <Link to="/gift-cards" className="text-white text-decoration-none me-3">Gift Cards</Link>
                    <Link to="/sell" className="text-white text-decoration-none me-3">Sell</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

const Sidenav = ({ isOpen, onClose, user, onLogout }) => {
    return (
        <>
            <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
                <div className="sidenav-header">
                    <i className="fa-solid fa-user-circle"></i> Hello, {user ? user.name : 'Sign in'}
                </div>
                <div className="sidenav-content">
                    <div className="sidenav-section-title">Shop By Department</div>
                    <Link to="/products?category=electronics" onClick={onClose}>Electronics <i className="fa-solid fa-chevron-right text-muted"></i></Link>
                    <Link to="/products?category=computers" onClick={onClose}>Computers <i className="fa-solid fa-chevron-right text-muted"></i></Link>
                    <Link to="/products?category=smart-home" onClick={onClose}>Smart Home <i className="fa-solid fa-chevron-right text-muted"></i></Link>
                    <Link to="/products?category=arts-crafts" onClick={onClose}>Arts & Crafts <i className="fa-solid fa-chevron-right text-muted"></i></Link>

                    <div className="sidenav-divider"></div>

                    <div className="sidenav-section-title">Programs & Features</div>
                    <Link to="/gift-cards" onClick={onClose}>Gift Cards <i className="fa-solid fa-chevron-right text-muted"></i></Link>
                    <Link to="/registry" onClick={onClose}>Registry <i className="fa-solid fa-chevron-right text-muted"></i></Link>
                    <Link to="/sell" onClick={onClose}>Sell on E-Shop <i className="fa-solid fa-chevron-right text-muted"></i></Link>

                    <div className="sidenav-divider"></div>

                    <div className="sidenav-section-title">Help & Settings</div>
                    <Link to="/customer-service" onClick={onClose}>Customer Service</Link>
                    {user ? (
                        <Link to="#" onClick={() => { onLogout(); onClose(); }}>Sign Out</Link>
                    ) : (
                        <Link to="/login" onClick={onClose}>Sign In</Link>
                    )}
                </div>
            </div>

            <div id="overlay" className={`overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
            <div id="closeBtn" className={`close-btn-container ${isOpen ? 'show' : ''}`} onClick={onClose}>&times;</div>
        </>
    );
};

export default Sidenav;

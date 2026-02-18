import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidenav from './Sidenav';
import { Outlet } from 'react-router-dom';

const Layout = ({ cartItems = [], addToCart, removeFromCart, updateQty, user, logoutUser, loginUser }) => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    const closeSidenav = () => {
        setIsSidenavOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar onOpenSidenav={toggleSidenav} cartCount={cartCount} user={user} onLogout={logoutUser} />
            <Sidenav isOpen={isSidenavOpen} onClose={closeSidenav} user={user} onLogout={logoutUser} />
            <main style={{ flex: 1 }}>
                <Outlet context={{ cartItems, addToCart, removeFromCart, updateQty, user, loginUser, logoutUser }} />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

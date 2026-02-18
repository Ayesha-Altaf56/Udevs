import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CustomerService from './pages/CustomerService';
import Registry from './pages/Registry';
import GiftCards from './pages/GiftCards';
import Sell from './pages/Sell';
import Invoice from './pages/Invoice';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const loginUser = (name = "User") => {
    setUser({ name });
  };

  const logoutUser = () => {
    setUser(null);
  };

  const addToCart = (product, qty = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [...prevItems, { ...product, qty }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} updateQty={updateQty} user={user} logoutUser={logoutUser} loginUser={loginUser} />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product-details" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="todays-deals" element={<Products view="deals" />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="registry" element={<Registry />} />
          <Route path="gift-cards" element={<GiftCards />} />
          <Route path="sell" element={<Sell />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>

        <Route path="/login" element={<Login onLogin={loginUser} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

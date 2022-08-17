import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Shop from '../pages/Shop';
import SignUp from '../pages/SignUp';
import Product from '../pages/Product';
import Checkout from '../pages/Checkout';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/" element={<Shop />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default Navigation;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Shop from '../pages/Shop';
import About from '../pages/About';
import Contact from '../pages/Contact';
import SignUp from '../pages/SignUp';
import Product from '../pages/Product';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/" element={<Shop />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
};

export default Navigation;

import React from 'react';
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" />
      <Route path="/about" />
      <Route path="/contact" />
      <Route path="/sale" />
    </Routes>
  );
};

export default Navigation;

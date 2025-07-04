import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from './pages/Checkout';
import { HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { getCartApi } from "./api";

export default function App() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);

  const loadCart = () => {
  getCartApi().then(res => {
    const items = res.data.items.map(it => ({
      ...it.product,
      quantity: it.quantity,
      total: it.totalPrice,
      shippable: it.product.shippable,
      weight: it.product.weight
    }));
    setCart(items);
  });
};


  return (
    <div className="w-full flex flex-col bg-gray-100">
      <Router>
          <nav className="bg-white p-4 shadow flex">
            <Link to="/" className="text-pink-950 hover:text-pink-800 pr-4"><HomeIcon className="h-6 w-6" /></Link>
            <Link to="/cart" className="text-pink-950 hover:text-pink-800 pr-4">
              <ShoppingCartIcon className="h-6 w-6 relative" />
              {cart.length > 0 && (
                <span className="absolute top-1 left-20 text-xs bg-pink-900 text-white rounded-full px-1 w-fit">
                  {cart.length}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex-grow w-full">
            <Routes>
              <Route path="/" element={
                <Home 
                  cart={cart} 
                  setCart={setCart} 
                  customer={customer} 
                  setCustomer={setCustomer} 
                  loadCart={loadCart}
                />
              } />
              <Route path="/cart" element={
                <Cart 
                  cart={cart} 
                  setCart={setCart} 
                  customer={customer} 
                  setCustomer={setCustomer}
                  loadCart={loadCart} 
                />
              } />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
      </Router>
    </div>
  );
}

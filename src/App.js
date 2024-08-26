// src/App.js
import React, { useState, useEffect } from 'react';
import ProductCatalog from './components/Catalog/ProductCatalog';
import ShoppingCart from './components/Cart/ShoppingCart';
import './App.css';

function App() {
  // Initialize cart state with data from localStorage or an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart data to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  return (
    <div className="App">
      <ProductCatalog addToCart={addToCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;

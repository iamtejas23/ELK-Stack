// src/components/ShoppingCart.js
import React from 'react';

const ShoppingCart = ({ cart, removeFromCart }) => {
  return (
    <div className="cart-container p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-white">Shopping Cart</h2>
      <div className="cart-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cart.map(item => (
          <div key={item.id} className="cart-item flex flex-col items-center p-4 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover mb-2 rounded" />
            <h3 className="text-lg font-medium mb-1 text-gray-900">{item.title}</h3>
            <p className="text-gray-700 mb-2">${item.price.toFixed(2)}</p>
            <button 
              onClick={() => removeFromCart(item)} 
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <p className="total text-lg font-semibold mt-6 text-white">
        Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </p>
    </div>
  );
};

export default ShoppingCart;

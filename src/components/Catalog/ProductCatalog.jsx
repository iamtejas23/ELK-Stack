// src/components/ProductCatalog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCatalog = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = () => {
    if (sortBy === 'price-low-to-high') {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-to-low') {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    } else {
      return filteredProducts;
    }
  };

  return (
    <div className="product-cat p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-white">Acme</h2>
      <div className="search-and-sort flex flex-col sm:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-auto mb-4 sm:mb-0 p-3 border border-gray-300 rounded shadow-inner bg-opacity-20 bg-black text-black"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-auto p-3 border border-gray-300 rounded shadow-inner bg-opacity-20 bg-white text-black"
        >
          <option value="">Sort by</option>
          <option value="price-low-to-high">Price Low to High</option>
          <option value="price-high-to-low">Price High to Low</option>
        </select>
      </div>
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts().map(product => (
          <div key={product.id} className="product flex flex-col items-center p-4 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
            <img src={product.image} alt={product.title} className="w-full h-55 object-cover mb-2 rounded" />
            <h3 className="text-lg font-medium mb-1 text-gray-900">{product.title}</h3>
            <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;

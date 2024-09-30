

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getproduct');
        const data = response.data.data; // Adjusted for API structure

        if (Array.isArray(data)) {
          setProducts(data);
          filterProducts(data, searchQuery);
        } else {
          console.error('Invalid data format:', data);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    filterProducts(products, searchQuery);
  }, [searchQuery, products]);

  const filterProducts = (products, query) => {
    if (!query) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="search-results p-4">
      <div className='flex text-blue-400 pt-8 text-2xl gap-4 mb-6'>
        <h1>Result For</h1>
        <span className='text-xl text-red-500'>{searchQuery}</span>
      </div>
    

<div className="products-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
       {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card bg-white shadow-md rounded-lg p-4 flex flex-col">
              <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-t-lg" />
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-green-600">${product.price}</p>
              <p className="text-gray-600 my-4">{product.description}</p>
              <button className="bg-black text-white py-2 rounded">View Product</button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products found for your search.</p>
        )}
      </div>
    </div>




  );
};

export default SearchResults;

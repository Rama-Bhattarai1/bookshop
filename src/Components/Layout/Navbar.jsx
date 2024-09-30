

import React, { useState, useEffect, useContext } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../Details/Cartcontext';
import axios from 'axios';

const Navbar = () => { // Accept cartItems as a prop
    const navigate = useNavigate();
    const { token, logout } = useContext(AuthContext);
   
      const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
    const { cartItems } = useContext(CartContext); 
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/getproduct');
            const data = response.data.data; // Adjusted for API structure
    
            if (Array.isArray(data)) {
              data.sort((a, b) => a.name.localeCompare(b.name));
              setProducts(data);
            } else {
              console.error('Fetched data is not an array:', data);
            }
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        fetchProducts();
      }, []);
    
      const binarySearch = (sortedArray, query) => {
        let left = 0;
        let right = sortedArray.length - 1;
        const result = [];
    
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          const currentProduct = sortedArray[mid];
    
          if (
            currentProduct.name.toLowerCase().includes(query.toLowerCase()) ||
            currentProduct.price.toString().includes(query)
          ) {
            result.push(currentProduct);
    
            // Expand to the left
            let leftIndex = mid - 1;
            while (leftIndex >= 0 && 
                   (sortedArray[leftIndex].name.toLowerCase().includes(query.toLowerCase()) || 
                    sortedArray[leftIndex].price.toString().includes(query))) {
              result.push(sortedArray[leftIndex]);
              leftIndex--;
            }
    
            // Expand to the right
            let rightIndex = mid + 1;
            while (rightIndex < sortedArray.length && 
                   (sortedArray[rightIndex].name.toLowerCase().includes(query.toLowerCase()) || 
                    sortedArray[rightIndex].price.toString().includes(query))) {
              result.push(sortedArray[rightIndex]);
              rightIndex++;
            }
            break;
          } else if (currentProduct.name.toLowerCase() < query.toLowerCase()) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        return result;
      };
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
    
      const handleSearchSubmit = (e) => {
        e.preventDefault();
    
        if (searchQuery) {
          const searchResults = binarySearch(products, searchQuery);
          navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
      };
    
    const handleLogout = async () => {
        try {
            await logout(); 
            navigate('/login'); 
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className="bg-black text-white">
            <ul className="flex justify-between gap-2 p-4">
                <div className='flex gap-4'>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/shop"><li>Shop</li></Link>
                    <Link to="/orders"><li>Orders</li></Link>
                    <Link to="/contact"><li>Contact</li></Link>
                    <Link to="/about"><li>About</li></Link>
                </div>
                <div className="flex items-center relative">
                    
              
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                        <input
                           value={searchQuery}
                name="searchQuery"
                onChange={handleSearchChange}
                            type="text"
                            placeholder="Search your product"
                            className="w-60 rounded-full p-2 bg-gray-500 text-white"
                        />
                        <FaSearch className="absolute right-4 text-white" />
                    </form>
                </div>
                <div className='flex gap-4 items-center'>
                    {token ? (
                        <>
                            <Link to="/cart" className="relative">
                                <FaShoppingCart />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                                    {cartItems.length} {/* Display the length of cartItems */}
                                </span>
                            </Link>
                            <button onClick={handleLogout} className='bg-red-500 text-white p-2 rounded'>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className='bg-blue-500 text-white p-2 rounded'>
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Navbar;



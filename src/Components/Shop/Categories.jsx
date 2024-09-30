
import React, { useState, useEffect } from 'react';
import { TbCategoryMinus } from "react-icons/tb";
import axios from 'axios';

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        setCategories(response.data.data || []); // Set categories from the API response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!categories.length) {
    return <div>No categories available</div>;
  }

  return (
    <div className="relative group">
      <button className="flex items-center hover:text-slate-200 px-10 pb-2 text-sm font-semibold text-left uppercase bg-transparent rounded-lg focus:outline-none font-montserrat">
        <span className='flex'><TbCategoryMinus className='h-4 w-4' />ALL Categories</span>
      </button>
      <div className="absolute z-10 hidden bg-gray-200 group-hover:block">
        <div className="px-2 pt-2 pb-4 bg-white shadow-lg  w-40 text-center  rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            {/* "All" option */}
            <div
              className="relative bg-slate-200 block select-none items-center whitespace-nowrap rounded-lg border-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-red-700"
              onClick={props.fetchAllProducts}  // Fetch all products when "All" is clicked
            >
              <span className="text-gray-500  p-1 rounded-lg">ALL</span>
            </div>

            {/* Category options */}
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative bg-blue-200 block select-none items-center whitespace-nowrap rounded-lg border-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-700"
                onClick={() => props.fetchProductsByCategory(category.id)}  // Fetch products by category
              >
                <span className="text-gray-500 hover:bg-slate-200 p-1 rounded-lg ">
                  {category.name} {/* Display the category name */}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;

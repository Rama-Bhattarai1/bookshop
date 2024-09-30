

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import * as Images from "../../Assest/Images";
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getproduct?limit=4');
        
        setBooks(response.data.data || []); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching featured collections:', error);
        setLoading(false); 
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='relative bg-black'>
        <img src={Images.Image_1} alt="Banner" className='w-full h-[400px] opacity-40' />
        <div className='absolute top-10 text-white text-center ml-[200px]'>
          <h1 className='text-6xl p-10'>Books Can Change Your Life</h1>
          <p>Welcome to our book shop</p>
          <button className='bg-blue-600 text-white rounded-2xl p-2 mt-10 ml-10'>
            <Link to="/shop">Shop now</Link>
          </button>
        </div>
      </div>

      <div className='text-center'>
        <section className="featured-collections pb-20 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8 pt-8">Featured Collections</h2>
          <div className="collections-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
            {books.map((item,index) => (
             
              <div key={index} className="collection-card bg-white shadow-md rounded-lg p-4 flex flex-col">
                <img src={item.image} alt={item.name} className="w-full h-60 object-cover rounded-lg" />
                <div className='flex gap-10'>
                  <h3 className="text-lg font-semibold mt-4 w-64 h-4">{item.name}</h3>
                </div>
                <p className="text-gray-600  my-4">{item.description}</p>
                   <Link to={`/bookdetail/${item.id}`}
                  className="bg-primary text-red-400 text-center py-2 mb-3 flex justify-center rounded-lg px-5 mt-3"
                >
                  View Product
                </Link>
              </div>
             
            ))}
          </div>
          <div className='text-center mt-4'>
            <Link to="/shop" className='text-blue-500 hover:underline pb-4'>View More</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

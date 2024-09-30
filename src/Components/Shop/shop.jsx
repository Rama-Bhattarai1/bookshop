import { useEffect, useState } from 'react';
import axios from 'axios';
import Categories from './Categories';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from the API
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getproduct');
      setBooks(response.data.data || []); // Update books with all products
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts(); // Fetch all products on initial load
  }, []);

  // Fetch products by category
  const fetchProductsByCategory = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/singlecategory/${id}`);
      const products = response.data.data.product;

      if (products) {
        setBooks(products); // Update books with category-specific products
      } else {
        setBooks([]); // No products for this category
      }
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='uppercase text-white bg-blue-200 text-center font-bold text-2xl p-6 mb-6'>Shop</h1>
      <div>
        {/* Categories component with filter and "All" functionality */}
        <Categories fetchProductsByCategory={fetchProductsByCategory} fetchAllProducts={fetchAllProducts} />
      </div>
      <div className="collections-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
        {books.map((item, index) => (
          <div key={index} className="collection-card bg-white shadow-md rounded-lg p-4 flex flex-col">
            <Link to={`/bookdetail/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover rounded-lg"
              />
            </Link>
            <div className='flex flex-col justify-between mt-4'>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              
              {/* Full description is displayed without being hidden */}
              <div className="text-gray-600 my-4 ">
                {item.description}
              </div>
              
              <p className='text-red-800 text-2xl'>Only: {item.stock} product left</p>
            </div>
            <Link 
              to={`/bookdetail/${item.id}`} 
              className="bg-black rounded-lg p-2 text-white text-center py-2 mb-3 flex justify-center px-5 mt-3"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

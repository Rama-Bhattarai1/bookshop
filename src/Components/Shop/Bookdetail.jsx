
import React, { useEffect, useState,useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Details/Cartcontext';

const Bookdetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext); 
  const [cartMessage, setCartMessage] = useState('');


  const [newReview, setNewReview] = useState({ user: '', rating: '', comment: '' });
 const [reviews, setReviews] = useState([]);
  const [activeProductIndices, setActiveProductIndices] = useState([0, 1, 2]);
  // const { handleAddToCart } = useContext(CartContext);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`http://127.0.0.1:8000/api/getsingleproduct/${id}`);
        const productData = productResponse.data.data; // Access the `data` property

        console.log('Fetched product data:', productData);

        if (productData) {
          setProduct(productData);
          setReviews(productData.reviews || []);

          // Check if category exists and has an ID
          if (productData.category && productData.category.id) {
            const relatedResponse = await axios.get(`http://127.0.0.1:8000/api/singlecategory/${productData.category.id}`);
            const relatedData = Array.isArray(relatedResponse.data) ? relatedResponse.data : [];
            
            // Filter out the current product
            const filteredRelatedProducts = relatedData.filter(item => item.id !== productData.id);
            console.log('Fetched related products data:', filteredRelatedProducts);
            setRelatedProducts(filteredRelatedProducts);
          } else {
            setError(new Error('Product category not found'));
          }
        } else {
          setError(new Error('Product not found'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = async () => {
    await addToCart(product); // Add product to cart via API call
    setCartMessage('Product added to cart successfully!');
};

if (!product) return <div>Loading...</div>;

 
  // const handleAddReview = async () => {
  //   if (newReview.user && newReview.rating && newReview.comment) {
  //     try {
  //       const updatedReviews = [...reviews, newReview];
  //       const averageRating = updatedReviews.reduce((acc, review) => acc + Number(review.rating), 0) / updatedReviews.length;

  //       await axios.patch(`http://127.0.0.1:8000/api/getsingleproduct/${product.id}`, {
  //         reviews: updatedReviews,
  //         rating: averageRating
  //       });

  //       setReviews(updatedReviews);
  //       setNewReview({ user: '', rating: '', comment: '' });
  //     } catch (err) {
  //       setError(err);
  //     }
  //   } else {
  //     alert("Please fill out all fields.");
  //   }
  // };

  // const handleImageClick = () => {
  //   setActiveProductIndices(prevIndices => {
  //     const nextIndices = prevIndices.map(index => (index + 1) % relatedProducts.length);
  //     return nextIndices;
  //   });
  // };

  // const renderStarRating = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <span key={i} className={`text-${rating >= i ? 'yellow' : 'gray'}-500`}>
  //         ★
  //       </span>
  //     );
  //   }
  //   return stars;
  // };

  // const averageRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0) / reviews.length || 0;
  // const reviewCount = reviews.length;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  // const activeRelatedProducts = activeProductIndices.map(index => relatedProducts[index] || {});

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className='flex flex-col lg:flex-row gap-10'>
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-[300px] h-80 rounded-lg border-zinc border-2 transform transition-transform hover:scale-110 mb-10"
          />
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg">Price: ${product.price}</p>
          <p>Category: {product.category ? product.category.name : "Unknown"}</p>
          
          <p>Available: {product.stock > 0 ? product.stock : "Out of Stock"}</p>
          <p>{product.description}</p>
         
         
          {/* <div className="flex items-center gap-2 mt-2">
            {renderStarRating(averageRating)}
            <span className="ml-2 text-gray-600">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
          </div> */}
          {product.stock > 0 ? (
            <button onClick={handleAddToCart} className='bg-black text-white border-black rounded-lg p-2'>
              Add to Cart
            </button>
          ) : (
            <button className='bg-gray-500 text-white border-black rounded-lg p-2' disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
{/* 
      <div className="mt-8 lg:ml-10">
        <h2 className="text-xl font-bold">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border border-gray-200 mt-4 p-2 shadow-md bg-white rounded-lg">
              <div className="font-bold">{review.user}</div>
              <div className="text-yellow-500">
                {renderStarRating(Number(review.rating))}
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Add Your Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            className="border p-2 w-full shadow-md bg-white rounded-lg mt-4"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            className="border p-2 w-full shadow-md bg-white rounded-lg mt-4"
            min="1"
            max="5"
          />
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="border p-2 w-full shadow-md bg-white rounded-lg mt-4"
          />
          <div>
            <button onClick={handleAddReview} className="bg-blue-500 text-white p-2 rounded-lg mt-4">
              Submit Review
            </button>
          </div>
        </div>
      </div>

      {activeRelatedProducts.length > 0 && (
        <div className="mt-8 lg:ml-10">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="flex gap-4">
            {activeRelatedProducts.map((relatedProduct, index) => (
              relatedProduct.id ? (
                <Link to={`/bookdetail/${relatedProduct.id}`} key={relatedProduct.id}>
                  <div className="mb-4" onClick={handleImageClick}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-20 rounded-lg border-zinc border-2 transform transition-transform hover:scale-110 cursor-pointer"
                    />
                    <p className="text-center mt-2">{relatedProduct.name}</p>
                  </div>
                </Link>
              ) : null
            ))}
          </div>
        </div> */}
      {/* )} */}
    </div>
  );
};

export default Bookdetail;



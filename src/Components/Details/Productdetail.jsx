// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ProductDetail = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [downloadLink, setDownloadLink] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/products/${id}`);
//         setProduct(response.data);
//         setReviews(JSON.parse(response.data.reviews));
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handlePayment = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/checkout', { productId: id });
//       setPaymentStatus('success');
//       setDownloadLink(response.data.downloadLink); // Get download link from the response
//     } catch (error) {
//       setPaymentStatus('failed');
//       setError(error);
//     }
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:5000/products/${id}/review`, newReview);
//       setReviews([...reviews, response.data]);
//       setNewReview({ rating: 0, comment: '' });
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className='p-6'>
//       <h1 className='text-2xl font-bold'>{product.title}</h1>
//       <img src={product.img} alt={product.title} className='w-80 h-auto rounded-lg' />
//       <div className='mt-4'>
//         <p><strong>Category:</strong> {product.category}</p>
//         <p><strong>Price:</strong> ${product.price}</p>
//         <p><strong>Description:</strong> {product.description}</p>
//       </div>
//       <div className='mt-4'>
//         {paymentStatus === 'success' ? (
//           downloadLink ? (
//             <a href={downloadLink} download className='bg-blue-500 text-white p-2 rounded'>
//               Download PDF
//             </a>
//           ) : (
//             <p>Processing download link...</p>
//           )
//         ) : (
//           <button onClick={handlePayment} className='bg-green-500 text-white p-2 rounded'>
//             Pay to Download PDF
//           </button>
//         )}
//         {paymentStatus === 'failed' && <p className='text-red-500'>Payment failed. Please try again.</p>}
//       </div>
//       <div className='mt-4'>
//         <h2 className='text-xl font-bold'>Reviews</h2>
//         {reviews.length > 0 ? (
//           reviews.map((review, index) => (
//             <div key={index} className='border p-2 mt-2'>
//               <p><strong>Rating:</strong> {review.rating}/5</p>
//               <p>{review.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//         <form onSubmit={handleReviewSubmit} className='mt-4'>
//           <div>
//             <label>Rating: </label>
//             <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} required>
//               <option value={0}>Select rating</option>
//               <option value={1}>1</option>
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//             </select>
//           </div>
//           <div>
//             <label>Comment: </label>
//             <textarea
//               value={newReview.comment}
//               onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//               required
//             />
//           </div>
//           <button type='submit' className='bg-blue-500 text-white p-2 rounded mt-2'>Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // export default ProductDetail;
// import React, { useState } from 'react';

// const Productdetail = () => {
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [downloadLink, setDownloadLink] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

//   const product = {
//     id: "1",
//     title: "Sample Book Title",
//     img: "/Images/image3.jpg",
//     category: "Fiction",
//     price: "10.00",
//     description: "This is a description of the book.",
//     pdfPath: "/path/to/book.pdf",
//   };

//   const handlePayment = () => {
//     // Simulate a successful payment and generate a download link
//     setPaymentStatus('success');
//     setDownloadLink(product.pdfPath);
//   };

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     setReviews([...reviews, newReview]);
//     setNewReview({ rating: 0, comment: '' });
//   };

//   return (
//     <div className='p-6'>
//       <h1 className='text-2xl font-bold'>{product.title}</h1>
//       <img src={product.img} alt={product.title} className='w-80 h-auto rounded-lg' />
//       <div className='mt-4'>
//         <p><strong>Category:</strong> {product.category}</p>
//         <p><strong>Price:</strong> ${product.price}</p>
//         <p><strong>Description:</strong> {product.description}</p>
//       </div>
//       <div className='mt-4'>
//         {paymentStatus === 'success' ? (
//           downloadLink ? (
//             <a href={downloadLink} download className='bg-blue-500 text-white p-2 rounded'>
//               Download PDF
//             </a>
//           ) : (
//             <p>Processing download link...</p>
//           )
//         ) : (
//           <button onClick={handlePayment} className='bg-green-500 text-white p-2 rounded'>
//             Pay to Download PDF
//           </button>
//         )}
//         {paymentStatus === 'failed' && <p className='text-red-500'>Payment failed. Please try again.</p>}
//       </div>
//       <div className='mt-4'>
//         <h2 className='text-xl font-bold'>Reviews</h2>
//         {reviews.length > 0 ? (
//           reviews.map((review, index) => (
//             <div key={index} className='border p-2 mt-2'>
//               <p><strong>Rating:</strong> {review.rating}/5</p>
//               <p>{review.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//         <form onSubmit={handleReviewSubmit} className='mt-4'>
//           <div>
//             <label>Rating: </label>
//             <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} required>
//               <option value={0}>Select rating</option>
//               <option value={1}>1</option>
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//             </select>
//           </div>
//           <div>
//             <label>Comment: </label>
//             <textarea
//               value={newReview.comment}
//               onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//               required
//             />
//           </div>
//          <Link><button type='submit' className='bg-blue-500 text-white p-2 rounded mt-2'>Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Productdetail;

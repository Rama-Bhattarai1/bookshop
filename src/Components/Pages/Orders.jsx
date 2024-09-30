

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchOrderHistory = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/getOrder/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        });

        const data = response.data;
        setOrderHistory(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setError('Error fetching order history.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col items-center">
        <div className="w-full">
          <h3 className="text-2xl font-bold mb-4 text-primary ml-8">Order History</h3>
          <div className="p-6">
            {orderHistory.length > 0 ? (
              orderHistory.map(order => (
                <div key={order.id} className="bg-white px-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between">
                  <div className='flex gap-16 text-center'>
                    {order.order_items.map(item => (
                      <div key={item.id} className="flex gap-16">
                        <img 
                          src={`http://127.0.0.1:8000/storage/${item.product.image}`} 
                          alt={item.product.name} 
                          className="w-24 h-24 object-cover rounded-lg shadow-sm"
                        />
                        <div className="p-6">
                          <h4 className="text-xl font-semibold text-primary">{item.product.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-gray-600">Price: ${item.product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">Total: ${order.total}</p>
                    {order.pdfPath && ( // Check if pdfPath exists
                      <a 
                        href={`http://127.0.0.1:8000/storage/${order.product.pdf}`} 
                        download 
                        className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

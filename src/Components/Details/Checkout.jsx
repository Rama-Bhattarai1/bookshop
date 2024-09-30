


import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const CheckoutPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { cart = { products: [] } } = location.state || {};

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/provinces');
        const result = await response.json();
        setProvinces(result.data || []);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/districts');
        const result = await response.json();
        setAllDistricts(result.data || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const filtered = allDistricts.filter(
        (district) => district.province_id === parseInt(selectedProvince)
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedProvince, allDistricts]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const total = cart.products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID is required. Please log in.');
      return;
    }

    const invoice = Date.now().toString(); // Generate the invoice

    const orderData = {
      user_id: userId,
      name: `${firstName} ${lastName}`,
      phoneno: phoneNo,
      province: selectedProvince,
      district: selectedDistrict,
      city: city,
      postalcode: postalCode,
      streetaddress: streetAddress,
      total: total,
      status: 'pending',
      invoice: invoice, // Include invoice in order data
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');

        // Navigate to epay.js, passing the order details, total amount, and invoice
        navigate('/Epay', { 
          state: { 
            order: result.order, 
            totalAmount: total, 
            invoice: invoice // Pass the invoice to epay.js 
          } 
        });
      } else {
        alert(result.message || 'Error placing order');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  if (cart.products.length === 0) {
    return <div className="text-center mt-4 text-red-600">No cart items available</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex items-center p-4 mx-8 text-gray-700">
        <Link to="/home" className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to="/checkout" className="hover:text-blue-600 font-bold">Checkout</Link>
      </div>

      <div className="container mx-auto px-6 mb-10 bg-gray-50">
        <h2 className="text-2xl font-bold m-4 text-gray-800">Check Out</h2>

        <div className="flex justify-between gap-10">
          {/* Shipping Address Form */}
          <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-3xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Shipping Address</h3>

            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-gray-600 mb-2">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-gray-600 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm text-gray-600 mb-2">Phone No.</label>
                <input
                  id="phone"
                  type="text"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="province" className="block text-sm text-gray-600 mb-2">Province</label>
                  <select
                    id="province"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="district" className="block text-sm text-gray-600 mb-2">District</label>
                  <select
                    id="district"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedProvince}
                  >
                    <option value="">Select District</option>
                    {filteredDistricts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-sm text-gray-600 mb-2">City</label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm text-gray-600 mb-2">Postal Code</label>
                  <input
                    id="postalCode"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Enter your postal code"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="streetAddress" className="block text-sm text-gray-600 mb-2">Street Address</label>
                <input
                  id="streetAddress"
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </form>
          </div>

           {/* Billing Details */}
          <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Billing Details</h3>

            <ul className="space-y-4 mb-6">
              {cart.products.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-700">{item.name}</h4>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            <div className="flex justify-between text-lg font-semibold text-gray-700">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


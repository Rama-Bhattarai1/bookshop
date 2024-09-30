import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from 'react-icons/md';
import { FaUser, FaLock } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    user: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    user: '',
    email: '',
    password: '',
    form: ''
  });

  const [showSignupForm, setShowSignupForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCrossClick = () => {
    setShowSignupForm(false);
  };

  const validateForm = () => {
    let isValid = true;
    const error = { user: '', email: '', password: '' };

    if (!values.user) {
      error.user = 'Username is required';
      isValid = false;
    } else if (values.user.length < 4) {
      error.user = 'Username must be at least 6 characters long';
      isValid = false;
    }

    if (!values.email) {
      error.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error.email = 'Email is not valid';
      isValid = false;
    }

    if (!values.password) {
      error.password = 'Password is required';
      isValid = false;
    } else if (values.password.length < 6) {
      error.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup', {
        name: values.user,
        email: values.email,
        password: values.password,
      });

      // Axios automatically parses response, no need to use .json()
      if (response.status === 201 || response.status === 200) {
        // Registration successful, redirect to login
        navigate('/login');
      } else {
        // Handle any other non-200 status
        setErrors((prev) => ({ ...prev, form: 'Registration failed' }));
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        // Display server error message if available
        setErrors((prev) => ({ ...prev, form: error.response.data.message || 'Registration failed' }));
      } else {
        setErrors((prev) => ({ ...prev, form: 'An unexpected error occurred' }));
      }
    }
  };

  return (
    showSignupForm && (
      <div className="border border-2 border-black rounded-lg w-[350px] h-auto bg-gray-200 mt-32 ml-80 mb-4">
        <div className="flex justify-between border-b border-black pb-5">
          <h1 className="text-3xl text-white">Signup</h1>
          <RxCross2 className="text-primary w-8 h-8 mt-2 cursor-pointer" onClick={handleCrossClick} />
        </div>

        <form onSubmit={handleSubmit} className="ml-8 items-center justify-center mt-0">
          <div className="flex mt-6 relative">
            <input
              type="text"
              name="user"
              value={values.user}
              onChange={handleChange}
              placeholder="Username"
              className="bg-gray-500 text-white p-2 rounded-lg w-[270px]"
            />
            <FaUser className="absolute top-4 right-4" />
          </div>
          {errors.user && <p className="text-red-500 mt-2">{errors.user}</p>}

          <div className="flex mt-6 relative">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-gray-500 text-white p-2 rounded-lg w-[270px]"
            />
            <MdOutlineEmail className="absolute top-4 right-4" />
          </div>
          {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}

          <div className="flex mt-6 relative">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-gray-500 text-white p-2 rounded-lg w-[270px]"
            />
            <FaLock className="absolute top-4 right-4" />
          </div>
          {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}

          {errors.form && <p className="text-red-500 mt-4">{errors.form}</p>}

          <button type="submit" className="border border-2 bg-gray-800 text-white rounded-lg w-[270px] p-2 mt-6 font-bold">
            Signup
          </button>
          <p className="text-black mt-4 ml-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </form>
      </div>
    )
  );
};

export default Register;

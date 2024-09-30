import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const error = { email: '', password: '' };

    if (!values.email) {
      error.email = 'Email is required';
      isValid = false;
    }
    if (!values.password) {
      error.password = 'Password is required';
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/signin', {
          email: values.email,
          password: values.password,
        });

        const data = response.data;

        if (response.status === 200) {
          const { token, id } = data;
          login(token, id);
          navigate('/');
        } else {
          alert('Incorrect email or password.');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <div className="border border-2 border-black rounded-lg w-[350px] h-[400px] bg-gray-200 mt-32 ml-80">
      <div className="flex justify-between border-b border-black pb-5">
        <h1 className="text-3xl text-black">Login</h1>
        <RxCross2 className="text-primary w-8 h-8 mt-2 cursor-pointer" />
      </div>
      <form onSubmit={handleSubmit} className="ml-8 items-center justify-center">
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
        {errors.password && <p className="text-red-500 pt-1.5">{errors.password}</p>}
        <button
          type="submit"
          className="border border-2 bg-gray-800 text-white rounded-lg w-[270px] p-2 mt-6 font-bold"
        >
          Login
        </button>
        <p className="mt-4 text-center text-black">
          Don't have an account? <a href="/register" className="text-blue-500">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

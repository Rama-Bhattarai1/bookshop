import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const login = (token, id) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem('token', token);
    localStorage.setItem('userId',id);
  };
  
 
  const logout = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/signout', 
        null, 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct authorization format
          },
        }
      );
  
      if (response.status === 200) {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
   
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

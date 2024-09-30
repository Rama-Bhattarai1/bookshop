// // src/components/ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { token } = useContext(AuthContext);

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; 
  }

  return children; 
};
export default ProtectedRoute;
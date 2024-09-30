// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './Components/Details/Cartcontext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

    <AuthProvider>
    <CartProvider>
        <App />
        </CartProvider>
      </AuthProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();





// src/index.js
// import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { CartContext } from './Components/Details/Cartcontext';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);  // Add your cart state here

//   return (
//     <CartContext.Provider value={{ cartItems, setCartItems }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
     
//         <AuthProvider>
//           <App />
//         </AuthProvider>
   
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();

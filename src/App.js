// import React from 'react'
// import { Route,Routes } from 'react-router-dom'
// import Shop from './Components/Shop/shop'
// import Home from'./Components/Pages/Home'
// import Contact from'./Components/Contact/Contact'
// // import Navbar from './Components/Layout/Navbar'
// import ProdctDetail from './Components/Shop/Prodctdetail'
// import Orders from './Components/Pages/Orders'
// import Cart from './Components/Details/Cart'
// import Login from'./Components/Login/Login'
// import Register from'./Components/Login/Register'
// import SearchResult from './Components/Pages/SearchResult'
// import Adminsidebar from './Components/Layout/Adminsidebar'
// import Adminorders from './Components/Admin/Adminorder'
// import Admincontact from './Components/Admin/Admincontact'
// import Layout from './Components/Layout/Layout'
// // import CheckoutPage from './Components/Details/Checkout'
// const App = () => {
//   return (
//     <>
//   {/* <Navbar/> */}
// {/* <Adminorders/> */}
//       <Routes>
//       <Route path="/" element={<Layout/>}/>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/Shop" element={<Shop/>}/>
//       <Route path="/Orders" element={<Orders/>}/>
//       <Route path="/Adminsidebar" element={<Adminsidebar/>}/>
//       <Route path="/Adminorders" element={<Adminorders/>}/>
//       <Route path="/Admincontact" element={<Admincontact/>}/>
//       <Route path="/Contact" element={<Contact/>}/>
//       <Route path="/Cart" element={<Cart/>}/>
//       <Route path="/login" element={<Login/>}/>
//       <Route path="/Register" element={<Register/>}/>
//       <Route path="/productdetail/:slug" element={<ProdctDetail />} />
//      {/* <Route path="/Checkout" element={<CheckoutPage/>}/> */}
//       <Route path="/search/:searchTerm" element={<SearchResult />} />
//       </Routes>
//     </>
//   )
// }

// export default App
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './Components/Shop/shop';
import Home from './Components/Pages/Home';
import Contact from './Components/Contact/Contact';
import Bookdetail from './Components/Shop/Bookdetail';
import Orders from './Components/Pages/Orders';
import Cart from './Components/Details/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import SearchResult from './Components/Pages/SearchResult';
import Layout from './Components/Layout/Layout';
import Aboutus from './Components/Pages/Aboutus';
import CheckoutPage from './Components/Details/Checkout';
import Epay from './Components/Details/epay';
import ProtectedRoute from './Components/Login/ProtectedRoute';
const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="shop" element={<ProtectedRoute><Shop /></ProtectedRoute>}/>
        <Route path="About" element={<ProtectedRoute><Aboutus/></ProtectedRoute>}/>
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
        <Route path="login" element={<Login /> }/>
        <Route path="register" element={<Register />}/>
        <Route path="/bookdetail/:id" element={<ProtectedRoute><Bookdetail /></ProtectedRoute>}/>
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchResult /></ProtectedRoute>} />

        <Route path="/epay" element={<ProtectedRoute><Epay /></ProtectedRoute>} />
      </Route>
    </Routes>
  
  );
};

export default App;

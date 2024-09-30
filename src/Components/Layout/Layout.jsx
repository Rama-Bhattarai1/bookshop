// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Outlet } from "react-router-dom";
// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Layout;
import React from "react";
import Navbar from '../Layout/Navbar';
import Footer from"../Layout/Footer"; 
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

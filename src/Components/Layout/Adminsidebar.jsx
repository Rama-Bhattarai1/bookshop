// // components/AdminSidebar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaBook, FaUser, FaClipboardList, FaChartBar } from 'react-icons/fa';

// const Adminsidebar = () => {
//   return (
//     <div className="w-64 h-full shadow-md bg-white fixed">
//       <ul className="space-y-4 mt-10">
//         <li className="text-center text-2xl font-bold">Admin Panel</li>
//         <li>
//           <Link to="/Managebooks" className="flex items-center p-3 hover:bg-gray-200">
//             <FaBook className="mr-2"/> Manage Books
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/orders" className="flex items-center p-3 hover:bg-gray-200">
//             <FaClipboardList className="mr-2"/> Manage Orders
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/users" className="flex items-center p-3 hover:bg-gray-200">
//             <FaUser className="mr-2"/> Manage Users
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/analytics" className="flex items-center p-3 hover:bg-gray-200">
//             <FaChartBar className="mr-2"/> Analytics
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Adminsidebar;
// src/components/AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaEnvelope, FaShoppingCart } from 'react-icons/fa';

const Adminsidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Admin Panel</div>
      <ul className="mt-4">
        <li className="hover:bg-gray-700">
          <Link to="/adminorders" className="flex items-center p-4">
            <FaHome className="mr-3" /> Home
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/admin/orders" className="flex items-center p-4">
            <FaShoppingCart className="mr-3" /> Orders
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/admincontact" className="flex items-center p-4">
            <FaEnvelope className="mr-3" /> Messages
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/admin/users" className="flex items-center p-4">
            <FaUsers className="mr-3" /> Users
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/admin/products" className="flex items-center p-4">
            <FaBox className="mr-3" /> Products
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/Home" className="flex items-center p-4">
            <FaBox className="mr-3" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Adminsidebar;

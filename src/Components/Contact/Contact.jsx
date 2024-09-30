
// import React, { useRef, useState } from 'react';

// const Contact = () => {
//   const form = useRef();
//   const [statusMessage, setStatusMessage] = useState('');

//   const sendEmail = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(form.current);

//     const data = {
//       name: formData.get('from_name'),
//       email: formData.get('from_email'),
//       message: formData.get('message'),
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/inquiries', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         setStatusMessage('Message sent successfully!');
//         form.current.reset(); // Clear form
//       } else {
//         setStatusMessage('Failed to send the message.');
//       }
//     } catch (error) {
//       setStatusMessage('Error occurred: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h1 className="uppercase text-white bg-blue-200 text-center font-bold text-2xl p-6 mb-6">Contact Page</h1>
//       <div className="flex mt-10 gap-8 justify-center">
//         <div className="w-[400px] h-[400px] border-2 border-black rounded-lg bg-gray-300">
//           <h1 className="text-3xl text-white font-bold text-center">Contact Form</h1>
//           <form ref={form} onSubmit={sendEmail}>
//             <div className="ml-8">
//               <input
//                 type="name"
//                 name="from_name"
//                 placeholder="Your name*"
//                 className="border rounded-lg border-gray-400 p-4 mb-4 mt-4 w-80"
//                 required
//               />
//               <input
//                 type="email"
//                 name="from_email"
//                 placeholder="Email*"
//                 className="border rounded-lg border-gray-400 p-4 mb-4 w-80"
//                 required
//               />
//               <textarea
//                 name="message"
//                 rows={4}
//                 placeholder="Your message"
//                 className="pt-4 w-80 border rounded-lg border-gray-400"
//                 required
//               />
//               <button className="mt-6 border-2 bg-green-400 text-white p-2 rounded-lg ml-[140px]" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//           {statusMessage && <p className="text-center mt-4">{statusMessage}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;




import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    let formErrors = {};

    if (!name) formErrors.name = 'Name is required.';
    if (!email) {
      formErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email address is invalid.';
    }
    if (!phone) formErrors.phone = 'Phone number is required.';
    if (!message) formErrors.message = 'Message is required.';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate before sending

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/inquiries', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
        setErrors({});
      } else {
        setStatusMessage('Failed to send the message.');
      }
    } catch (error) {
      setStatusMessage('Error occurred: ' + error.message);
    }
  };

  return (
    <div className="">
<h1 className="uppercase text-white bg-blue-200 text-center font-bold text-2xl p-6 mb-6">
        Contact Us
      </h1>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl ml-[400px]">
        <h2 className="text-3xl text-gray-800 font-semibold text-center mb-6">Get in Touch</h2>
        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name*"
              className={`w-full p-4 rounded-lg border-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:border-blue-500 outline-none`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              className={`w-full p-4 rounded-lg border-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:border-blue-500 outline-none`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number*"
              className={`w-full p-4 rounded-lg border-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:border-blue-500 outline-none`}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your Message*"
              className={`w-full p-4 rounded-lg border-2 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } focus:border-blue-500 outline-none`}
              required
            />
            {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Submit
          </button>
        </form>

        {statusMessage && <p className="text-center mt-4 text-lg text-green-600">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;

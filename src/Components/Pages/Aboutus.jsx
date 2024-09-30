import React from 'react';
import * as Images from "../../Assest/Images";
const Aboutus = () => {
  return (
    <div className="shadow-lg bg-white">
      <h1 className='uppercase text-white bg-blue-200 text-center font-bold text-2xl p-6 mb-6'>About us</h1>
      
      <div className="flex  gap-10">
        <div className=" w-[600px] h-[400px] ">
        <img src={Images.Image_1}
        
            alt="Our Team"
            className="rounded-lg"
          />
        </div>
        
        <div className=" w-[400px]">
          <p className="text-lg mb-4">
            Welcome to our bookstore! 
          </p>
          <p className="text-lg mb-4">
            Whether you're a lifelong reader or just discovering the joy of books, we have something for everyone. Our mission is to create a community where book lovers can explore, discuss, and share their favorite reads.
          </p>
          <p className="text-lg">
            We believe in the power of stories to change lives, and we're committed to providing a platform that celebrates the written word. Thank you for being part of our journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;

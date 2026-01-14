import React from "react";

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center'>
      <div className='logo font-bold text-white text-2xl'>
        <span className='text-green-500'>&lt;</span>
        <span>Pass</span>
        <span className='text-green-500'>OP/&gt;</span>
      </div>
      <div className='flex justify-center items-center'>
        Created With <img className='w-6 mx-2' src='heart.png' alt='heart' /> By
        ApnaCollege
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='my-container flex justify-between items-center  px-4 py-5 h-14'>
        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href='http://'>
              Home
            </a>
            <a className='hover:font-bold' href='http://'>
              About
            </a>
            <a className='hover:font-bold' href='http://'>
              Contact
            </a>
          </li>
        </ul> */}
        <button className='text-white bg-green-500 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
          <img className='invert-1 w-10 p-1' src='github2.png' alt='github' />
          <span className='font-bold px-2'>Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

'use client'
import Menu from "./menu";
import React from 'react';

const Header:React.FC = () => {
  return (
    <div className="navbar bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-end py-4">
    
    <a href="/" className="text-2xl font-bold text-primary ml-10">
       Next-Amazona
      </a> 

      {/* Right: CTA Button and Cart */}
      <div className="hidden lg:flex items-center space-x-6">
         <a href="/cart" className="text-gray-600 hover:text-gray-900 transition duration-300">
          <Menu/>
        </a>
      </div>
    </div>
  </div>
  );
};
export default Header;
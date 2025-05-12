import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [sticky, setSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={` flex w-full h-24 max-w-screen-2xl bg-white-500 font-serif container mx-auto md:px-20 lg:px-32 xl:px-48 px-4 fixed top-0 left-0 right-0 z-50 ${sticky ? "shadow-md bg-base-200 duration-200 transition-colors ease-in-out" : ""
        }`}
    >
      
        <div className="navbar-start flex items-center">
          <img className="h-12 md:h-18 mr-4"
            src="/farm-pro-logo.png"
            alt="Farm Pro Logo"
          />
          <Link to="/" className="text-2xl text-black md:text-2xl lg:text-5xl font-bold cursor-pointer">Farm Pro</Link>
        </div>
        <div className="navbar-end space-x-3 lg:space-x-6 flex items-center">
          <Link
            to="/login"
            className="bg-green-800 text-white px-4 md:px-5 lg:px-6 py-2 rounded-md hover:border-2 hover:border-x-lime-100 hover:bg-green-900 transition duration-300 text-xl md:text-2xl font-bold"
          >
            LogIn/SignUp
          </Link>
        </div>
      
    </nav>
  );
}

export default Navbar;
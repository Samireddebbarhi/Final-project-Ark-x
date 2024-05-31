import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaOpencart, FaHeart } from "react-icons/fa";
import Profile from "./Profile";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <nav className="bg-white shadow dark:bg-gray-800 fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/base/home"
            className="text-xl font-semibold text-gray-700 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            <i className="fas fa-angle-double-right cursor-pointer"> OneLand</i>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center">
          <div className="flex space-x-4">
            <Link
              to="/base/home"
              className="text-md font-medium text-gray-800 dark:text-gray-300 hover:text-gray-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/base/mobiles"
              className="text-md font-medium text-gray-800 dark:text-gray-300 hover:text-gray-200 transition-colors duration-200"
            >
              Mobiles
            </Link>
            <Link
              to="/base/laptops"
              className="text-md font-medium text-gray-800 dark:text-gray-300 hover:text-gray-200 transition-colors duration-200"
            >
              Laptops
            </Link>
            <Link
              to="/base/entertainment"
              className="text-md font-medium text-gray-800 dark:text-gray-300 hover:text-gray-200 transition-colors duration-200"
            >
              Entertainment
            </Link>
            <Link
              to="/base/about"
              className="text-md font-medium text-gray-800 dark:text-gray-300 hover:text-gray-200 transition-colors duration-200"
            >
              About
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </span>

          <Link
            to="/base/favourites"
            className="text-gray-600 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400"
          >
            <FaHeart className="text-xl" />
          </Link>
          <Link
            to="/base/cart"
            className="text-gray-600 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400"
          >
            <FaOpencart className="text-xl" />
          </Link>
          <Profile />
          {user && (
            <div className="hidden md:block">
              <p className="text-gray-800 dark:text-gray-200">
                Welcome, {user.customer.name}!
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

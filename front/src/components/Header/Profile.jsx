import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/LoginSlice";

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isLogged = localStorage.getItem("isAuthenticated")
    ? JSON.parse(localStorage.getItem("isAuthenticated"))
    : false;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/base/home");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-600 transition-colors duration-200 transform dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
      >
        <FaRegUser />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
          {!isLogged ? (
            <Link
              to="/login"
              className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Login/Register
              <CiLogin className="ml-2 text-lg" />
            </Link>
          ) : (
            <>
              <Link
                to="/base/profile"
                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Profile
              </Link>
              <button
                className="flex items-center w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleLogout}
              >
                Logout
                <CiLogout className="ml-2 text-lg" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

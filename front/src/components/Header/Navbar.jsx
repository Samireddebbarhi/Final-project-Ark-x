import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaOpencart, FaHeart, FaAngleDoubleRight } from "react-icons/fa";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Profile from "./Profile";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    // Reset selected category when navigating to the home page
    if (location.pathname === "/base/home" && selectedCategory !== "") {
      setSelectedCategory("");
    }
  }, [location.pathname]);

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value);
    navigate(`/base/${value}`);
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-800 fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/base/home"
            className="flex items-center text-xl font-semibold text-gray-700 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setSelectedCategory("")}
          >
            <FaAngleDoubleRight className="mr-2" />
            OneLand
          </Link>
          <Select
            value={selectedCategory}
            placeholder="Select a category…"
            indicator={<KeyboardArrowDown />}
            onChange={handleCategoryChange}
            sx={{
              width: 240,
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            <Option value="">All Categories</Option>
            <Option value="mobiles">Smartphones</Option>
            <Option value="laptops">Laptops</Option>
            <Option value="entertainment">Entertainment</Option>
          </Select>
        </div>

        <div className="flex items-center space-x-6">
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

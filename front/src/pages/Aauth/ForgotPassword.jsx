import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToastMessage } from "../../utils/ShowToastMess";
import Loader from "../../helpers/Loader";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [inputDetails, setInputDetails] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (inputDetails.email !== "") {
        setLoading(true);
        const loginStatus = await axios.post(
          "http://localhost:3001/api/v1/customer/forgotPassword",
          inputDetails
        );
        showToastMessage("success", "Email has been sent! Verify your inbox");
        navigate("/login");
        setLoading(false);
      } else {
        toast.error("Please provide all details");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {loading ? <Loader /> : null}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="py-4 px-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                Forgot Password
              </h2>
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                name="email"
                type="email"
                color="success"
                onChange={handleOnChange}
                className="w-full mt-4"
              />
              <div className="mt-6">
                <button
                  className="w-full flex justify-center bg-blue-500 text-white py-2 px-4 rounded-lg shadow"
                  onClick={handleLogin}
                >
                  Submit
                </button>
              </div>
              <div className="mt-6 text-center">
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ForgotPassword;

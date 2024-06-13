import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import classes from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../../utils/ShowToastMess";
import Loader from "../../helpers/Loader";
import toast, { Toaster } from "react-hot-toast";
import { register } from "../../redux/features/SignUpSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.register);
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (success) {
      showToastMessage("success", "Successful registration");
      navigate("/login");
    } else if (error) {
      showToastMessage("failed", "Something went wrong !!");
    }
  }, [success, error, navigate]);

  const handleSignup = async () => {
    const { name, username, email, password } = signupDetails;

    if (name && username && email && password) {
      dispatch(register(signupDetails));
    } else {
      showToastMessage("error", "Please provide valid credentials");
    }
  };

  return (
    <>
      <div className={classes["main"]}>
        {loading ? <Loader /> : null}
        <div className={classes["container"]}></div>
        <div className={classes["loginContainer"]}>
          <div className={classes["title"]}>Welcome to OneLand Store</div>
          <div className={classes["title"]}>Registration</div>
          <div className={classes["inlineField"]}>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              color="success"
              onChange={handleOnchange}
            />
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              name="username"
              color="success"
              type="text"
              onChange={handleOnchange}
            />
          </div>
          <div className={classes["inlineField"]}>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              color="success"
              type="email"
              onChange={handleOnchange}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              name="password"
              type="password"
              onChange={handleOnchange}
            />
          </div>

          <div className={classes["btnContainer"]}>
            <div className="w-full">
              <div
                className="flex-1 h-full w-56 mx-auto cursor-pointer"
                onClick={handleSignup}
              >
                <div className="flex w-full bg-blue-500 text-white shadow rounded-lg py-2 px-8">
                  <p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-white-800">
                    Signup
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full">
              <div className="flex-1 h-full w-56 mx-auto cursor-pointer">
                <Link to="/login" className={classes["register"]}>
                  <div className="flex w-full bg-blue-500 text-white shadow rounded-lg py-2 px-8">
                    <p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-white-800">
                      Login
                    </p>
                  </div>
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

export default SignUp;

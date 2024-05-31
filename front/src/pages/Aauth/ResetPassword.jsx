import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToastMessage } from "../../utils/ShowToastMess";
import Loader from "../../helpers/Loader";
import toast, { Toaster } from "react-hot-toast";
import classes from "./style.module.scss";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    if (password !== "") {
      try {
        setLoading(true);
        await axios.post(
          `http://localhost:3001/api/v1/customer/resetPassword/${userId}/${token}`,
          { password }
        );
        showToastMessage("success", "Password reset successfully");
        navigate("/login");
        setLoading(false);
      } catch (error) {
        showToastMessage(
          "error",
          error.response?.data?.message || "Something went wrong"
        );
        setLoading(false);
      }
    } else {
      toast.error("Please enter a new password");
    }
  };

  return (
    <>
      <div className={classes["main"]}>
        {loading ? <Loader /> : null}
        <div className={classes["container"]}></div>
        <div className={classes["loginContainer"]}>
          <div className={classes["title"]}>Reset Password</div>
          <TextField
            id="standard-basic"
            label="New Password"
            variant="standard"
            name="password"
            type="password"
            color="success"
            onChange={handlePasswordChange}
          />
          <div className="w-full">
            <div
              className="flex-1 h-full w-56 mx-auto cursor-pointer"
              onClick={handleResetPassword}
            >
              <div className="flex w-full bg-blue-500 text-white shadow rounded-lg py-2 px-8">
                <p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-white-800">
                  Reset Password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ResetPassword;

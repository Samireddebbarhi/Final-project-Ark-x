import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../helper/Loader";
import classes from "./style.module.scss";

const Profile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const loginDetails = await axios.post(
      "https://ecommerceserver-ten.vercel.app/api/auth/getUser",
      { userName: sessionStorage.getItem("userName") }
    );
    setData(loginDetails.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? <Loader /> : null}
      <div className="p-6 m-6 text-center font-bold text-4xl text-indigo-600 shadow-xl rounded  ">
        Profile Details
      </div>
      <div className={classes["contianer"]}>
        <div>
          <span>FirstName</span>
          <span>:</span>
          <span>{data.firstName}</span>          
        </div>
        <div>
          <span>LastName</span>
          <span>:</span>
          <span>{data.lastName}</span>          
        </div>
        <div>
          <span>UserName</span>
          <span>:</span>
          <span>{data.userName}</span>          
        </div>
        <div>
          <span>Email</span>
          <span>:</span>
          <span>{data.email}</span>          
        </div>
        <div>
          <span>UserRole</span>
          <span>:</span>
          <span>{data.userType}</span>          
        </div>

        
        </div>
    </div>
  );
};

export default Profile;

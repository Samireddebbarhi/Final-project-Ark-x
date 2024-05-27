import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../helper/Loader";
import Header from '../../components/header'

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/customer/login",
        { userName: sessionStorage.getItem("userName") }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Header/>
    <div className="flex flex-col justify-center items-center py-8 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-3xl font-extrabold leading-9 tracking-tight text-blue-600">
          Profile Details
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-lg shadow-lg">
        {loading ? (
          <Loader />
        ) : (
          user && (
            <div className="space-y-6">
              <div className="border-b-2 border-blue-600 pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Informations</h3>
                <div className="grid grid-cols-3 gap-x-4 text-lg">
                  <div className="col-span-1 font-semibold text-gray-600">Name:</div>
                  <div className="col-span-2 text-gray-800">{user.customer.name}</div>
                  <div className="col-span-1 font-semibold text-gray-600">Email:</div>
                  <div className="col-span-2 text-gray-800">{user.customer.email}</div>
                  <div className="col-span-1 font-semibold text-gray-600">Username:</div>
                  <div className="col-span-2 text-gray-800">{user.customer.username}</div>
                  <div className="col-span-1 font-semibold text-gray-600">User Role:</div>
                  <div className="col-span-2 text-gray-800">{user.customer.role}</div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;

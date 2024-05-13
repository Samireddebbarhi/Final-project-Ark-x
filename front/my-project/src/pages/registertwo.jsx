import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/features/registerSlice";

const RegisterComponent = () => {
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, registerData } = useSelector(state => state.register);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(register(username)); 
  }, [dispatch, username]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({username, name, email, password}));
    setUserName('');
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
        <form
        onSubmit={handleSubmit} 
         noValidate="" action="" className="container mx-auto md:w-1/2 flex flex-col mx-auto space-y-12 bg-gray-500 p-6">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-6">
                <label htmlFor="firstname" className="text-sm">User name</label>
                <input
                  type="text"
                  username="username" // Change userName to username
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  id="firstname" placeholder="User name" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
              </div>
              <div className="col-span-full sm:col-span-6">
                <label htmlFor="lastname" className="text-sm">Name</label>
                <input
                name = "Fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="lastname" type="text" placeholder="Name" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
              </div>
              <div className="col-span-full sm:col-span-6">
                <label htmlFor="email" className="text-sm">Email</label>
                <input
                email = "email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
              </div>
              <div className="col-span-full sm:col-span-6">
                <label htmlFor="email" className="text-sm">Password</label>
                <input
                password = "password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 id="password" type="password" placeholder="Password" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
              </div>
            </div>
          </fieldset>
          <button type="submit" className="px-8 py-3 font-semibold border rounded dark:border-gray-800 dark:text-gray-800">Register</button>
        </form>
      </section>
    </>
  );
};

export default RegisterComponent;

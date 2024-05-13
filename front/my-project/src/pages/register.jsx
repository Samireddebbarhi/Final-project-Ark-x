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
    dispatch(register({ username, name, email, password }));
    setUserName('');
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <section className="p-6 dark:text-gray-900">
        <form
          onSubmit={handleSubmit}
          noValidate="" action="" className="container mx-auto md:w-1/2 flex flex-col mx-auto space-y-12 p-6">
          <div className="relative font-medium md:h-screen flex items-center content-center">
            <div className="mr-auto ml-auto w-full">
              <div className="w-full max-w-md mr-auto ml-auto mt-4 mb-1 text-center">
                <h1 className="text-gray-800 block text-3xl font-extrabold font-title">Sign up</h1>
              </div>
              <div className="w-full max-w-md mr-auto ml-auto mt-4">
                <div className="bg-white shadow-lg rounded-md px-8 py-8 mb-4 ml-auto mr-auto">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                    <input
                      id="username"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="james"
                      className="shadow-sm appearance-none border border-gray-400 rounded w-full py-4 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="James"
                      className="shadow-sm appearance-none border border-gray-400 rounded w-full py-4 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Email address</label>
                    <input
                      id="username"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="shadow-sm appearance-none border border-gray-400 rounded w-full py-4 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="***************"
                      className="shadow-sm appearance-none border border-gray-400 rounded w-full py-4 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="text-center sm:text-left">
                        <label>
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm font-medium text-gray-700">Remember me</span>
                        </label>
                      </div>
                      
                    </div>
                  </div>
                  <div className="mb-6">
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 shadow-lg text-white font-semibold text-sm py-3 px-0 rounded text-center w-full hover:bg-tertiary duration-200 transition-all">Register</button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default RegisterComponent;

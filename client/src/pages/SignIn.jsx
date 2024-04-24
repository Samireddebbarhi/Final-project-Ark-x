import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for handling login errors



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    try {
      // Send POST request to login endpoint
      const response = await axios.post('http://localhost:3001/api/admin/login', {
      });
      console.log(response)
      if(response.status === 200) {
        alert('You are Logged Successfully')
      }else {
        throw new Error("Invalid Username and Password")
      }
    } catch (error) {
      // Handle login error
      setError('Invalid email or password. Please try again.');
      console.log(error) // Set error message
    }
  };
// i stop here
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Administration Login Form</h1>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <span className="text-sm text-gray-600">
            Are you a SuperAdmin? <a href="#" className="text-blue-500 hover:text-blue-700">Try logging in here</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

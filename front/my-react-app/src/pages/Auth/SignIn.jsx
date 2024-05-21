// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { login } from "../../redux/features/auth/registerSlice";
// import 'boxicons/css/boxicons.min.css';
// import svg from '../assets/login.svg';

// // Define Zod schema
// const signInSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters long'),
// });

// const SignIn = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isSuccess, isError, isLoading, message } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (isSuccess) {
//       navigate('/home');
//       alert("Login successfully");
//     }
//   }, [user, isSuccess, isError, isLoading]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signInSchema),
//   });

//   const onSubmit = (data) => {
//     dispatch(login(data));
//   };

//   return (
//     <div className="relative h-screen overflow-hidden">
//       <div className="absolute w-52 h-52 bg-gradient-to-b from-blue-900 to-transparent rounded-full top-[-7rem] left-[-3.5rem]"></div>
//       <div className="absolute w-52 h-52 bg-gradient-to-b from-blue-900 to-transparent rounded-full bottom-[-6rem] right-[-5.5rem] rotate-180"></div>

//       <div className="flex h-full items-center justify-center px-4 md:flex-row flex-col">
//         <img src={svg} alt="" className="w-[400px] md:w-[500px] lg:w-[600px] md:mr-8 mb-8 md:mb-0" />
//         <div className="w-full max-w-sm">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <h1 className="text-2xl font-semibold text-center mb-8">Welcome</h1>

//             <div className="relative mb-8">
//               <div className="flex items-center border-b border-gray-400 pb-2">
//                 <i className='bx bx-user-circle text-xl text-gray-400'></i>
//                 <div className="ml-2 relative w-full">
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     {...register('email')}
//                     className="w-full border-none outline-none bg-transparent p-2 text-gray-800"
//                   />
//                   {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                 </div>
//               </div>
//             </div>

//             <div className="relative mb-6">
//               <div className="flex items-center border-b border-gray-400 pb-2">
//                 <i className='bx bx-lock text-xl text-gray-400'></i>
//                 <div className="ml-2 relative w-full">
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     {...register('password')}
//                     className="w-full border-none outline-none bg-transparent p-2 text-gray-800"
//                   />
//                   {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//                 </div>
//               </div>
//             </div>

//             <a href="#" className="block text-right text-gray-400 mb-6 transition-colors hover:text-blue-900">Forgot Password?</a>

//             <button type="submit" className="w-full py-3 bg-blue-900 text-white rounded-lg transition-transform transform hover:scale-105">Login</button>

//             <div className="text-center mt-6">
//               <span className="block text-gray-400 mb-4">Or login with</span>
//               <div className="flex justify-center space-x-4">
//                 <a href="#" className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
//                   <i className='bx bxl-facebook'></i>
//                 </a>
//                 <a href="#" className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
//                   <i className='bx bxl-google'></i>
//                 </a>
//                 <a href="#" className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
//                   <i className='bx bxl-instagram'></i>
//                 </a>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

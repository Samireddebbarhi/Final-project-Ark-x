// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeItemFromCart, updateItemQuantity } from '../redux/features/cartSlice';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// import Footer from '../components/Footer/Footer';
// import Header from '../components/Header';


// const CartPage = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(state => {
//     console.log('Cart Items:', state.cart); // Add console.log to verify cart items
//     return state.cart;
//   });
//   const totalAmount = useSelector(state => {
//     console.log('Total Amount:', state.cart.totalAmount); // Add console.log to verify total amount
//     return state.cart.totalAmount;
//   });
//   const handleRemoveItem = (id) => {
//     dispatch(removeItemFromCart(id));
//   };

//   const handleIncrement = (id) => {
//     dispatch(updateItemQuantity({ id, quantity: 1 }));
//   };

//   const handleDecrement = (id) => {
//     dispatch(updateItemQuantity({ id, quantity: -1 }));
//   };
//  const cartElements = []; // Array to hold JSX elements for each cart item
//   for (const item of cartItems) {
//     cartElements.push(
//       <div key={item.id} className="border border-gray-200 rounded-lg p-4">
//         <div className="flex items-center mb-2">
//           <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
//           <div>
//             <h2 className="text-lg font-bold">{item.name}</h2>
//             <p className="text-gray-600">{item.price} Dhs</p>
//             <div className="flex items-center mt-2">
//               <button onClick={() => handleDecrement(item.id)} className="bg-gray-200 text-gray-700 rounded-lg py-1 px-2">
//                 <FontAwesomeIcon icon={faMinus} />
//               </button>
//               <input type="text" value={item.quantity} className="mx-2 w-12 text-center border border-gray-300 rounded" readOnly />
//               <button onClick={() => handleIncrement(item.id)} className="bg-gray-200 text-gray-700 rounded-lg py-1 px-2">
//                 <FontAwesomeIcon icon={faPlus} />
//               </button>
//             </div>
//           </div>
//           <button onClick={() => handleRemoveItem(item.id)} className="ml-auto bg-red-500 text-white rounded-lg p-2">
//             <FontAwesomeIcon icon={faTrash} />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto mt-16 p-6">
//         <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {cartElements} {/* Render the cart items using push */}
//             </div>
//             <div className="mt-6">
//               <h2 className="text-xl font-bold">Total Amount: {totalAmount} Dhs</h2>
//               <button className="bg-gray-800 text-white py-2 px-4 rounded mt-4 hover:bg-gray-700 focus:bg-gray-700">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CartPage;
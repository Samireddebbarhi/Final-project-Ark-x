import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../redux/features/cartSlice'; // Ensure you have this action defined in your cartSlice

const Cart = () => {
  // Assuming your cart state is stored in Redux and retrieved using useSelector
  const cart = useSelector(state => state.cart.items);
  console.log('cart response', cart)
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cart.items.map(item => (
  <div key={item.productId} className="bg-white rounded-lg p-4 shadow-md">
    <img 
      src={item.image} 
      alt={item.name} 
      className="w-full h-40 object-cover mb-4" 
      onError={(e) => { e.target.onerror = null; e.target.src = 'default-image-url.jpg'; }} // Fallback image if image loading fails
    />
    <h2 className="text-lg font-semibold">{item.name}</h2>
    <p className="text-gray-600 mb-2">{item.price} Dhs</p>
    <p className="text-gray-500 mb-4">Quantity: {item.quantity}</p>
    <button 
      onClick={() => handleRemoveFromCart(item.productId)}
      className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
    >
      Remove
    </button>
  </div>
))}
      {/* Additional logic for total price, checkout button, etc. */}
    </div>
  );
};

export default Cart;

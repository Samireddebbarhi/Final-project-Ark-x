import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectitemList,
  deleteitem,
  additem,
  subtractitem,
} from "../redux/features/CartSlice";
import toast, { Toaster } from "react-hot-toast";
import { createOrder, resetOrderState } from "../redux/features/OrderSlice";
import Header from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const itemList = useSelector(selectitemList);
  const { isSuccess, isLoading, isError, orderedItems } = useSelector(
    (state) => state.orders
  );
  const obj = { id: "idtest", status: "pending" };

  const removeItem = (id) => {
    dispatch(deleteitem(id));
    toast.success("Item removed from cart successfully.");
  };

  const increaseQuantity = (id) => {
    dispatch(additem(id));
  };

  const decreaseQuantity = (id) => {
    dispatch(subtractitem(id));
  };

  const checkout = (id, quantity, obj) => {
    dispatch(createOrder({ productId: id, quantity, payment: obj }));
  };

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(itemList));
  }, [itemList]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order placed successfully.");
      dispatch(resetOrderState());
    }
    if (isError) {
      toast.error("Order failed to place.");
      dispatch(resetOrderState());
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-14 m-12 text-center font-bold text-4xl text-indigo-600 shadow-xl rounded">
        <div className="mb-3">Cart Menu</div>
        {itemList.length > 0 && (
          <div className="text-2xl mb-4">
            Total Cost: MAD{" "}
            {itemList.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {itemList.map((value, index) => (
          <div
            className="relative p-6 border border-gray-300 shadow-md rounded-lg bg-white flex flex-col justify-between"
            key={index}
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
              onClick={() => removeItem(value.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center md:items-start">
              {orderedItems[value.id] && (
                <div className="text-red-500 font-bold mb-2">
                  Already Ordered
                </div>
              )}
              <img
                src={value.imageurl}
                className="mb-4 w-32 h-32 object-cover"
                alt={value.name}
              />
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {value.name}
              </h5>
              <p className="text-gray-700 text-lg mb-4">MAD {value.price}</p>
              <div className="flex items-center mb-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-red-700 focus:bg-red-700 transition duration-150 ease-in-out"
                  onClick={() => decreaseQuantity(value.id)}
                  disabled={value.quantity === 1}
                >
                  -
                </button>
                <div className="px-4 text-lg">{value.quantity}</div>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-green-700 focus:bg-green-700 transition duration-150 ease-in-out"
                  onClick={() => increaseQuantity(value.id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-auto">
              {itemList.length > 0 && (
                <button
                  type="button"
                  className="px-6 py-3 bg-blue-600 text-white font-medium text-lg uppercase rounded shadow-md hover:bg-blue-700 focus:bg-blue-700 transition duration-150 ease-in-out"
                  onClick={() => checkout(value.id, value.quantity, obj)}
                >
                  {orderedItems[value.id] ? " Order again " : " Order now "}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default Cart;

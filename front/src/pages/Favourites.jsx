import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletefav, selectfavList } from "../redux/features/FavouriteSlice";
import { saveitem } from "../redux/features/CartSlice";
import toast, { Toaster } from "react-hot-toast";

const Favourites = () => {
  const dispatch = useDispatch();
  const itemList = useSelector(selectfavList);

  const addCart = (id, name, imageurl, price) => {
    dispatch(
      saveitem({
        id,
        name,
        imageurl,
        price,
        quantity: 1,
      })
    );
    removeFav(id);
  };

  const removeFav = (id) => {
    const favList = localStorage.getItem("favList")
      ? JSON.parse(localStorage.getItem("favList"))
      : [];

    const updatedList = favList.filter((item) => item.id !== id);
    localStorage.setItem("favList", JSON.stringify(updatedList));

    const deletedItem = favList.find((item) => item.id === id);

    if (deletedItem) {
      toast.success(
        `Your ${deletedItem.name} is deleted from your Favorite section successfully.`
      );
    }

    dispatch(deletefav(id));
  };

  return (
    <>
      <div className="p-14 m-12 text-center font-bold text-4xl text-indigo-600 shadow-xl rounded">
        Favourite List Menu
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemList.map((value, index) => (
          <div
            key={index}
            className="p-4 m-4 border border-gray-300 shadow-lg rounded-lg bg-white relative"
          >
            <div className="flex flex-col items-center">
              <img
                src={value.imageurl}
                className="h-40 w-40 object-cover mb-4 rounded"
                alt={value.name}
              />
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {value.name}
              </h5>
              <p className="text-gray-700 text-2xl mb-4"> {value.price} MAD</p>
              <button
                type="button"
                className="w-full p-2 mb-4 bg-blue-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() =>
                  addCart(value.id, value.name, value.imageurl, value.price)
                }
              >
                Move to Cart
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
              onClick={() => removeFav(value.id)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <Toaster />
    </>
  );
};

export default Favourites;

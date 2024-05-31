import React from "react";
import { useDispatch } from "react-redux";
import { savefav } from "../../redux/features/FavouriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faHeart,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Card = ({ value }) => {
  const dispatch = useDispatch();

  const addfavInlist = () => {
    dispatch(
      savefav({
        id: value.id,
        imageurl: value.image,
        name: value.name,
        price: value.price,
      })
    );
    toast.success(
      "Your " +
        value.name +
        value.description +
        " is added to Favourite section successfully."
    );
  };

  return (
    <>
      <div className="flex justify-center m-4 hover:shadow-xl">
        <div className="bg-white shadow-lg border-4 rounded-lg overflow-hidden w-80 h-full">
          <img
            src={value.image}
            className="object-cover h-40"
            key={value.id}
            alt="..."
          />
          <div className="p-0 flex flex-col justify-between h-full">
            {value.stock <= 3 && (
              <span className="text-red-500 ml-2 mt-2">
                Low Stock! Only {value.stock} left.
              </span>
            )}
            <div>
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {value.name}
              </h5>
              <div className="mb-2 text-yellow-500">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarHalfAlt} />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-lg font-bold text-gray-700 md:text-xl">
                {value.price} Dhs
              </h1>

              <button
                className="w-full px-4 py-2 mb-2 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={addfavInlist}
              >
                <FontAwesomeIcon icon={faHeart} /> Add to Favourite
              </button>

              <Link
                to={`/base/ProductDetails/${value._id}`}
                key={value._id}
                className="w-full"
              >
                <button className="w-full px-4 py-2 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                  <FontAwesomeIcon icon={faEye} /> View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Card;

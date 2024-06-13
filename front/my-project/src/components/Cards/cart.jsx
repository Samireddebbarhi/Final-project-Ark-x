import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Link } from 'react-router-dom'

const Card = ({ value }) => {
  console.log('Card value:', value);

  const addfavInlist = () => {
    alert("Added to Favourites");
  };

  const addcart = () => {
    alert("Added to Cart");
  };

  return (
    <div className="flex justify-center m-4 hover:shadow-xl max-w-sm max-h-sm">
      <div className="flex flex-row rounded-lg bg-white shadow-lg border-4">
        <img
          src={value.image}
          className="w-sm h-64 object-cover"
          style={{ height: "10rem" }}
          key={value.id}
          alt="..."
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {value.name}
          </h5>
          <div>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold text-gray-700 md:text-xl">
              &nbsp;{value.price} Dhs
            </h1>
            <button
              className="px-4 py-2 mb-2 w-full text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={addfavInlist}
            >
              <FontAwesomeIcon icon={faHeart} /> Add to Favourite
            </button>
            <button
              className="px-4 py-2 w-full text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={addcart}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
            </button>
            
        </div>
      </div>
    </div>
    </div>
  );
};

export default Card;
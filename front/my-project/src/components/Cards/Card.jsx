import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { additem, saveitem, selectitemList } from "../../reducer/cartSlice";
import { addfav, savefav, selectfavList } from "../../reducer/favSlice";
import toast, { Toaster } from 'react-hot-toast'

const Card = ({ value }) => {
  const dispatch = useDispatch();
  const cartList = useSelector(selectitemList);
  const favList = useSelector(selectfavList)
  const itemList = useSelector(selectitemList);

  const addcart = () => {
    console.log("add cart button clicked on " + value.name);
    dispatch(
      saveitem({
        id: value.id,
        name: value.name,
        imageurl: value.imageurl,
        price: value.price,
        quantity: 1,
      })
    );
    toast.success("Your " + value.name + " is added to cart succesfully .")
  };
  const addfavInlist = () => {
    console.log("add fav button clicked on " + value.name);    
    dispatch(savefav({
      id: value.id,
      name: value.name,
      imageurl: value.imageurl,
      price: value.price,
      quantity: 1,
    }))
    // }
    toast.success("Your " + value.name + " is added to Favourite section succesfully .")
  };

  // justify-between
  return (
    <>
      <div>
        <div className="flex justify-center m-4 hover:shadow-xl max-w-sm max-h-sm">
          <div className="flex flex-row   rounded-lg bg-white shadow-lg border-4">
            <img
              src={value.imageurl}
              className="w-sm h-sm"
              style={{ height: "10rem" }}
              key={value.id}
              alt="..."
            />
            <div className="p-6 flex flex-col justify-center    ">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {value.name.substr(0, 25)}...
              </h5>
              <div>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half"></i>
              </div>
              <div className="flex flex-col justify-between  item-center">
                <h1 className="text-lg font-bold text-gray-700  md:text-xl">
                  $&nbsp;{value.price}
                </h1>
                <button
                  className="px-2 py-1 mb-2 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded  hover:bg-gray-700  focus:outline-none focus:bg-gray-700 "
                  onClick={() => addfavInlist()}
                >
                  <i className="far fa-heart"></i> Add to Favourite
                </button>
                <button
                  className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded  hover:bg-gray-700  focus:outline-none focus:bg-gray-700 "
                  onClick={() => addcart()}
                >
                  <i className="fal fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Card;

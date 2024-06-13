import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectitemList } from "../reducer/cartSlice";
import { deleteitem, additem, subtratitem } from "../reducer/cartSlice";
import toast, { Toaster } from 'react-hot-toast'

const Cart = () => {
  const dispatch = useDispatch();
  const removeitem = (id, index) => {
    dispatch(deleteitem(id));
    settotalCost(
      (Cost) =>
        Cost -
        parseInt(list[index].price.replaceAll(",", "")) * list[index].quantity
    );
    toast.success("Item removed to cart succesfully .")
  };
  const itemList = useSelector(selectitemList);
  var saveditem = sessionStorage.getItem("cartList");
  saveditem = saveditem ? JSON.parse(saveditem) : [];
  //const saveditem =JSON.parse(sessionStorage.getItem("cartList")) !== null ? JSON.parse(sessionStorage.getItem("cartList")): [];
  const list = itemList.length === 0 ? saveditem : itemList;
  const [totalCost, settotalCost] = useState(
    list.reduce(
      (total, item) =>
        total + parseInt(item.price.replaceAll(",", "")) * item.quantity,
      0
    )
  );
  const decreseitem = (id, index) => {
    if (list[index].quantity === 1) {
      dispatch(deleteitem(id));
      settotalCost(
        (Cost) => Cost - parseInt(list[index].price.replaceAll(",", ""))
      );
    } else {
      settotalCost(
        (Cost) => Cost - parseInt(list[index].price.replaceAll(",", ""))
      );
      dispatch(subtratitem(index));
    }
  };
  const increasItem = (id) => {
    dispatch(additem(id));
    settotalCost((Cost) => Cost + parseInt(list[id].price.replaceAll(",", "")));
  };

  const checkout = async () => {
    console.log("checkout");
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
    const res = await axios.post(
      "https://ecommerceserver-ten.vercel.app/api/auth/create-checkout-session",
      { userName: sessionStorage.getItem("userName"), list },axiosConfig
    );
    if (res.data.url) {
      window.location.href = res.data.url;
    } else {
      window.alert("Error in processing your request");
    }
  };

  // const itemlist = list.length !== 0 ?  list : JSON.parse(sessionStorage.getItem("cartList"))||[];
  return (
    <>
      <div className="flex justify-between items-center p-6 m-6 text-center font-bold text-4xl text-indigo-600 shadow-xl rounded  ">
        {totalCost !== 0 ? <div className="w-50 order-1"></div> : null}
        <div className="self-center order-2">
          <div>Cart Menu</div>
          {totalCost !== 0 ? <div>Total Cost : ₹ {totalCost}</div> : null}
        </div>
        {totalCost !== 0 ? (
          <div className="self-end order-3">
            <button
              type="button"
              className="w-30  p-4 bg-blue-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={checkout}
            >
              CheckOut
            </button>
          </div>
        ) : null}
      </div>
      {list.map((value, index) => {
        // setTotalCost((price)=>price+value.price);
        return (
          <>
            <div
              className="p-4 m-4 items-center h-90% border-8 shadow-md rounded max-w-80% max-h-80%"
              key={value.id}
            >
              <div className="flex flex-col md:flex-row w-50% justify-between  p-6 rounded-lg shadow-lg bg-white ">
                {/* <i
                  className="fas fa-trash p-2 cursor-pointer"
                  onClick={() => removeitem(value.id)}
                ></i> */}
                <div>
                  <img
                    src={value.imageurl}
                    className="m-auto md:m-2"
                    style={{ height: "8rem", width: "8rem" }}
                    alt="..."
                  />
                </div>
                <div className="w-80">
                  <h5 className="text-gray-900 p-2 text-xl font-medium mb-2 ">
                    {value.name}
                  </h5>
                </div>
                <div>
                  <p className="text-gray-700 text-2xl mb-4">₹ {value.price}</p>
                  <div className="flex">
                    <button
                      type="button"
                      className="w-15  p-4 bg-blue-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => decreseitem(value.id, index)}
                    >
                      -
                    </button>
                    <div className="w-50 m-2">{value.quantity} </div>

                    <button
                      type="button"
                      className="w-15  p-4 bg-blue-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => increasItem(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-30  p-4 bg-blue-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => removeitem(value.id, index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
      {/* <div>{totalcost}</div> */}
      <Toaster />
    </>
  );
};

export default Cart;

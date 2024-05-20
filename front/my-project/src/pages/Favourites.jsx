import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfav, deletefav, selectfavList } from "../reducer/favSlice";
import { saveitem } from "../reducer/cartSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { json } from "react-router";

const Favourites = () => {
  const itemList = useSelector(selectfavList)
  var saveditem = sessionStorage.getItem("favList");
  saveditem = (saveditem) ? JSON.parse(saveditem) : [];
  //const saveditem = sessionStorage.getItem("favList") === null ? JSON.parse(sessionStorage.getItem("favList")) : []
  const list = itemList.length === 0 ? saveditem : itemList;
  // console.log(JSON.parse(sessionStorage.getItem("favList")))
  // debugger
  // let favlist = list.length !== 0 ? list : JSON.parse(sessionStorage.getItem("favList"))||[];
  const dispatch = useDispatch();
  const addcart = (id, name, imageurl, price) => {
   
    dispatch(      
        saveitem({
          id,
          name,
          imageurl,
          price,
          quantity: 1,
        })
    );
    removefav(id);
  };
  const removefav = (id) => {
    console.log("asdas")
    dispatch(deletefav(id));
  };

  const favitem = list.map((value) => (
    <Draggable draggableId={value.id} key={value.id} index={value.id}>
      {(provided) => (
        <div
          className="p-4 m-4 items-center h-90% border-8 shadow-md rounded max-w-80% max-h-80%"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-col md:flex-row  w-50% justify-between  p-6 rounded-lg shadow-lg bg-white ">
            <div>
              <i
                className="fas fa-trash p-4 cursor-pointer"
                onClick={() => removefav(value.id)}
              ></i>
            </div>
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
            </div>
            <div>
              <button
                type="button"
                className="w-30  p-4 bg-blue-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() =>
                  addcart(value.id, value.name, value.imageurl, value.price)
                }
              >
                Move to cart
              </button>
            </div>


          </div>
        </div>
      )}
    </Draggable>
  ));

  const dragend = (res) => {
    console.log(res);
    const items = [...list];
    const [ordereditems] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, ordereditems);
    list = items;
  };

  return (
    <>
      <div className="p-6 m-6 text-center font-bold text-4xl text-indigo-600 shadow-xl rounded  ">
        Favourite list Menu
      </div>
      <DragDropContext onDragEnd={dragend}>
        <Droppable droppableId="favSeq" direction="vertical" type="column">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {favitem}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Favourites;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectitemList,
  deleteitem,
  additem,
  subtratitem,
} from "../redux/features/CartSlice";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const itemList = useSelector(selectitemList);
  const [totalCost, setTotalCost] = useState(
    itemList.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.id, record.price, record.quantity)}
        >
          Remove
        </Button>
      ),
    },
  ];

  const data = itemList.map((item) => ({
    ...item,
    totalPrice: item.price * item.quantity,
  }));

  const removeItem = (id, price, quantity) => {
    dispatch(deleteitem(id));
    const itemCost = price * quantity;
    setTotalCost((prevTotal) => prevTotal - itemCost);
    toast.success("Item removed from cart successfully.");
  };

  return (
    <>
      <div className="flex justify-between items-center p-12 m-6 text-center font-bold text-4xl text-indigo-600 shadow-xl rounded">
        {totalCost !== 0 && <div className="w-50 order-1"></div>}
        <div className="self-center order-2">
          <div>Cart Menu</div>
          {totalCost !== 0 && <div>Total Cost : {totalCost} MAD</div>}
        </div>
      </div>
      <div className="p-6">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="rounded-lg shadow-md"
        />
      </div>
      <Toaster />
    </>
  );
};

export default Cart;

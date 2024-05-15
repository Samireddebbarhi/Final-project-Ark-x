import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutlined } from "@ant-design/icons";
// import CustomizedDialogs from "../admin/components/Dialog"
// import EditeProduct from "../admin/components/EditeProduct";
import { getAllOrders } from "../features/orders/orderSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Customer",
    dataIndex: "customerId",
    sorter: (a, b) => a.customerId.length - b.customerId.length,
  },

  {
    title: "Products",
    dataIndex: "products",
    sorter: (a, b) => a.products.length - b.products.length,
  },
  {
    title: "Payment Info",
    dataIndex: "paymentInfo",
    sorter: (a, b) => a.products.length - b.products.length,
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    sorter: (a, b) => a.date.length - b.date.length,
  },
  {
    title: "Total",
    dataIndex: "totalAmount",
    sorter: (a, b) => a.total.length - b.total.length,
  },
];

const Orderlist = () => {
  const orders = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const data3 = [];

  // Populate the data array with order information
  for (let i = 0; i < orders.length; i++) {
    data3.push({
      key: i + 1,
      customer: orders[i].userInfo.username,
      products: orders[i].orderItem.Idproduct,
      paymentInfo: orders[i].paymentInfo,
      orderDate: orders[i].paidAt,
      totalPrice: orders[i].totalPrice,
    });
  }

  return (
    <div className="relative">
      <h3 className="mb-4 text-2xl font-bold">Orders</h3>
      <br />
      <div>
        <Table dataSource={data3} columns={columns} />
      </div>
    </div>
  );
};

export default Orderlist;

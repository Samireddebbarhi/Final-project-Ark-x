import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LuView } from "react-icons/lu";

import { getAllOrders } from "../features/orders/orderSlice";

const Orderlist = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  const [data3, setData3] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    console.log("Orders state:", orders);
    if (Array.isArray(orders) && orders.length > 0) {
      const newData = orders.map((order) => ({
        key: order._id,
        username: order.userInfo.map((item) => item.username),
        paymentInfo: order.paymentInfo.status,
        orderDate: new Date(order.paidAt).toDateString(),
        totalAmount: order.totalPrice,
        orderItems: order.orderItem || [],
      }));
      setData3(newData);
      console.log(newData);
    }
  }, [orders]);

  const handleView = (record) => {
    setSelectedOrder(record);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: "Payment Info",
      dataIndex: "paymentInfo",
      sorter: (a, b) => a.paymentInfo.length - b.paymentInfo.length,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Actions",
      render: (record) => (
        <Button onClick={() => handleView(record)}>
          <LuView />
        </Button>
      ),
    },
  ];

  return (
    <div className="relative">
      <h3 className="mb-4 text-2xl font-bold">Orders</h3>
      <br />
      <div>
        <Table dataSource={data3} columns={columns} />
      </div>
      <div>
        <Modal
          title="Order Detail"
          visible={!!selectedOrder}
          onCancel={() => {
            setSelectedOrder(null);
          }}
          footer={null}
        >
          {selectedOrder && (
            <>
              <h4>Order Items: </h4>
              <Table
                dataSource={selectedOrder.orderItems}
                columns={[
                  {
                    title: "Image",
                    dataIndex: "image",
                    render: (text, record) => (
                      <img
                        src={record.image}
                        alt="Product"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ),
                  },
                  { title: "Name", dataIndex: "name" },
                  { title: "Price", dataIndex: "price" },
                  { title: "Quantity", dataIndex: "quantity" },
                ]}
                rowKey={(_record, index) => index}
                pagination={false}
              />
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Orderlist;

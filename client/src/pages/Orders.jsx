import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Dropdown, Menu, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LuView } from "react-icons/lu";
import { getAllOrders, updateOrder } from "../features/orders/orderSlice";
import { DownOutlined } from "@ant-design/icons";

const Orderlist = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  const [data3, setData3] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      const newData = orders.map((order) => ({
        key: order._id,
        username: order.userInfo.map((item) => item.username).join(", "),
        paymentInfo: order.paymentInfo.status,
        orderDate: new Date(order.paidAt).toDateString(),
        totalAmount: order.totalPrice,
        orderItems: order.orderItem || [],
        status: order.orderStatus || "Processing",
      }));
      setData3(newData);
    }
  }, [orders]);

  const handleView = (record) => {
    setSelectedOrder(record);
  };

  const handleMenuClick = async (record, e) => {
    const status = e.key === "1" ? "purchased" : "delivered";
    try {
      await dispatch(updateOrder({ id: record.key, status }));

      message.success("Order updated successfully");

      setData3((prevData) =>
        prevData.map((item) =>
          item.key === record.key ? { ...item, status } : item
        )
      );
    } catch (error) {
      dispatch(getAllOrders());
      message.success("Order updated successfully");
    }
  };

  const menu = (record) => (
    <Menu onClick={(e) => handleMenuClick(record, e)}>
      <Menu.Item key="1">purchased</Menu.Item>
      <Menu.Item key="2">delivered</Menu.Item>
    </Menu>
  );

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
        <>
          <Button onClick={() => handleView(record)} className="mr-2">
            <LuView />
          </Button>
          <Dropdown overlay={menu(record)}>
            <Button>
              {record.status} <DownOutlined />
            </Button>
          </Dropdown>
        </>
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
          open={selectedOrder}
          onCancel={() => {
            setSelectedOrder(null);
          }}
          footer={null}
          style={{ minWidth: "600px" }}
        >
          {selectedOrder && (
            <>
              <h4>Order Items: </h4>
              <Table
                dataSource={selectedOrder.orderItems}
                columns={[
                  { title: "ID", dataIndex: "Idproduct" },
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

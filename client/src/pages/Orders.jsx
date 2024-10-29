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
    const status =
      e.key === "1" ? "paid" : e.key === "2" ? "delivered" : "cancelled";
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
      <Menu.Item key="1">paid</Menu.Item>
      <Menu.Item key="2">delivered</Menu.Item>
      <Menu.Item key="3">cancelled</Menu.Item>
    </Menu>
  );

  const statusStyles = {
    pending: { color: "blue" },
    paid: { color: "green" },
    delivered: { color: "orange" },
    cancelled: { color: "red" },
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
    },
    {
      title: "username",
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
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
    },
    {
      title: "Total Price",
      dataIndex: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const style = statusStyles[status.toLowerCase()] || {};
        return <span style={style}>{status}</span>;
      },
    },
    {
      title: "Actions",
      render: (record) => (
        <>
          <Button onClick={() => handleView(record)} className="mr-2">
            <LuView />
          </Button>
          {record.status !== "cancelled" && (
            <Dropdown overlay={menu(record)}>
              <Button>
                {record.status} <DownOutlined />
              </Button>
            </Dropdown>
          )}
        </>
      ),
    },
  ];

  const tableContainerStyle = {
    height: "calc(100vh - 220px)", // Adjust the height as needed
    overflowY: "scroll",
  };

  return (
    <div className="relative">
      <h3 className="mb-4 text-2xl font-bold">Orders</h3>
      <br />
      <div style={tableContainerStyle}>
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

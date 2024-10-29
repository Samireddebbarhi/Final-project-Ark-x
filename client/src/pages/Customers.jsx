import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomerById } from "../features/customer/customerSlice";
import { ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { getCustomers } from "../features/customer/customerSlice";

const { confirm } = Modal;

const Customerlist = () => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const userPermissions = localStorage.getItem("user")
    ? new Set(JSON.parse(localStorage.getItem("user")).admin.permissions)
    : new Set();
  useEffect(() => {
    dispatch(getCustomers());
  }, [deleteConfirmed]);
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const handleDelete = async (customerId) => {
    try {
      dispatch(deleteCustomerById(customerId));
      console.log("Customer deleted Successfully", customerId);

      setDeleteConfirmed(true);
    } catch (error) {
      console.error("Error deleting  customer:", error);
    }
  };
  const data2 = [];

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    data2.push({
      key: customer._id,
      username: customer.username,
      email: customer.email,
      role: customer.role,
    });
  }
  const showDeleteConfirm = (customerId) => {
    confirm({
      title: "Are you sure you want to delete this customer?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(customerId); // Pass customerId instead of record
      },
      onCancel() {
        console.log("Deletion canceled");
      },
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      render: (record) => {
        return userPermissions.has("delete") ? (
          <>
            <Button
              onClick={() => showDeleteConfirm(record.key)}
              icon={<DeleteOutlined />}
              danger
            />
          </>
        ) : (
          <StopOutlined style={{ color: "#EE4E4E", fontSize: "20px" }} />
        );
      },
    },
  ];
  const tableContainerStyle = {
    height: "calc(100vh - 220px)", // Adjust the height as needed
    overflowY: "scroll",
  };
  return (
    <div className="relative">
      <h3 className="mb-4 text-2xl font-bold">Customers</h3>
      <br />
      <div style={tableContainerStyle}>
        <Table dataSource={data2} columns={columns} />
      </div>
    </div>
  );
};

export default Customerlist;

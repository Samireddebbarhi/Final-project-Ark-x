import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
//import { BiEdit } from "react-icons/bi";
//import { AiFillDelete } from "react-icons/ai";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  getAdmins,
  updateAdminById,
  deleteAdminsById,
  createAdmins,
} from "../features/admins/adminSlice";
const { confirm } = Modal;

const Admins = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const adminstate = useSelector((state) => state.admin.admins);

  const authenticatedUsername = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  console.log(adminstate);
  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch, deleteConfirmed]);

  const handleDelete = async (adminId) => {
    try {
      dispatch(deleteAdminsById(adminId));
      console.log("Product Deleted Successfully:", productId);
      setDeleteConfirmed(true); // Set delete confirmation to true
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const showDeleteConfirm = (adminId) => {
    // Pass the productId as argument
    confirm({
      title: "Are you sure delete this Product?",
      icon: <ExclamationCircleFilled />,
      content: "Sure You Want To Delete it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // Call handleDelete with productId when user clicks "Yes"
        handleDelete(adminId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const data1 = adminstate.map((admin, index) => ({
    Sno: index + 1,
    key: admin._id,
    name: admin.name,
    username: admin.username,
    email: admin.email,
    password: admin.password,
    role: admin.role,
    permissions: admin.permissions ? admin.permissions.join(",") : "", // Handle case when permissions array is not present
  }));

  const columns = [
    {
      title: "SNo",
      dataIndex: "Sno",
    },

    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
    },
    {
      title: "Action",
      render: (record) => {
        return authenticatedUsername.admin.username !== record.username ? (
          <>
            <Button
              key={`edit_${record.key}`}
              onClick={() => handleEdit(record.key)}
              icon={<EditOutlined />}
              className="mr-2"
            ></Button>
            <Button
              key={`delete_${record.key}`}
              onClick={() => showDeleteConfirm(record.key)}
              icon={<DeleteOutlined />}
              danger
            ></Button>
          </>
        ) : (
          <StopOutlined style={{ color: "EE4E4E" }} />
        );
      },
    },
  ];
  return (
    <div>
      <h1 className="mb-4 title font-bold">Administrators</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Admins;

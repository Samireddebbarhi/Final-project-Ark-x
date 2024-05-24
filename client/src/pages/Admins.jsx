import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  StopOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmins,
  updateAdminById,
  deleteAdminsById,
  createAdmins,
} from "../features/admins/adminSlice";

const { confirm } = Modal;
const { Option } = Select;

const Admins = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const adminstate = useSelector((state) => state.admin.admins);
  const loading = useSelector((state) => state.admin.isLoading);
  const authenticatedUsername = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const handleDelete = async (adminId) => {
    try {
      await dispatch(deleteAdminsById(adminId)).unwrap();
      message.success("Admin deleted successfully.");
      dispatch(getAdmins());
    } catch (error) {
      message.success("Admin deleted successfully.");

      dispatch(getAdmins());
    }
  };

  const showDeleteConfirm = (adminId) => {
    confirm({
      title: "Are you sure you want to delete this admin?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(adminId);
      },
    });
  };

  const handleAddNewAdmin = () => {
    setIsEditing(false);
    form.resetFields();
    setOpenDialog(true);
  };

  const handleEdit = (adminId) => {
    setIsEditing(true);
    const adminToEdit = adminstate.find((admin) => admin._id === adminId);
    setAdminId(adminId);
    form.setFieldsValue({
      name: adminToEdit.name,
      username: adminToEdit.username,
      email: adminToEdit.email,
      password: adminToEdit.password,
      role: adminToEdit.role,
      permissions: adminToEdit.permissions,
    });
    setOpenDialog(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (isEditing) {
        await dispatch(
          updateAdminById({ idAdmin: adminId, admin: values })
        ).unwrap();
        message.success("Admin updated successfully.");
      } else {
        await dispatch(createAdmins(values)).unwrap();
        message.success("Admin created successfully.");
      }
      setOpenDialog(false);
      dispatch(getAdmins());
    } catch (error) {
      message.error("Error saving admin.");
    }
  };

  const handleValuesChange = (changedValues) => {
    if (changedValues.role === "super_admin") {
      form.setFieldsValue({
        permissions: ["create", "read", "update", "delete"],
      });
    } else if (changedValues.role === "admin") {
      form.setFieldsValue({
        permissions: ["read"],
      });
    }
  };

  const data1 = adminstate.map((admin, index) => ({
    Sno: index + 1,
    key: admin._id,
    name: admin.name,
    username: admin.username,
    email: admin.email,
    password: admin.password,
    role: admin.role,
    permissions: admin.permissions ? admin.permissions.join(", ") : "",
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
            />
            <Button
              key={`delete_${record.key}`}
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
    <div>
      <h1 className="mb-4 title font-bold">Administrators</h1>
      <div className="absolute top-7 right-6 mt-9 mr-4">
        <Button type="primary" onClick={handleAddNewAdmin}>
          Add New Admin
        </Button>
      </div>
      <div style={tableContainerStyle}>
        <Table columns={columns} dataSource={data1} loading={loading} />
      </div>
      <Modal
        title={isEditing ? "Edit Admin" : "Add New Admin"}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          onValuesChange={handleValuesChange}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter the username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select the role" }]}
          >
            <Select>
              <Option value="super_admin">Super Admin</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="permissions"
            label="Permissions"
            rules={[{ required: true, message: "Please select permissions" }]}
          >
            <Select mode="multiple">
              <Option value="create">Create</Option>
              <Option value="read">Read</Option>
              <Option value="update">Update</Option>
              <Option value="delete">Delete</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update Admin" : "Add Admin"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admins;

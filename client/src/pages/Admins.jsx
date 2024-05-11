import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../features/admins/adminSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
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
];

const Admins = () => {
  const dispatch = useDispatch();
  const adminstate = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);
  const data1 = [];
  for (let i = 0; i < adminstate.length; i++) {
    const admin = adminstate[i];
    data1.push({
      key: i + 1,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      password: admin.password,
      role: admin.role,
      //permissions: admin.permissions.join(","),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Admins</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Admins;

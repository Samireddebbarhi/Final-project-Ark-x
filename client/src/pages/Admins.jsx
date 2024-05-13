import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../features/admins/adminSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  /*{
    title: "SId",
    dataIndex: "Id",
  },*/
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
    dataIndex: "action",
  },
];

const Admins = () => {
  const dispatch = useDispatch();
  const adminstate = useSelector((state) => state.admin.admins);
  console.log(adminstate);
  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);
  //const data1 = [];
  const data1 = adminstate.map((admin, index) => ({
    key: index + 1,
    //Id: admin._id,
    name: admin.name,
    username: admin.username,
    email: admin.email,
    password: admin.password,
    role: admin.role,
    permissions: admin.permissions ? admin.permissions.join(",") : "", // Handle case when permissions array is not present
    action: (
      <>
        {/*<Link
          to={`/admin/category/${pCatStat[i]._id}`}
          className=" fs-3 text-danger"
    >*/}
        <BiEdit />
        {/* </Link>
       <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(pCatStat[i]._id)}
  >*/}
        <AiFillDelete />
      </>
    ),
  }));
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

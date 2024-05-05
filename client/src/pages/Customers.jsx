import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutlined } from "@ant-design/icons";
// import CustomizedDialogs from "../admin/components/Dialog"
// import EditeProduct from "../admin/components/EditeProduct";
import { getCustomers } from "../features/customer/customerSlice";
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
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Action",
    render : ()=>{
      return <>
      <Button  icon={<DeleteOutlined />} danger></Button>
      </>
    }
    
  },

];


const Customerlist = () => {
    const [openDialog, setOpenDialog] = useState(false);
    
    const { customers } = useSelector((state) => state.customer);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getCustomers())
    }, [dispatch]);
    
 
  const handleEditClick = () => {
    setOpenDialog(true);
  };
  const data2 = [];
 
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      data2.push({
        key: i + 1,
        username: customer.username,
        email: customer.email,
       
      });
    }

  return (
    <div className="relative">
  <h3 className="mb-4 text-2xl font-bold">Customers</h3>
  <br />
  <div>
    <Table dataSource={data2} columns={columns} />
     
  </div>
</div>
  );
};

export default Customerlist;
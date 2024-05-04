import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomizedDialogs from "../admin/components/Dialog"
import AddProduct from "../admin/components/AddProduct";
import { base_url } from "../utils/baseUrl";
import axios from 'axios'
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons'
import EditeProduct from "../admin/components/EditeProduct";


const Productlist = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const {products} = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, [deleteConfirmed]);
  const handleDelete = async (index) => {
    try {
      await axios.delete(`${base_url}/deleteProduct/${index.key}`);
      dispatch(deleteProduct(index.key));
      console.log("Product Deleted Successfully:", index.key);
      alert('Product Deleted Successfully')
      
      setDeleteConfirmed(true); // Set delete confirmation to true
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

    
  
   
  useEffect(() => {
      dispatch(getProducts())
    }, [dispatch]);
    
  
    
    

    const data1 = [];
    for (let i = 0; i < products.length ; i++) {
      data1.push({
        key: products[i]._id,
        name: products[i].name,
        description: products[i].description,
        category: products[i].category,
        price: `${products[i].price}`,
      
      });
      
    }
    console.log(data1);
    // console.log(products)
    const handleAddProduct = () => {
      setOpenDialog(true); // Open the dialog when the button is clicked
    };
    // const showDeleteConfirm = () => {
    //   confirm({
    //     title: 'Are you sure delete this task?',
    //     icon: <ExclamationCircleFilled />,
    //     content: 'Some descriptions',
    //     okText: 'Yes',
    //     okType: 'danger',
    //     cancelText: 'No',
    //     onOk() {
    //       console.log('OK');
    //     },
    //     onCancel() {
    //       console.log('Cancel');
    //     },
    //   });
    // }
    const columns = [
      {
        title: "SNo",
        dataIndex: "key",
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
      },
     
      {
        title: "Description",
        dataIndex: "description",
        sorter: (a, b) => a.description.length - b.description.length,
      },
      {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => a.category.length - b.category.length,
      },
      
      {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
      },
     
      {
        title: "Actions",
          render: (index) =>{
            return(
              <>
                <Button />
                
                 <Button  onClick={()=>{
                  handleDelete(index)
                 } }> Delete</Button>
              </>
            )
          }
        },
      ];
    return (
      <div className="relative">
        <h3 className="mb-4 title">Products</h3>
        <div className="absolute top-0 right-0 mt-4 mr-4">
      
        <CustomizedDialogs open={openDialog} onClose={() => setOpenDialog(false)} >
          <AddProduct />
        </CustomizedDialogs>
        </div>
        <br />
        <div>
        <Table dataSource={data1} columns={columns}/>
        </div>
      </div>
    );
  };
  export default Productlist;
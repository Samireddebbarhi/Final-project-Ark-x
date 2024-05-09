import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomizedDialogs from "../admin/components/Dialog";
import AddProduct from "../admin/components/AddProduct";
import { base_url } from "../utils/baseUrl";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditeProduct from "../admin/components/EditeProduct";
import { config } from "../utils/axiosConfig";
=======
import { ExclamationCircleFilled } from '@ant-design/icons';
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomizedDialogs from "../admin/components/Dialog"
import AddProduct from "../admin/components/AddProduct";
import { base_url } from "../utils/baseUrl";
import axios from 'axios'
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons'
import EditeProduct from "../admin/components/EditeProduct";
import { config } from "../utils/axiosconfig";
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70

const { confirm } = Modal;
const Productlist = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
<<<<<<< HEAD
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);
  const { products } = useSelector((state) => state.product);
=======
  const [isEditing, setIsEditing] = useState(false)
  const [productId, setProductId] = useState(null);
  const {products} = useSelector((state) => state.product);
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70
  useEffect(() => {
    dispatch(getProducts());
  }, [deleteConfirmed]);
  useEffect(() => {
    dispatch(getProducts());
  }, [productId]);

  // delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${base_url}/deleteProduct/${productId}`, config);
      dispatch(deleteProduct(productId));
      console.log("Product Deleted Successfully:", productId);
      // alert('Product Deleted Successfully')
<<<<<<< HEAD

=======
      
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70
      setDeleteConfirmed(true); // Set delete confirmation to true
    } catch (error) {
      console.error("Error deleting product:", error);
    }
<<<<<<< HEAD
  };
  // edite product
  const handleEdit = (productId) => {
    setIsEditing(true);
    setProductId(productId); // Set the productId for editing
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const data1 = [];
  for (let i = 0; i < products.length; i++) {
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
  const showDeleteConfirm = (productId) => {
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
        handleDelete(productId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
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
      render: (record) => {
        return (
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
        );
      },
    },
  ];
  return (
    <div className="relative">
      <h3 className="mb-4 title">Products</h3>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <CustomizedDialogs
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <AddProduct />
        </CustomizedDialogs>
      </div>
      <br />
      <div>
        <Table dataSource={data1} columns={columns} />
      </div>
      <div>
        <Modal
          title="Edit Poroduct"
          open={isEditing}
          okText="save"
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={() => {
            setIsEditing(false);
          }}
        >
          <EditeProduct key={productId} productId={productId} />
        </Modal>
      </div>
    </div>
  );
};
export default Productlist;
=======
  }
// edite product
const handleEdit = (productId) => {
  setIsEditing(true);
  setProductId(productId); // Set the productId for editing
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
        image:products[i].image,
      
      });
      
    }
    console.log(data1);
    // console.log(products)
    const handleAddProduct = () => {
      setOpenDialog(true); // Open the dialog when the button is clicked
    };
    const showDeleteConfirm = (productId) => { // Pass the productId as argument
      confirm({
        title: 'Are you sure delete this Product?',
        icon: <ExclamationCircleFilled />,
        content: 'Sure You Want To Delete it.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() { // Call handleDelete with productId when user clicks "Yes"
          handleDelete(productId);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
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
      title: "Images",
      dataIndex: "image",
      render: (image) => <img src={image} alt="Product" style={{ width: "50px", height: "50px" }} />,
      
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
          render: (record) =>{
            return(
              <>
                <Button  key={`edit_${record.key}`}  onClick={()=> handleEdit(record.key)} icon={<EditOutlined/>}  className="mr-2"></Button>
                
                <Button  key={`delete_${record.key}`} onClick={() => showDeleteConfirm(record.key)} icon={<DeleteOutlined />} danger></Button>
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
        <div>
          <Modal
          title="Edit Poroduct"
          open={isEditing}
          okText="save"
          onCancel={()=>{
            setIsEditing(false)
          }}
          onOk={()=>{setIsEditing(false)}}
          >
            <EditeProduct  key = {productId} productId={productId}/>
          </Modal>
        </div>
      </div>
    );
  };
  export default Productlist;
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70

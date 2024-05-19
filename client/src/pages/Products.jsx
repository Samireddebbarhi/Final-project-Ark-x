import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomizedDialogs from "../admin/components/Dialog";
import AddProduct from "../admin/components/AddProduct";
import { base_url } from "../utils/baseUrl";
import axios from "axios";
import { EditOutlined, DeleteOutlined, StopOutlined } from "@ant-design/icons";
import EditeProduct from "../admin/components/EditeProduct";
import { config } from "../utils/axiosconfig";
import { LuView } from "react-icons/lu";

const { confirm } = Modal;
const Productlist = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products } = useSelector((state) => state.product);
  const userPermissions = localStorage.getItem("user")
    ? new Set(JSON.parse(localStorage.getItem("user")).admin.permissions)
    : new Set();
  useEffect(() => {
    dispatch(getProducts());
    // Fetch categories when component mounts
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [deleteConfirmed]);
  useEffect(() => {
    dispatch(getProducts());
  }, [deleteConfirmed, productId]);

  //
  // useEffect(() => {
  //   dispatch(getReviews())
  // },[dispatch])

  // delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${base_url}/deleteProduct/${productId}`, config);
      dispatch(deleteProduct(productId));
      console.log("Product Deleted Successfully:", productId);
      // alert('Product Deleted Successfully')

      setDeleteConfirmed(true); // Set delete confirmation to true
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  // edite product
  const handleEdit = (productId) => {
    setIsEditing(true);
    setProductId(productId); // Set the productId for editing
  };
  // add the handel edit
  const handleView = (record) => {
    setSelectedProduct(record);
    // Set the selectedProduct to the clicked product record
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const data1 = [];
  for (let i = 0; i < products.length; i++) {
    const category = products[i].category; // Get the category object
    const categoryName = category ? category.name : ""; // Check if category exists
    data1.push({
      key: products[i]._id,
      name: products[i].name,
      description: products[i].description,
      category: categoryName,
      price: `${products[i].price}`,
      image: products[i].image,
      stock: products[i].stock,
    });
  }
  console.log(data1);
  // for rewiews data3
  // const data3 = [];
  // for(let i = 0; i < reviews.length; i++){
  //   data3.push({
  //     name: reviews[i].name,
  //     comment: reviews[i].comment,
  //     rating: reviews[i].rating,
  //   })
  // }
  // console.log(data3)
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
  const columns2 = [
    {
      title: "Name User",
      dataIndex: "name",
    },
    {
      title: "Comments",
      dataIndex: "comment",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
  ];
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
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
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
            {userPermissions.has("update") ? (
              <Button
                key={`edit_${record.key}`}
                onClick={() => handleEdit(record.key)}
                icon={<EditOutlined />}
                className="mr-2"
              />
            ) : (
              <StopOutlined style={{ color: "#EE4E4E", fontSize: "20px" }} />
            )}
            {userPermissions.has("delete") ? (
              <Button
                key={`delete_${record.key}`}
                onClick={() => showDeleteConfirm(record.key)}
                icon={<DeleteOutlined />}
                danger
                className="mr-2"
              />
            ) : (
              <StopOutlined style={{ color: "#EE4E4E", fontSize: "20px" }} />
            )}
            <Button onClick={() => handleView(record)} icon={<LuView />} />
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
      <div>
        <Modal
          title="Product Detail"
          open={selectedProduct}
          onCancel={() => {
            setSelectedProduct(null);
          }}
        >
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.image}
                alt="Product"
                style={{ width: "100px", height: "100px" }}
              />
              <p>Name: {selectedProduct.name}</p>
              <p>Description: {selectedProduct.description}</p>
              <p>Category: {selectedProduct.category}</p>
              <p>Price: {selectedProduct.price}</p>
              <p>Stock: {selectedProduct.stock}</p>
            </>
          )}
          {/* <Table  dataSource={data3} columns={columns2} /> */}
        </Modal>
      </div>
    </div>
  );
};
export default Productlist;

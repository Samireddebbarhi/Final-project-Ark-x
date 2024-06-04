import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  getProducts,
  deleteProduct,
  searchProducts,
} from "../features/product/productSlice";
import CustomizedDialogs from "../admin/components/Dialog";
import AddProduct from "../admin/components/AddProduct";
import { base_url } from "../utils/baseUrl";
import axios from "axios";
import { EditOutlined, DeleteOutlined, StopOutlined } from "@ant-design/icons";
import EditeProduct from "../admin/components/EditeProduct";
import { LuView } from "react-icons/lu";

const { confirm } = Modal;
const { Search } = Input;

const Productlist = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const userPermissions = new Set(
    JSON.parse(localStorage.getItem("user"))?.admin.permissions
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSearch = async (value) => {
    try {
      dispatch(searchProducts(value));
    } catch (error) {
      // Handle error
      console.error("Error searching products:", error);
      message.error("Failed to fetch search results");
    }
  };

  const handleDelete = async (productId) => {
    try {
      //await axios.delete(`${base_url}/deleteProduct/${productId}`);
      dispatch(deleteProduct(productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (productId) => {
    setIsEditing(true);
    setProductId(productId);
  };

  const handleView = (record) => {
    setSelectedProduct(record);
  };

  const data1 = products.map((product) => ({
    key: product._id,
    name: product.name,
    description: product.description,
    category: product.category ? product.category.name : "",
    price: `${product.price}`,
    image: product.image,
    stock: product.stock,
  }));

  const handleAddProduct = () => {
    setOpenDialog(true);
  };

  const showDeleteConfirm = (productId) => {
    confirm({
      title: "Are you sure delete this Product?",
      icon: <ExclamationCircleFilled />,
      content: "Sure You Want To Delete it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(productId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    { title: "SNo", dataIndex: "key" },
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
    { title: "Price", dataIndex: "price", sorter: (a, b) => a.price - b.price },
    {
      title: "Actions",
      render: (record) => (
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
      ),
    },
  ];

  const tableContainerStyle = {
    height: "calc(100vh - 220px)",
    overflowY: "scroll",
  };

  return (
    <div className="relative">
      <h3 className="mb-4 title">Products</h3>
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 flex justify-center">
          <Search
            placeholder="Search for products"
            enterButton="Search"
            onSearch={handleSearch}
            style={{ maxWidth: 400, width: "100%" }}
          />
        </div>
        {userPermissions.has("create") && (
          <div className="ml-4">
            <CustomizedDialogs
              open={openDialog}
              onClose={() => setOpenDialog(false)}
            >
              <AddProduct />
            </CustomizedDialogs>
          </div>
        )}
      </div>
      <div style={tableContainerStyle}>
        <Table dataSource={data1} columns={columns} />
      </div>
      <div>
        <Modal
          title="Edit Product"
          open={isEditing}
          okText="Save"
          onCancel={() => setIsEditing(false)}
          onOk={() => setIsEditing(false)}
        >
          <EditeProduct key={productId} productId={productId} />
        </Modal>
      </div>
      <div>
        <Modal
          title="Product Detail"
          open={!!selectedProduct}
          onCancel={() => setSelectedProduct(null)}
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
        </Modal>
      </div>
    </div>
  );
};

export default Productlist;

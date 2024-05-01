import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomizedDialogs from "../admin/components/Dialog"
import AddProduct from "./AddProduct";
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
    title: "Action",
    dataIndex: "action",
  },
];


const Productlist = () => {
  const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getProducts())
    }, []);
  
  const {products} = useSelector((state) => state.product);
  const data1 = [];
  for (let i = 0; i < products.length ; i++) {
    data1.push({
      key: i + 1,
      name: products[i].name,
      description: products[i].description,
      category: products[i].category,
      price: `${products[i].price}`,
      action: (
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-2xl">
            <BiEdit />
          </Link>
          <Link to="/" className="text-2xl">
            <AiFillDelete />
          </Link>
      </div>
      )
    });
    
  }
  console.log(data1);
  // console.log(products)
  const handleAddProduct = () => {
    setOpenDialog(true); // Open the dialog when the button is clicked
  };
  return (
    <div className="relative">
  <h3 className="mb-4 title">Products</h3>
  <div className="absolute top-0 right-0 mt-4 mr-4">
    {/* <Button type="primary"  onClick={handleAddProduct}>
    </Button> */}
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
import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input} from "antd";
// import 'antd/dist/antd.css';


import { useDispatch, useSelector } from 'react-redux';
;
import { getProducts, updateProduct } from '../../features/product/productSlice'; // Updated import
import axios from 'axios'
import { base_url } from '../../utils/baseUrl';

const EditProduct = ({ productId }) => { // Accept productId as props
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });


useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/getProduct/${productId}`);
        const product = response.data;
        console.log("Product details:", product);
        setFormValues(product);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server:", error.request);
        } else {
          // Something else happened while setting up the request
          console.error("Error setting up the request:", error.message);
        }
      }
    };
  
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Dispatch the updateProduct action with the productId and formValues
      const result =  await dispatch(updateProduct({ productId, updatedProduct: formValues }));
      
      // Check if the action was successful
      if (updateProduct.fulfilled.match(result)) {
        console.log("Product edited successfully:", result.payload);
        dispatch(getProducts()) // to get the product list with the upadate product
       alert("product updated !!!")
      }
    } catch (error) {
      console.error("Failed to edit product:", error);
      // Optionally, show an error notification to the user
    }}


  return (
    <div className="px-8 py-6">
      
     
      <h1 className="text-3xl font-bold mb-7">Edite Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Enter Name :</label>
          <Input 
            type="text" 
            className="form-control"
            id="name" 
            placeholder="Enter Product Title"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required= {true}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Enter Description :</label>
          <Input
            type="text" 
            className="form-control"
            id="description" 
            placeholder="Enter Product Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            require={true}
          />

        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Enter Price :</label>
          <Input 
            type="number" 
            className="form-control"
            id="price" 
            placeholder="Enter Product Price"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            required= {true}
          />
        </div>

        {/* <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Category :</label>
        <Input 
            type="text" 
            className="form-control"
            id="category" 
            placeholder="Enter Category" 
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            required={true}
          />
        </div> */}


        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Enter Quantity :</label>
          <Input
            type="number" 
            className="form-control"
            id="stock" 
            placeholder="Enter Product Quantity" 
            name="stock"
            value={formValues.stock}
            onChange={handleInputChange}
            required={true}
          />
        </div>
          <br/>
          <br/>
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" 
          type="submit"
        >
          Edit Product
        </button>
      </form>
    </div>
  
  );
}

export default EditProduct;

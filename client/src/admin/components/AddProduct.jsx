import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select } from "antd";
// import 'antd/dist/antd.css';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImg } from '../../features/upload/uploadSlice';
import { addProduct, getProducts } from '../../features/product/productSlice';



const AddProduct = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image:""
  });
  // const [desc, setDesc] = useState("");
  const [images, setImage] = useState(null);

    
  
  const uploadImage = async () => {
    try {
      const data = new FormData();
      data.append("file", images);
      data.append("upload_preset", "mnrlqvyj");
      data.append("cloud_name", "dx1axcvms");
      data.append("folder", "Cloudinary-React");
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dx1axcvms/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(`Failed to upload image: ${responseData.message}`);
      }
  
      console.log("response:", responseData);
      
      return responseData; // Return the response data
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  };
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(file);
      console.log(file)

    }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // const handleDesc = (value) => {
  //   setDesc(value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Upload the image
      const uploadedImage = await uploadImage();
  
      // Create the product object with the uploaded image URL
      const productData = {
        ...formValues,
        image: uploadedImage.secure_url // Assuming the image URL is returned in the response from uploadImage
      };
  
      // Dispatch the addProduct action
      const actionResult = await dispatch(addProduct(productData));
      const result = actionResult.payload;
  
      // If product was added successfully
      if (result) {
        // Reset form values after successful submission
        setFormValues({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: ""
        });
  
        // Fetch updated products
        dispatch(getProducts());
  
        // Show success message
        alert("Product Added Successfully");
      } else {
        // Show error message if product addition failed
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-7">Add Produt</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Enter Name :</label>
          <input 
            type="text" 
            className="form-control"
            id="name" 
            placeholder="Enter Product Title"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required={true}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Enter Description :</label>
          <input 
            type="text" 
            className="form-control"
            id="description" 
            placeholder="Enter Product Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            required={true}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Enter Price :</label>
          <input 
            type="number" 
            className="form-control"
            id="price" 
            placeholder="Enter Product Price"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            required={true}
          />
        </div>

        <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Category :</label>
        <input 
            type="text" 
            className="form-control"
            id="category" 
            placeholder="Enter Category" 
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            required={true}
          />
        </div>

        <br />
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Enter Quantity :</label>
          <input 
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

        <input type="file"
        name="image" onChange={(e)=>handleImageChange(e)} />

        
        
          <br/>
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" 
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

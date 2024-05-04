import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select } from "antd";
// import 'antd/dist/antd.css';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImg } from '../../features/upload/uploadSlice';
import { addProduct } from '../../features/product/productSlice';



const AddProduct = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  // const [desc, setDesc] = useState("");
  const imgState = useSelector((state) => state.upload.images);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formValues))
      .unwrap()
      .then((result) => {
        console.log("Product added successfully:", result);
        // Reset form values after successful submission
        setFormValues({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
        });
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("Failed to add product:", error);
        alert("Product added successfully!");
      });
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-7">Add Produ</h1>
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
          />
        </div>


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
          />
        </div>

        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4">
          <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div className='showImage'>
          {imgState.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt={`Uploaded Image ${index}`} />
            </div>
          ))}
        </div>
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

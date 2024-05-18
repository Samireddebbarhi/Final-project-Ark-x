import React, { useEffect, useState } from 'react';
import "react-quill/dist/quill.snow.css";
import { Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/pcotegory/pcotegorySlice';
import { addProduct, getProducts } from '../../features/product/productSlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    categoryName:"",
    stock: "",
    image: ""
  });
  const [images, setImage] = useState(null);
  const pCatStat = useSelector((state) => state.pCategory.pCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
    console.log(file);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // const handleCategoryChange = (e) => {
  //   const { value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     categoryId: value, // Set categoryId to the selected value
  //   });
  // };
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const selectedCategory = pCatStat.find(category => category._id === value);
    setFormValues({
      ...formValues,
      categoryId: value,
      categoryName: selectedCategory ? selectedCategory.name : ""// Store category name
    });
  };

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
          categoryId: "",
          categoryName:"",
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
      <h1 className="text-3xl font-bold mb-7">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Enter Name :</label>
          <Input
            type="text"
            className="w-full"
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
          <Input
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
          <Input
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
          <select
            id="category"
            name="categoryId"
            value={formValues.categoryId}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>Select Category</option>
            {pCatStat.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <br />
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
        <br />

        <Input type="file" name="image" onChange={handleImageChange} />

        <div className="mb-4 text-right">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-6"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

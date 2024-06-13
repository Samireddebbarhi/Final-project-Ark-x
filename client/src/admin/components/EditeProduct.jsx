import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateProduct,
} from "../../features/product/productSlice";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const EditProduct = ({ productId }) => {
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
        setFormValues({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
        });
      } catch (error) {
        console.error(
          "Failed to fetch product details:",
          error.response?.data || error.message
        );
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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateProduct({ productId, updatedProduct: formValues })
      );
      if (updateProduct.fulfilled.match(result)) {
        console.log("Product edited successfully:", result.payload);
        dispatch(getProducts());
        alert("Product updated successfully!");
      }
    } catch (error) {
      console.error("Failed to edit product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-7">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Name :
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Enter Product Title"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Description :
          </label>
          <Input
            type="text"
            id="description"
            placeholder="Enter Product Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Price :
          </label>
          <Input
            type="number"
            id="price"
            placeholder="Enter Product Price"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Quantity :
          </label>
          <Input
            type="number"
            id="stock"
            placeholder="Enter Product Quantity"
            name="stock"
            value={formValues.stock}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="submit"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

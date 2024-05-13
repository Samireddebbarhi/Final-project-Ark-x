import React, { useEffect, useState } from "react";
import CustomInput from "../admin/components/CustomerInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { Select } from "antd";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { uploadImg } from "../features/upload/uploadSlice";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [images, setImages] = useState([]);
  const newProduct = useSelector((state) => state.product);
  const { isSucess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSucess && createdProduct) {
      alert("🦄 Product add Successfully");
    }
    if (isError) {
      alert("🦄 Somthing Went Wrong!");
    }
  }, [isSucess, isError, isLoading, createdProduct]);

  let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    category: yup.string().required("Category is Required"),
    stock: yup.number().required("Quantity is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(addProduct(values));
      formik.resetForm();
    },
  });

  const [desc, setDesc] = useState();
  const imgState = useSelector((state) => state.upload.images);

  const handleDesc = (e) => {
    setDesc(e);
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-7">Add Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Name :
          </label>
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
        </div>
        <div className="error text-red-600">
          {formik.touched.name && formik.errors.name}
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Description :
          </label>
          <br />
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("desctiption")}
            value={formik.values.description}
          />
        </div>
        <div className="error  text-red-600">
          {formik.touched.description && formik.errors.description}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Price :
          </label>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
        </div>
        <div className="error text-red-600">
          {formik.touched.price && formik.errors.price}
        </div>
        <label
          htmlFor="quintity"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Quantity :
        </label>
        <CustomInput
          type="number"
          label="Enter Product Quantity"
          name="stock"
          onChng={formik.handleChange("stock")}
          onBlr={formik.handleBlur("stock")}
          val={formik.values.stock}
        />
        <br />
        <div className="error text-red-600">
          {formik.touched.stock && formik.errors.stock}
        </div>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <br />
        <div className="showImage">
          {imgState.map((i, j) => {
            return (
              <div key={j}>
                <img src={i.url} alt="imga iploaded" />
              </div>
            );
          })}
        </div>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

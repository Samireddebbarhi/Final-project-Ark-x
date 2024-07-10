import React, { useEffect } from "react";
import CustomInput from "../admin/components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadImg } from "../features/upload/uploadSlice";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../features/product/productSlice";
import * as yup from "yup";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      alert("🦄 Product added successfully");
    }
    if (isError) {
      alert("🦄 Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

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

  const imgState = useSelector((state) => state.upload.images);

  const handleDesc = (value) => {
    formik.setFieldValue("description", value);
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
            Enter Name:
          </label>
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error text-red-600">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Description:
          </label>
          <br />
          <ReactQuill
            theme="snow"
            name="description"
            onChange={handleDesc}
            onBlur={formik.handleBlur}
            value={formik.values.description || ""}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error text-red-600">{formik.errors.description}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Price:
          </label>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="error text-red-600">{formik.errors.price}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Quantity:
          </label>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="stock"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
          />
          {formik.touched.stock && formik.errors.stock && (
            <div className="error text-red-600">{formik.errors.stock}</div>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 mb-4">
          <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
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

        <div className="showImage">
          {imgState.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt={`Uploaded image ${index}`} />
            </div>
          ))}
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

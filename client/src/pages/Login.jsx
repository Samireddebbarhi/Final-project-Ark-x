import React, { useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { getProducts } from "../features/product/productSlice";

// Validation schema for the form
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { isError, isSuccess, isLoading, message } = authState;

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  // Effect to handle navigation after successful login
  useEffect(() => {
    if (isSuccess) {
      dispatch(getProducts());
      navigate("/list-product"); // Redirect to the products list
    }
  }, [isSuccess, dispatch, navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "#03AED2" }}
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <p className="text-center text-gray-600">
          Login to your account to continue.
        </p>
        {isError && (
          <Alert
            message="Login Failed"
            description={message || "Username and password are incorrect."}
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Email Address"
            validateStatus={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
            help={formik.touched.email && formik.errors.email}
          >
            <Input
              id="email"
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            validateStatus={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            help={formik.touched.password && formik.errors.password}
          >
            <Input.Password
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <div className="mb-3 text-right">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
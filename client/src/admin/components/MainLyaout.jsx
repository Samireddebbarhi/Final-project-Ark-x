import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
 
} from '@ant-design/icons';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
 
} from "react-icons/ai";
import { LogOut } from "iconoir-react";
import { ToastContainer } from "react-toastify";
import { BiCategoryAlt } from "react-icons/bi";
import { Button, Layout, Menu, theme } from 'antd';
import { FaClipboardList } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import ProfileAdmin from "./ProfileAdmin"
// import { Bounce, ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const { Header, Sider, Content } = Layout;
const MainLyaout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

   // Access user state from Redux store
   const user = useSelector((state) => state.auth.user);
   const dispatch = useDispatch();
   const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    // Redirect to login or homepage
    navigate("/login");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <ProfileAdmin
          username={`Welcome ${user ? user.admin.username : ""}!!`}
        />
        <div className="logo" ><h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="lg-logo"></span>
          </h2></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {
              handleLogout();// Call handleLogout when signout is clicked
            } else {
              navigate(key);
            }
          }}
    
          items={[
            {
              key: "dashborad",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: 'Dashborad',
            },
            {
              key: 'Catalog',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Catalogs',
              children :  [
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
              ]
            },
            {
              key: "admins",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Admins",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "signout",
              icon: <LogOut className="fs-4" />,
              label: "Signout",
            },

          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLyaout;
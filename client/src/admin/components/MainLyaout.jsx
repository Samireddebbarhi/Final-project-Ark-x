<<<<<<< HEAD
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
=======
import React, { useState } from 'react';
import Header from './Header'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { LogOut } from "iconoir-react";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
<<<<<<< HEAD
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import ProfileAdmin from "./ProfileAdmin";
import { isSuperAdmin } from "../../utils/authUtils";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
=======
import { Button, Layout, Menu, theme } from 'antd';
import { FaClipboardList } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const { Sider, Content } = Layout;
const MainLyaout = () => {
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
<<<<<<< HEAD

  // Access user state from Redux store
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    // Redirect to login or homepage
    navigate("/login");
  };

=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
  return (
    <Layout /*onContextMenu={(e) => e.preventDefault()}*/>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <ProfileAdmin
          username={`Welcome ${user ? user.admin.username : ""}!!`}
        />

        <Menu
          theme="dark"
          mode="inline"
<<<<<<< HEAD
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "SignOut") {
              handleLogout(); // Call handleLogout when signout is clicked
            } else {
=======
          defaultSelectedKeys={['1']}
          onClick={({ key}) => {
            if(key == ""){ 
            }else {
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
              navigate(key);
            }
          }}
          items={[
            {
              key: "Dashboard",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalogs",
              children: [
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
              ],
            },

            isSuperAdmin(user.admin) && {
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
              key: "SignOut",
              icon: <LogOut className="fs-4" />,
              label: "SignOut",
            },
          ]}
        />
      </Sider>
<<<<<<< HEAD
      <Layout className="site-layout">
=======
      <Layout>
      <Header />
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
<<<<<<< HEAD
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
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
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
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import ProfileAdmin from "./ProfileAdmin";
import { isSuperAdmin } from "../../utils/authUtils";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
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
    <Layout /*onContextMenu={(e) => e.preventDefault()}*/>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <ProfileAdmin
          username={`Welcome ${user ? user.admin.username : ""}!!`}
        />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "SignOut") {
              handleLogout(); // Call handleLogout when signout is clicked
            } else {
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
export default MainLayout;
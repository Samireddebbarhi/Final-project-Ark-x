import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { LogOut } from "iconoir-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
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

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ position: "fixed", height: "100vh", overflow: "auto" }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "SignOut") {
              handleLogout();
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
              icon: <AiOutlineShoppingCart className="fs-4" />,
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
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            position: "fixed",
            width: `calc(100% - ${collapsed ? 80 : 200}px)`,
            left: collapsed ? 80 : 200,
            zIndex: 1,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            padding: 0,
            transition: "width 0.2s, left 0.2s",
          }}
        >
          <div style={{ paddingLeft: 16 }}>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
            )}
          </div>
          <div
            style={{
              paddingLeft: 600,
            }}
          >
            <ProfileAdmin
              username={`Welcome ${user ? user.admin.name : ""}!! 🎉`}
            />
          </div>
        </Header>
        <Content
          style={{
            marginTop: 64,
            padding: "24px 16px",
            minHeight: "100vh",
            background: colorBgContainer,
            overflow: "auto",
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

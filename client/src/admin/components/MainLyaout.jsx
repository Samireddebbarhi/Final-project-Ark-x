import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { Button, Layout, Menu, theme } from 'antd';
import { FaClipboardList } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const MainLyaout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" ><h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="lg-logo"></span>
          </h2></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == "") {
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
              key: 'categories',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Categories',
              children :  [
                {
                  key: "add-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "add-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: " Add Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
              ]
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
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
           
          }}
        >
         
         <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLyaout;
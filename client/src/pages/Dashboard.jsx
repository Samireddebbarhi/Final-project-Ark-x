import React from "react";
import { BsArrowDownRight, BsArrowUpRight, BsBarChart, BsBoxSeam, BsFillPeopleFill } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table, Card, Row, Col, Layout, Menu } from "antd";
import './Dashboard.css';

const { Header, Content } = Layout;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    { type: "Jan", sales: 38 },
    { type: "Feb", sales: 52 },
    { type: "Mar", sales: 61 },
    { type: "Apr", sales: 145 },
    { type: "May", sales: 48 },
    { type: "Jun", sales: 38 },
    { type: "Jul", sales: 38 },
    { type: "Aug", sales: 38 },
    { type: "Sep", sales: 38 },
    { type: "Oct", sales: 38 },
    { type: "Nov", sales: 38 },
    { type: "Dec", sales: 38 },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: "#ffd333",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: "Month" },
      sales: { alias: "Income" },
    },
  };

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div className="logo">My Dashboard</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Reports</Menu.Item>
          <Menu.Item key="3">Settings</Menu.Item>
        </Menu>
      </Header>
      <Content className="dashboard-content">
        <div className="dashboard">
          <h3 className="mb-4 title">Dashboard</h3>
          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <Card className="dashboard-card dashboard-card--yellow">
                <div className="card-content">
                  <BsFillPeopleFill className="card-icon" />
                  <div>
                    <p className="desc">Total Users</p>
                    <h4 className="mb-0 sub-title">1,200</h4>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <h6 className="red">
                    <BsArrowDownRight /> 10%
                  </h6>
                  <p className="mb-0 desc">Compared to last month</p>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="dashboard-card dashboard-card--blue">
                <div className="card-content">
                  <BsBarChart className="card-icon" />
                  <div>
                    <p className="desc">Total Sales</p>
                    <h4 className="mb-0 sub-title">$2,300</h4>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <h6 className="green">
                    <BsArrowUpRight /> 25%
                  </h6>
                  <p className="mb-0 desc">Compared to last month</p>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="dashboard-card dashboard-card--green">
                <div className="card-content">
                  <BsBoxSeam className="card-icon" />
                  <div>
                    <p className="desc">New Orders</p>
                    <h4 className="mb-0 sub-title">350</h4>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <h6 className="red">
                    <BsArrowDownRight /> 5%
                  </h6>
                  <p className="mb-0 desc">Compared to last month</p>
                </div>
              </Card>
            </Col>
          </Row>
          <div className="mt-4">
            <h3 className="mb-5 title">Income Statistics</h3>
            <div>
              <Column {...config} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-5 title">Recent Orders</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;

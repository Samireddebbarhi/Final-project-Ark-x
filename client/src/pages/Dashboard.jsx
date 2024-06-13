import React, { useState, useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight, BsBarChart, BsBoxSeam, BsFillPeopleFill, BsBell, BsMoon, BsSun } from "react-icons/bs";
import { Column, Pie } from "@ant-design/plots";
import { Table, Card, Row, Col, Layout, Menu, Switch, Avatar, Badge } from "antd";
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

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Mock data fetching
    const fetchData = () => {
      setData([
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
      ]);

      setPieData([
        { type: 'Product A', value: 27 },
        { type: 'Product B', value: 25 },
        { type: 'Product C', value: 18 },
        { type: 'Product D', value: 15 },
        { type: 'Product E', value: 10 },
        { type: 'Product F', value: 5 },
      ]);

      const mockTableData = [];
      for (let i = 0; i < 46; i++) {
        mockTableData.push({
          key: i,
          name: `Edward King ${i}`,
          product: `Product ${i % 10}`,
          status: `Status ${i % 5}`,
        });
      }
      setTableData(mockTableData);
    };

    fetchData();
  }, []);

  const columnConfig = {
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

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Layout className={darkMode ? "dashboard-layout dark-mode" : "dashboard-layout"}>
      
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
                    <h4 className="mb-0 sub-title animated-number">1,200</h4>
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
                    <h4 className="mb-0 sub-title animated-number">$2,300</h4>
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
                    <h4 className="mb-0 sub-title animated-number">350</h4>
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
              <Column {...columnConfig} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-5 title">Sales Distribution</h3>
            <div>
              <Pie {...pieConfig} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-5 title">Recent Orders</h3>
            <div>
              <Table columns={columns} dataSource={tableData} />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;

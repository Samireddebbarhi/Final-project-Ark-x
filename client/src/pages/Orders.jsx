  import React, { useEffect} from "react";
  import { Button, Table, Modal, Dropdown,Menu} from "antd";
  import { useDispatch, useSelector } from "react-redux";
  import { LuView } from "react-icons/lu";
  import { getAllOrders, updateOrder } from "../features/orders/orderSlice";
  import { useState } from "react";
  import { DownOutlined } from '@ant-design/icons';
  import { message } from "antd";


const { confirm } = Modal;
   // const orders = useSelector((state) => state.order);
  const Orderlist = () => {
      const dispatch = useDispatch();
      const orders = useSelector((state) => state.orders.list);
      const [data3, setData3] = useState([]);
      const [selectedOrder , setSelectedOrder] = useState(null);
      const [selectedStatus, setSelectedStatus] = useState("Processing");
      
    
      useEffect(() => {
        dispatch(getAllOrders());
      }, [dispatch]);
      useEffect(() => {
        const storedStatus = localStorage.getItem("selectedStatus");
        if (storedStatus) {
            setSelectedStatus(storedStatus);
        }
    }, []);
    
      useEffect(() => {
        console.log("Orders state:", orders);
        if (orders.length > 0) {
          // Populate the data array with order information
          const newData = orders.map((order, index) => ({
            key: order._id,
            username: order.userInfo.map((item) => item.username),
            paymentInfo: order.paymentInfo.status,
            orderDate: new Date(order.paidAt).toDateString(),
            totalAmount: order.totalPrice,
            orderItems : order.orderItem || [],
            status: order.orderStatus || selectedStatus,
            
          }));
          setData3(newData);
          console.log(newData);
        }
      }, [orders]);
      // handel view order details  here
      const handleView = (record) =>{
        setSelectedOrder(record)
      };
      // 
      const handleMenuClick = async (record, e) => {
        try {
            const status = e.key === "1" ? "Delivered" : "Canceled"; // Update status based on the selected key
            await dispatch(updateOrder({ id: record.key, status }));
            message.success("Order updated successfully"); // Show success message
    
            // Update the status for the clicked order in the UI
            setData3((prevData) =>
                prevData.map((item) =>
                    item.key === record.key ? { ...item, status } : item
                )
            );
            // Update selectedStatus state
            setSelectedStatus(status);
            // Update selectedStatus in local storage
            localStorage.setItem("selectedStatus", status);
        } catch (error) {
            message.error("Failed to update order"); // Show error message
        }
    };
     // Create the dropdown menu
      const menu = (record) => (
        <Menu onClick={(e) => handleMenuClick(record, e)}>
          <Menu.Item key="1">Delivered</Menu.Item>
          <Menu.Item key="2">Canceled</Menu.Item>
        </Menu>
      );
      
      const columns = [
        // {
        //   title: "SNo",
        //   dataIndex: "key",
        // },
        {
          title: "Username",
          dataIndex: "username",
          sorter: (a, b) => a.username.length - b.username.length,
        },
    
        {
          title: "Payment Info",
          dataIndex: "paymentInfo",
          sorter: (a, b) => a.paymentInfo.length - b.paymentInfo.length,
        },
        {
          title: "Order Date",
          dataIndex: "orderDate",
          
        },
        {
          title: "Total",
          dataIndex: "totalAmount",
          sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
          title: "Actions",
          render: (record) => (
            <>
              <Button onClick={() => handleView(record)} className="mr-2"  >
                <LuView />
              </Button>
              <Dropdown overlay={menu(record)}>
              <Button>
              {record.status ? record.status : "Status"} <DownOutlined />
              </Button>
            </Dropdown>
            </>
          ),
        },
      ];
    
    return (
      <div className="relative">
    <h3 className="mb-4 text-2xl font-bold">Orders</h3>
    <br />
    <div>
      <Table dataSource={data3} columns={columns} />
      
    </div>
    <div>
      <Modal
            title="Order Detail"
            open={selectedOrder}
            onCancel={()=>  {setSelectedOrder(null)}}
            footer={null}
            style={{ minWidth: "600px" }}
          >
           {selectedOrder && (
            <>
             <h4>Order Items: </h4>
             <Table 
              dataSource={selectedOrder.orderItems}
              columns={[
                {title: "ID", dataIndex: "Idproduct"},
                {
                  title: "Image",
                  dataIndex: "image",
                  render: (text, record) => (
                    <img
                      src={record.image}
                      alt="Product"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ),
                },
                {title: "Name", dataIndex: "name"},
                {title: "Price", dataIndex: "price"},
                {title: "Quantity", dataIndex: "quantity"},
               
              ]}
              rowKey={(_record, index) => index}
              pagination={false}
              />
            </>
          )}
          </Modal>
    </div>
  </div>
    );
  };

  export default Orderlist;
//   {selectedOrder.orderItems.map((item, index) => (
//     <div key1={index}>
//       <img src={item.image} alt="Product" style={{ width: "100px", height: "100px" }} />
//       <p>Name: {item.name}</p>
//       <p>Price: {item.price}</p>
//       <p>Quantity: {item.quantity}</p>
//     </div>
//   ))}
// </>
// )}
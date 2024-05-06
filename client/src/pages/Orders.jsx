import React, { useState, useEffect } from "react";
import axios from "axios";
import Order from "./Order"; // Import the Order component

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {/* Render the Order component for each order */}
              <Order order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;

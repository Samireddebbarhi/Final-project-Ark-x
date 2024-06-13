import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { product_view } from "../../utils/baseUrl";
import Loader from "../../helpers/Loader";

const TopProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${product_view}/base/getAllProducts`);
      const filteredData = response.data.product.filter(
        (product) => product.rating >= 3
      );
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-row overflow-x-auto flex-wrap justify-center mt-4">
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : data && data.length > 0 ? (
        data.map((product) => (
          <div key={product._id} className="mr-4 mb-4">
            <Card value={product} />
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default TopProduct;

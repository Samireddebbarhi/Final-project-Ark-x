// ProductCard.js

import React, { useState, useEffect } from "react";
import Card from "../../components/Cards/Card";
import axios from "axios";
import { product_view } from "../../utils/baseUrl";
import Header from "../../components/Header/Navbar";
import Loader from "../../helpers/Loader";
import { Button, TextField } from "@mui/material";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${product_view}/base/getAllProducts`);
      const filteredData = response.data.product.filter(
        (product) => product.category.name === "laptops"
      );
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${product_view}/getProductByKeyword?keyword=${searchData}`
      );
      setData(response.data.data.products);
      setSearchData("");
      setLoading(false);
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Failed to fetch search results");
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchData(value);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-16">
      <Header />
      <div className="p-6 m-6 text-center font-bold text-4xl text-indigo-600 shadow-xl rounded">
        Laptops
      </div>
      <div className="m-auto w-full text-center">
        <TextField
          id="standard-basic"
          label="Search Mobiles Product"
          variant="standard"
          value={searchData}
          onChange={handleOnChange}
          style={{ width: "55em" }}
          size="medium"
          onKeyDown={handleKey}
        />
        <Button
          style={{ marginTop: "1em", marginLeft: "1em" }}
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
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
    </div>
  );
};

export default ProductCard;

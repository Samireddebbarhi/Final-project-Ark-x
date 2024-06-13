import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards/Card';
import axios from 'axios';
import { product_view } from '../../utils/baseUrl';
import { Link } from "react-router-dom";
import ProductDetail from './ProductDetail';
import Header from '../../components/header'
import Footer from '../../components/Footer/Footer';


const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v2/admin/getAllProducts");
      console.log(response.data.product); // Log the entire response
      setData(response.data.product);
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

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header/>
    <div className="flex flex-row overflow-x-auto flex-wrap justify-center">
    {data && data.length > 0 ? (
      (() => {
        const elements = [];
        for (let i = 0; i < data.length; i++) {
          const value = data[i];
          elements.push(
            <Link to={`/products/${value._id}`} key={value._id}>
              <Card value={value} />
            </Link>
          );
        }
        return elements;
      })()
    ) : (
      <p>No products available.</p>
    )}
  </div>
  <Footer/>
  </div>
  );
};

export default ProductCard;
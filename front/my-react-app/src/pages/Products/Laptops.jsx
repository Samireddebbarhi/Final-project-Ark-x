import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards/Card';
import axios from 'axios';
import { product_view } from '../../utils/baseUrl';
import Header from '../../components/Header';

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${product_view}/getAllProducts`);
      console.log(response.data.product); 
      const filteredData = response.data.product.filter(product => product.category.name === 'laptops');
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

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center mt-16">
      <Header />
      <div className="flex flex-row overflow-x-auto flex-wrap justify-center mt-4">
        {data && data.length > 0 ? (
          data.map((value) => (
            <Card value={value} key={value._id} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

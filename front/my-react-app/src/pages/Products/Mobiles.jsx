import React, { useState, useEffect } from 'react';
import Card from '../../components/Cards/Card';
import axios from 'axios';
import { product_view } from '../../utils/baseUrl';
import { Link} from "react-router-dom"

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${product_view}/getAllProducts`);
      console.log(response.data.product);
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
    <div className="flex flex-row overflow-x-auto flex-wrap justify-center">
      {data && data.length > 0 ? (
        data.map((value) => (
            <Link to={`/products/${value.id}`} key={value.id}>
                <Card value={value} />
            </Link>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductCard;

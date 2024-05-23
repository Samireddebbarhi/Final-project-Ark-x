import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { product_view } from '../../utils/baseUrl';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Use useParams to get the product ID from the URL

  useEffect(() => {
    console.log('product id', id)
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${product_view}/getProduct/${id}`);
        setProduct(response.data.product);
        console.log(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Something went wrong", error);
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    product && (
      <div>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px' }} />
        <p>{product.description}</p>
        <p>Price: {product.price} Dhs</p>
        {/* Additional details */}
      </div>
    )
  );
};

export default ProductDetail;

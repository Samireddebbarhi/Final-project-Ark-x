import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { product_view } from '../../utils/baseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Use useParams to get the product ID from the URL

  useEffect(() => {
    console.log('product id', id);
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

  const fakeReviews = [
    {
      username: "TechEnthusiast23",
      rating: 5,
      comment: "Absolutely love this phone! The camera quality is superb, and the performance is top-notch. Highly recommended!"
    },
    {
      username: "MobileGuru101",
      rating: 4,
      comment: "Great value for money. The battery life is impressive, and the display is stunning. Definitely worth the purchase."
    },
    {
      username: "GadgetFanatic88",
      rating: 3,
      comment: "Decent phone overall. The software could be better optimized, but it gets the job done. Average camera quality."
    },
    {
      username: "DigitalNomad22",
      rating: 4,
      comment: "Excellent phone for productivity. Multitasking is smooth, and the design is sleek. Would recommend for professionals."
    },
  ];

  return (
    product && (
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {[...Array(5)].map((star, index) => (
                    <FontAwesomeIcon
                      icon={(index + 1) <= product.reviews ? faStar : (index + 0.5) === product.reviews ? faStarHalfAlt : 'far fa-star'}
                      key={index}
                      className="w-4 h-4 grey-500"
                    />
                  ))}
                  <span className="text-gray-600 ml-3">{product.reviews} Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">{product.price}Dhs</span>
                <button className="flex ml-auto text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 focus:bg-gray-700 rounded">
                  Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <FontAwesomeIcon icon={faHeart} className="w-5 h-5"/>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-5">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fakeReviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="flex items-center">
                      {[...Array(5)].map((star, idx) => (
                        <FontAwesomeIcon
                          icon={(idx + 1) <= review.rating ? faStar : (idx + 0.5) === review.rating ? faStarHalfAlt : 'far fa-star'}
                          key={idx}
                          className="w-4 h-4 text-yellow-500"
                        />
                      ))}
                    </span>
                    <span className="text-gray-600 ml-3">{review.username}</span>
                  </div>
                  <p className="leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 mt-4 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Add Comment</button>
          </div>
        </div>
      </section>
    )
  );
};

export default ProductDetail;

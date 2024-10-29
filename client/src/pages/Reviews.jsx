import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError('Failed to fetch reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews found.</p>;

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            Review ID: {review.id}, Rating: {review.rating}, Comment: {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;

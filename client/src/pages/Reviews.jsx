import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              Review ID: {review.id}, Rating: {review.rating}, Comment:{" "}
              {review.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;

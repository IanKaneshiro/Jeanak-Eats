
import "./ReviewModal.css";

import { addReview } from "../../../store/reviews"
import { useModal } from "../../../context/Modal"


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ReviewModal() {

  const dispatch = useDispatch();
  const history = useHistory()

  const {restaurantId} = useParams()
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const payload = {
    review,
    rating
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createReview = await dispatch(addReview(payload, restaurantId));
    if (createReview) {
      setErrors(createReview);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Post Your Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Review
          <input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          Rating
          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <button type="Post">Post</button>
      </form>
    </>
  );
}

export default ReviewModal;

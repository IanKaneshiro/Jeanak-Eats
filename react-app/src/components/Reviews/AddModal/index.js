
import "./AddModal.css";

import { addReview, getReviews } from "../../../store/reviews"
import { useModal } from "../../../context/Modal"


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function AddModal() {

  const dispatch = useDispatch();

  const {restaurantId} = useParams()

  console.log(restaurantId, 'here')

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
    const createReview = await dispatch(addReview(restaurantId, payload));
    console.log(createReview)
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

export default AddModal;

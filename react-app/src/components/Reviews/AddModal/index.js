
import "./AddModal.css";

import { addReview } from "../../../store/reviews"
import { useModal } from "../../../context/Modal"

import React, { useState } from "react";
import { useDispatch } from "react-redux";


function AddModal(data) {

  const dispatch = useDispatch();

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

    try{
      const createReview = await dispatch(addReview(data.data, payload));
    }
    catch(createReview){
      console.log(createReview)
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

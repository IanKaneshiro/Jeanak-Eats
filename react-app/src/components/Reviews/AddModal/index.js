
import "./AddModal.css";

import { useModal } from "../../../context/Modal"
import { addReview } from "../../../store/reviews"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function AddModal(data) {

  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [errors, setErrors] = useState([]);



  const payload = {
    review,
    rating
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createReview = await dispatch(addReview(data.data, payload));

    if(createReview){
      setErrors(createReview)
    }
    else{
      closeModal()
    }

  };



  return (
    <>
    <div className="entireUpdateModal">
      <h1>Post Your Review</h1>
      <form onSubmit={handleSubmit}>
      <div className="excludingTitle">
        
          <textarea
            placeholder="Leave a Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

        <label>
          Rating
          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <button className="updateModalButton">Post</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default AddModal;

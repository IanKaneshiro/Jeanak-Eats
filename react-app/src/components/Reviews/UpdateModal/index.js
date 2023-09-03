
import "./UpdateModal.css";
import { useModal } from "../../context/Modal";
import { getReviews } from "../../store/reviews";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function UpdateModal() {

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const reviewState = useSelector(state=>state.reviews)
  const userState = useSelector(state=>state.session)

  const {restaurantId} = useParams()
  const [errors, setErrors] = useState([]);


  function findReview(){
    let foundReview
    reviewState?.Reviews?.forEach(element=>{
      console.log(element)
      console.log(element?.User?.id)
      console.log(userState?.id)
      if(element?.User?.id === userState?.user?.id ){
        foundReview = element?.review
      }
    })
    return foundReview
  }

  function findRating(){
    let foundRating
    reviewState?.Reviews?.forEach(element=>{
      console.log(element)
      console.log(element?.User?.id)
      console.log(userState?.id)
      console.log('element',element?.rating)
      if(element?.User?.id === userState?.user?.id ){
        foundRating = element?.rating
      }
    })
    return foundRating
  }

  const [review, setReview] = useState(findReview());
  const [rating, setRating] = useState(findRating());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allReviews = await dispatch(getReviews(restaurantId));
    if (allReviews) {
      setErrors(allReviews);
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
        <button type="Updated">Update</button>
      </form>
    </>
  );
}

export default UpdateModal;

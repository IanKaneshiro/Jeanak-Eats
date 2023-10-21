
import "./UpdateModal.css";
import { useModal } from "../../../context/Modal";
import * as reviewActions from "../../../store/reviews"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function UpdateModal() {

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const reviewState = useSelector(state=>state.reviews)
  const userState = useSelector(state=>state.session)

  let [back, setBack] = useState();

//returns the review
  function findReview(){
    let foundReview
    reviewState?.Reviews?.forEach(element=>{
      if(element?.User?.id === userState?.user?.id ){
        foundReview = element?.review
      }
    })
    return foundReview
  }

//returns the rating of the review
  function findRating(){
    let foundRating
    reviewState?.Reviews?.forEach(element=>{
      if(element?.User?.id === userState?.user?.id ){
        foundRating = element?.rating
      }
    })
    return foundRating
  }

//returns the id of the review
  function reviewId(){
    let reviewId
    reviewState?.Reviews?.forEach(element=>{
      if(element?.User?.id === userState?.user?.id ){
        reviewId = element?.id
      }
    })
    return reviewId
  }

  const [review, setReview] = useState(findReview());
  const [rating, setRating] = useState(findRating());



  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review:review,
      rating:rating
    }
    
    const allReviews = await dispatch(reviewActions.changeReview(reviewId(), payload));
    if (allReviews) {
      back = allReviews.errors
      setBack(back.errors)
    } else {
      closeModal();
    }
  };


  return (
    <>
    <div className="entireUpdateModal">
      <h1>Post Your Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="excludingTitle">
        <label>
          Review
          <textarea
          placeholder="Leave a review..."
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

        <div className="Error"> {back?.rating} </div>

        <button className="updateModalButton">Update</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default UpdateModal;

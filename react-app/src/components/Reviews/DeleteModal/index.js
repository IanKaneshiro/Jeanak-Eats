
import "./DeleteModal.css";
import * as ReviewActions from "../../../store/reviews"

import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"


function DeleteModal() {

  const dispatch = useDispatch()

  const reviewState = useSelector(state => state.reviews)
  const userState = useSelector(state=>state.session)

  function findReview(){

    let reviewId

    reviewState?.Reviews?.forEach(element=>{
      if(userState?.user?.id === element.User?.id){
        reviewId = element.id
      }
    })

    return reviewId
  }

  function click(){
      dispatch(ReviewActions.deleteReview(findReview()))
      return
  }

  return (
    <>
        <h1>Delete Your Review</h1>
        <button>No</button>
        <button onClick={click()}>Yes</button>
    </>
  );
}

export default DeleteModal;

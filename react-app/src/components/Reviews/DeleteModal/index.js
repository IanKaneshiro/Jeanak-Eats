import "./DeleteModal.css";
import { useModal } from "../../../context/Modal";
import * as ReviewActions from "../../../store/reviews";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById } from "../../../store/restaurant";

function DeleteModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const reviewState = useSelector((state) => state.reviews);
  const userState = useSelector((state) => state.session);

  const [errors, setErrors] = useState([]);

  function findReview() {
    let reviewId;

    reviewState?.Reviews?.forEach((element) => {
      if (userState?.user?.id === element.User?.id) {
        reviewId = element.id;
      }
    });

    return reviewId;
  }

  console.log(findReview(), "find review please by id");

  const click = async () => {
    const toDelete = await dispatch(ReviewActions.deleteReview(findReview()));
    dispatch(getRestaurantById(id));
    closeModal();
    return;
  };

  return (
    <>
      <div className="entireDeleteModal">
        <h1 className="deleteReview">Delete Your Review</h1>
        <div className="modalDeleteButtons">
          <button className="keepModalButton" onClick={closeModal}>
            No, Keep Review
          </button>
          <button className="deleteModalButton" onClick={click}>
            Confirm Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;

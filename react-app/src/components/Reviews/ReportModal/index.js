
import "./ReportModal.css";

import { useModal } from "../../../context/Modal"
import { addReview } from "../../../store/reviews"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ReportModal(data) {

  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();


  return (
    <>
    <div className="entireUpdateModal">
      <h1>Report Review</h1>

        <ul>
            <li value='option1'> Contains false or misleading information </li>
            <option value='option2'> Posted by someone affilitated with the store </option>
            <option value='option3'> Posted by a competitor</option>
            <option value='option4'> Contains threats or hate speech </option>
            <option value='option5'> Contains inappropriate or offensive language</option>
            <option value='option6'> Other Issue </option>
        </ul>

        <button onClick={closeModal}> Submit Report </button>
    </div>
    </>
  );
}

export default ReportModal;

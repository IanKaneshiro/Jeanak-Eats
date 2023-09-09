
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

    <div className="entireUpdateModal">
      <h1 className="reportTitle">Report Review</h1>

      <div>
        <div>
          <input type="radio" name="choose"/>
          <label className="reportText">Contains false or misleading information</label>
          </div>

        <div>
          <input type="radio" name="choose" />
          <label className="reportText" >Posted by someone affilitated with the store</label>
        </div>

        <div>
          <input type="radio" name="choose" />
          <label className="reportText" >Posted by a competitor</label>
        </div>

        <div>
          <input type="radio" name="choose" />
          <label className="reportText" >Contains threats or hate speech</label>
        </div>

        <div>
          <input type="radio" name="choose" />
          <label className="reportText" >Contains inappropriate or offensive language</label>
        </div>

        <div>
          <input type="radio" name="choose" />
          <label className="reportText" >Other Issue</label>
        </div>
      </div>

      <button className='tellMe' onClick={closeModal}> Submit Report </button>
    </div>

  );
}

export default ReportModal;

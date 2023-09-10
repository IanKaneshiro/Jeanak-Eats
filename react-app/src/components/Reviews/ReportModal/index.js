
import "./ReportModal.css";

import { useModal } from "../../../context/Modal"
import SubmittedModal from "../SubmittedModal"
import OpenModalButton from "../../OpenModalButton";

import React, { useState, useRef } from "react";
import { notImplemented } from "../../../Resources/helperFunctions";



function ReportModal() {

  const ulRef = useRef();

  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  function dis(){

    return (
      <OpenModalButton
      buttonText="Thank You"
      onItemClick={closeMenu}
      modalComponent={<SubmittedModal/>}/>
    )

  }

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

      <button className='tellMe' onClick={dis}> Submit Report </button>
    </div>

  );
}

export default ReportModal;

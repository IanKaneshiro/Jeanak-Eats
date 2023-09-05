import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./DeleteModal.css";
import { deleteRestaurant } from "../../store/restaurant";
import { useModal } from "../../context/Modal";

const DeleteModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const deleteRes = () => {
    dispatch(deleteRestaurant(id));
    closeModal();
    history.push("/manage");
  };

  return (
    <div className="delete--modal">
      <h1>Confirm Delete</h1>
      <div className="delete--modal-btn">
        <button onClick={deleteRes}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteModal;

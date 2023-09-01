import React, { useEffect, useRef } from "react";
import {
  getUsersRestaurants,
  usersRestaurants,
} from "../../../store/restaurant";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import UpdateRestaurantForm from "../../Restaurants/UpdateRestaurantForm";
import "./ManageRestaurants.css";

const ManageRestaurants = () => {
  const dispatch = useDispatch();
  const restuarants = useSelector(usersRestaurants);
  const modalRef = useRef();
  let { url } = useRouteMatch();

  useEffect(() => {
    dispatch(getUsersRestaurants());
  }, [dispatch]);

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <>
      <div>
        {restuarants.map((restuarant) => (
          <div>
            {restuarant.name}
            <dialog ref={modalRef} className="dialog">
              <UpdateRestaurantForm
                resId={restuarant.id}
                closeModal={closeModal}
              />
              <button onClick={closeModal}>close</button>
            </dialog>
            <button onClick={showModal}>Edit</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageRestaurants;

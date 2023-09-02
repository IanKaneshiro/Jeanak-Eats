import React, { useEffect, useRef } from "react";
import "./ManageRestaurantUpdatePage.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentSpot,
  currentRestaurant,
  getRestaurantById,
} from "../../../store/restaurant";
import UpdateRestaurantForm from "../../Restaurants/UpdateRestaurantForm";

const ManageRestaurantUpdatePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const restaurant = useSelector(currentRestaurant);
  const modalRef = useRef();

  useEffect(() => {
    dispatch(getRestaurantById(parseInt(id)));
    return () => dispatch(clearCurrentSpot());
  }, [dispatch, id]);

  const back = () => history.push("/manage/restaurants");

  const formatTime = (time) => {
    time = time.split(":");
    console.log(time);
    if (time[0] <= 12) {
      if (Number(time[0][0]) === 0) time[0] = time[0].slice(1);
      return `${time[0]}:${time[1]} AM`;
    } else {
      return `${time[0] - 12}:${time[1]} PM`;
    }
  };

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
  if (!restaurant.name) return <h1>...loading</h1>;

  return (
    <div>
      <button onClick={back}>Back</button>
      <h1>{restaurant.name}</h1>
      <img src={restaurant.imageUrl} alt={restaurant.name} />
      <p>
        Hours: {formatTime(restaurant.opensAt)} -
        {formatTime(restaurant.closesAt)}
      </p>
      <dialog ref={modalRef}>
        <UpdateRestaurantForm closeModal={closeModal} type={"hours"} />
      </dialog>
      <button onClick={showModal}>Edit</button>
    </div>
  );
};

export default ManageRestaurantUpdatePage;

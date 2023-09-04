import React, { useEffect } from "react";
import "./ManageRestaurantDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentSpot,
  currentRestaurant,
  getRestaurantById,
} from "../../store/restaurant";
import { calculateStars, formatTime } from "../../Resources/helperFunctions";
import OpenModalButton from "../OpenModalButton";
import UpdateRestaurantForm from "../UpdateRestaurantForm";
import DeleteModal from "../DeleteModal";
import LoadingSpinner from "../LoadingSpinner";

const ManageRestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector(currentRestaurant);

  useEffect(() => {
    dispatch(getRestaurantById(parseInt(id)));
    return () => dispatch(clearCurrentSpot());
  }, [dispatch, id]);

  if (!restaurant.id) return <LoadingSpinner />;

  return (
    <div className="manager--restaurant-detail-container">
      <OpenModalButton
        modalComponent={<UpdateRestaurantForm id={id} />}
        buttonText={"Edit"}
      />
      <OpenModalButton
        modalComponent={<DeleteModal id={restaurant.id} />}
        buttonText={"Delete"}
      />
      <div className="manager--restaurant-detail-main">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} />
        ) : (
          <p>No image</p>
        )}
        <div className="manager--restaurant-detail-info">
          <h1>{restaurant.name}</h1>
          <p>
            <i class="fa-solid fa-location-dot"></i>
            {restaurant.address}, {restaurant.city}, {restaurant.state},
            {restaurant.country}
          </p>
          <p>
            {formatTime(restaurant.opensAt)} - {formatTime(restaurant.closesAt)}
          </p>
          <p>
            {calculateStars(restaurant.avgRating)}
            {restaurant.avgRating} ({restaurant.numRatings} ratings)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageRestaurantDetails;
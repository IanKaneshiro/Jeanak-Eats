import React, { useEffect } from "react";
import "./ManageRestaurantDetails.css";
import { useParams, Link } from "react-router-dom";
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
import ManageMenuItems from "../ManageMenuItems";

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
      <div>
        <OpenModalButton
          modalComponent={<UpdateRestaurantForm id={id} />}
          buttonText={"Edit"}
        />
        <OpenModalButton
          modalComponent={<DeleteModal id={restaurant.id} />}
          buttonText={"Delete"}
        />
        <Link
          className="manager--restaurant-go-to-res"
          to={`/restaurants/${id}`}
        >
          Go to <span style={{ fontWeight: "bold" }}>{restaurant.name}</span>
        </Link>
      </div>
      <div className="manager--restaurant-detail-main">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} />
        ) : (
          <p>No image</p>
        )}
        <div className="manager--restaurant-detail-info">
          <h1>{restaurant.name}</h1>
          <p>
            <i class="fa-solid fa-location-dot"></i> {restaurant.address},{" "}
            {restaurant.city}, {restaurant.state}, {restaurant.country}
          </p>
          <p>
            {formatTime(restaurant.opensAt)} - {formatTime(restaurant.closesAt)}
          </p>
          <p>
            {calculateStars(restaurant.avgRating)}
            {restaurant.avgRating ? restaurant.avgRating.toFixed(1) : ""} (
            {restaurant.numRatings} ratings)
          </p>
        </div>
      </div>
      <div>
        <ManageMenuItems restaurant={restaurant} />
      </div>
    </div>
  );
};

export default ManageRestaurantDetails;

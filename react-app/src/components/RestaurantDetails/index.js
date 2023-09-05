import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  getRestaurantById,
  currentRestaurant,
  clearCurrentSpot,
} from "../../store/restaurant";
import MenuItem from "../MenuItems";
import OpenModalButton from "../OpenModalButton";
import "./RestaurantDetails.css";
import LoadingSpinner from "../LoadingSpinner";
import AllReviews from "../Reviews/AllReviews";

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector(currentRestaurant);
  const { restaurantId } = useParams();

  useEffect(() => {
    dispatch(getRestaurantById(restaurantId));

    return () => dispatch(clearCurrentSpot());
  }, [dispatch, restaurantId]);

  if (!restaurant.id) return <LoadingSpinner />;

  return (
    <div>
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="details--img-header"
      />
      <div className="details--restaurant-main">
        <h1>{restaurant.name}</h1>
        <p>
          <i class="fa-solid fa-star"></i> {restaurant.avgRating} (
          {restaurant.numRatings} ratings) · {restaurant.cuisine} ·{" "}
          {restaurant.priceRange} · <a href="#reviews">Read reviews</a> ·{" "}
          <span>
            <OpenModalButton buttonText={"More info"} />
          </span>
        </p>
        <p className="details--est-delivery-time">Est. delivery time here</p>
      </div>
      <MenuItem />
    </div>
  );
};

export default RestaurantDetails;

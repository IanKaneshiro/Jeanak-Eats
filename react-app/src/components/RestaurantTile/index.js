import React from "react";
import "./RestaurantTile.css";
import { useHistory } from "react-router-dom";
import {
  calculateStars,
  calculateShowHours,
} from "../../Resources/helperFunctions";

const RestaurantTile = ({ restaurant }) => {
  const history = useHistory();
  const statusHours = calculateShowHours(
    restaurant.opensAt,
    restaurant.closesAt
  );
  return (
    <div
      className="restaurant-tile--main"
      onClick={() => history.push(`/restaurants/${restaurant.id}`)}
    >
      <img
        className={statusHours[0] === "C" && "tile-close"}
        src={restaurant.imageUrl}
        alt={restaurant.name}
      />
      <h3>{restaurant.name}</h3>
      <p className="restaurant-tile--delivery-info">
        {statusHours[0] === "O"
          ? "Delivery time feature coming soon..."
          : statusHours}
      </p>
      {restaurant.avgRating && (
        <p>
          {restaurant.avgRating.toFixed(1)}{" "}
          {calculateStars(restaurant.avgRating)}
        </p>
      )}
    </div>
  );
};

export default RestaurantTile;

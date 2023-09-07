import React from "react";
import "./RestaurantTile.css";
import { useHistory } from "react-router-dom";
import { calculateStars } from "../../Resources/helperFunctions";

const RestaurantTile = ({ restaurant }) => {
  const history = useHistory();
  return (
    <div
      className="restaurant-tile--main"
      onClick={() => history.push(`/restaurants/${restaurant.id}`)}
    >
      <img src={restaurant.imageUrl} alt={restaurant.name} />
      <h3>{restaurant.name}</h3>
      <p className="restaurant-tile--delivery-info">
        Delivery time feature coming soon...
      </p>
      {restaurant.avgRating && (
        <p>
          {restaurant.avgRating} {calculateStars(restaurant.avgRating)}
        </p>
      )}
    </div>
  );
};

export default RestaurantTile;

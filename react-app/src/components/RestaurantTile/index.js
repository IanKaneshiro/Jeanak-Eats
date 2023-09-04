import React from "react";
import "./RestaurantTile.css";

const RestaurantTile = ({ restaurant }) => {
  return (
    <div className="restaurant-tile--main">
      <img src={restaurant.imageUrl} alt={restaurant.name} />
      <h2>{restaurant.name}</h2>
      <p>Information for delivery fee and est. time here</p>
      <p>{restaurant.avgRating}</p>
    </div>
  );
};

export default RestaurantTile;

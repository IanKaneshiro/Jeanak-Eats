import React from "react";
import "./RestaurantTile.css";
import { useHistory } from "react-router-dom";

const RestaurantTile = ({ restaurant }) => {
  const history = useHistory();
  return (
    <div
      className="restaurant-tile--main"
      onClick={() => history.push(`/restaurants/${restaurant.id}`)}
    >
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        style={{ width: "500px", borderRadius: "50px" }}
      />
      <h2>{restaurant.name}</h2>
      <p>Information for delivery fee and est. time here</p>
      <p>{restaurant.avgRating}</p>
    </div>
  );
};

export default RestaurantTile;

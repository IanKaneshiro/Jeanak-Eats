import React from "react";
import { Link } from "react-router-dom";
import "./SearchBarRestaurantTile.css";
import { calculateShowHours } from "../../Resources/helperFunctions";

const SearchBarRestaurantTile = ({ handleClose, restaurant }) => {
  const hours = calculateShowHours(restaurant.opensAt, restaurant.closesAt);
  return (
    <Link onClick={handleClose} to={`/restaurants/${restaurant.id}`}>
      <div className="sb-res-tile-main">
        <img
          className={hours[0] === "C" ? "res-closed" : ""}
          src={restaurant.imageUrl}
          alt={restaurant.id}
        />
        <div className="sb-res-tile-info">
          <p>{restaurant.name}</p>
          <p className="sb-res-tile-text">
            {hours[0] === "O"
              ? restaurant.priceRange + "·" + restaurant.cuisine
              : hours}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchBarRestaurantTile;

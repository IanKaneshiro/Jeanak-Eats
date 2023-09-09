import React from "react";
import { Link } from "react-router-dom";
import "./SearchBarRestaurantTile.css";

const SearchBarRestaurantTile = ({ handleClose, restaurant }) => {
  return (
    <Link onClick={handleClose} to={`/restaurants/${restaurant.id}`}>
      <div className="sb-res-tile-main">
        <img src={restaurant.imageUrl} alt={restaurant.id} />
        <div className="sb-res-tile-info">
          <p>{restaurant.name}</p>
          <p>
            {restaurant.priceRange} · {restaurant.cuisine}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchBarRestaurantTile;

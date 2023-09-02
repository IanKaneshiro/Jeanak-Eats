import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRestaurant } from "../../store/restaurant";
import "./ManageRestaurantsTile.css";

const ManageRestaurantsTile = ({ restaurant }) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const deleteRes = () => {
    dispatch(deleteRestaurant(restaurant.id));
  };
  return (
    <div>
      <h2>{restaurant.name}</h2>
      {restaurant.imageUrl ? (
        <img src={restaurant.imageUrl} alt={restaurant.name} />
      ) : (
        <p>No image</p>
      )}
      <Link to={`${url}/${restaurant.id}`}>
        <button>Manage</button>
      </Link>
      <button onClick={deleteRes}>Delete</button>
    </div>
  );
};

export default ManageRestaurantsTile;

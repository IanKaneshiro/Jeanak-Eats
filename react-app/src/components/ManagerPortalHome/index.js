import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { usersRestaurants } from "../../store/restaurant";
import "./ManagerPortalHome.css";

const ManagerPortalHome = () => {
  const restaurant = useSelector(usersRestaurants);
  const numRestaurants = restaurant.length;
  const avgRatingScore =
    restaurant.reduce((acc, res) => {
      return (acc += res.avgRating);
    }, 0) / restaurant.length;

  return (
    <div className="manager-home--container">
      <h1>Welcome to your manager portal!</h1>
      {numRestaurants > 0 ? (
        <>
          <h3>
            You currently operate {numRestaurants}{" "}
            {numRestaurants === 1 ? "restaurant" : "restaurants"}
          </h3>
          <h4>with an average rating of {avgRatingScore || 0}</h4>
        </>
      ) : (
        <>
          <h3>Looks like you have no restaurants yet</h3>
          <Link to="/manage/restaurants/new">
            <button className="manager-home--new">Lets get cooking!</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ManagerPortalHome;

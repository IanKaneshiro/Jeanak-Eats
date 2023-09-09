import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useHistory,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  getRestaurantById,
  currentRestaurant,
  clearCurrentSpot,
} from "../../store/restaurant";
import MenuItem from "../MenuItems";
// import OpenModalButton from "../OpenModalButton";
import "./RestaurantDetails.css";
import LoadingSpinner from "../LoadingSpinner";
import AllReviews from "../Reviews/AllReviews";
import { notImplemented } from "../../Resources/helperFunctions";

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector(currentRestaurant);
  const sessionUser = useSelector((state) => state.session.user);
  const { restaurantId } = useParams();
  const history = useHistory();

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
      <span className="back-to-main" onClick={() => history.push("/")}>
        ← Back to main
      </span>
      <div className="details--restaurant-main">
        <div className="details--header-manage">
          <h1>{restaurant.name}</h1>{" "}
          {restaurant.ownerId === sessionUser?.id ? (
            <Link to={`/manage/restaurants/${restaurant.id}`}>
              <button className="details--manage-btn">Manage</button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <p>
          <i className="fa-solid fa-star"></i>{" "}
          {restaurant.avgRating ? restaurant.avgRating.toFixed(1) : ""} (
          {restaurant.numRatings} ratings) · {restaurant.cuisine} ·{" "}
          {restaurant.priceRange} ·{" "}
          <span>
            <button onClick={notImplemented}>Read reviews</button>
          </span>{" "}
          ·{" "}
          <span>
            {/* <OpenModalButton buttonText={"More info"} /> */}
            <button onClick={notImplemented}>More info</button>
          </span>
        </p>
        <p className="details--est-delivery-time">Est. delivery time here</p>
      </div>
      <MenuItem />
      <AllReviews />
    </div>
  );
};

export default RestaurantDetails;

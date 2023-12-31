import React, { useEffect, useRef } from "react";
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
import "./RestaurantDetails.css";
import LoadingSpinner from "../LoadingSpinner";
import AllReviews from "../Reviews/AllReviews";
import { calculateShowHours } from "../../Resources/helperFunctions";
const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector(currentRestaurant);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.Reviews);
  const reviewSectionRef = useRef();
  const { restaurantId } = useParams();
  const history = useHistory();

  const scrollToSection = () => {
    reviewSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const calculateAvgRating = (reviews) => {
    const avg =
      reviews.reduce((acc, res) => acc + res.rating, 0) / reviews.length;
    return avg.toFixed(1);
  };

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
          {reviews?.length ? calculateAvgRating(reviews) : ""} (
          {reviews?.length} ratings) · {restaurant.cuisine} ·{" "}
          {restaurant.priceRange} ·{" "}
          <span>
            <button onClick={scrollToSection}>Read reviews</button>
          </span>{" "}
        </p>
        <p className="details--hours">
          {calculateShowHours(restaurant.opensAt, restaurant.closesAt)}
        </p>
      </div>
      <MenuItem />
      <div ref={reviewSectionRef}>
        <AllReviews />
      </div>
    </div>
  );
};

export default RestaurantDetails;

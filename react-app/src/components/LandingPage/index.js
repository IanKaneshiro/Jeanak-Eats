import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allRestaurants, getAllRestaurants } from "../../store/restaurant";
import RestaurantTile from "../Restaurants/RestaurantTile";
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(allRestaurants);
  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return (
    <main className="landing--main">
      <section className="landing--filters">This will be filter page</section>
      <section className="landing--restaurants">
        {restaurants.map((restaurant) => (
          <RestaurantTile restaurant={restaurant} key={restaurant.id} />
        ))}
      </section>
    </main>
  );
};

export default LandingPage;
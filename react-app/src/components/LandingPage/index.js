import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allRestaurants, getAllRestaurants } from "../../store/restaurant";

const LandingPage = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(allRestaurants);
  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return <div>LandingPage I AM BEAUTIFUL!</div>;
};

export default LandingPage;

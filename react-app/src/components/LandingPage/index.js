import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllRestaurants,
  getUsersRestaurants,
  getRestaurantById,
} from "../../store/restaurant";

const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(getUsersRestaurants());
    dispatch(getRestaurantById(1));
  }, [dispatch]);
  return <div>LandingPage I AM BEAUTIFUL!</div>;
};

export default LandingPage;

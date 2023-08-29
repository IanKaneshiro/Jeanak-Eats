import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRestaurants, getUsersRestaurants } from "../../store/restaurant";

const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(getUsersRestaurants());
  }, [dispatch]);
  return <div>LandingPage</div>;
};

export default LandingPage;

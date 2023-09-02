import React, { useEffect } from "react";
import {
  getUsersRestaurants,
  usersRestaurants,
} from "../../../store/restaurant";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import "./ManageRestaurants.css";

const ManageRestaurants = () => {
  const dispatch = useDispatch();
  const restuarants = useSelector(usersRestaurants);

  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(getUsersRestaurants());
  }, [dispatch]);

  return (
    <>
      <div>
        {restuarants.map((restuarant) => (
          <Link to={`${url}/${restuarant.id}`}>{restuarant.name}</Link>
        ))}
      </div>
    </>
  );
};

export default ManageRestaurants;

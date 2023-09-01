import React, { useEffect } from "react";
import {
  getUsersRestaurants,
  usersRestaurants,
} from "../../../store/restaurant";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";

const ManageRestaurants = () => {
  const dispatch = useDispatch();
  const restuarants = useSelector(usersRestaurants);
  let { url } = useRouteMatch();

  useEffect(() => {
    dispatch(getUsersRestaurants());
  }, [dispatch]);
  return (
    <div>
      {restuarants.map((restuarant) => (
        <div>
          {restuarant.name}
          <Link to={`${url}/${restuarant.id}`}>Update</Link>
        </div>
      ))}
    </div>
  );
};

export default ManageRestaurants;

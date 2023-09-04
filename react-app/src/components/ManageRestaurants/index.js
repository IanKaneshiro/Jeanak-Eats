import React, { useEffect } from "react";
import { getUsersRestaurants, usersRestaurants } from "../../store/restaurant";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "../auth/ProtectedRoute";
import ManageRestaurantsTile from "../ManageRestaurantsTile";
import "./ManageRestaurants.css";

const ManageRestaurants = () => {
  const dispatch = useDispatch();
  const restuarants = useSelector(usersRestaurants);

  useEffect(() => {
    dispatch(getUsersRestaurants());
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <div>
        {restuarants.map((restuarant) => (
          <ManageRestaurantsTile restaurant={restuarant} key={restuarant.id} />
        ))}
      </div>
    </ProtectedRoute>
  );
};

export default ManageRestaurants;

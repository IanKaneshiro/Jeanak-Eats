import React, { useEffect } from "react";
import { getUsersRestaurants, usersRestaurants } from "../../store/restaurant";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "../auth/ProtectedRoute";
import ManageRestaurantsTile from "../ManageRestaurantsTile";
import "./ManageRestaurants.css";
import ManageMenuItems from "../ManageMenuItems";

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
          <div key={restuarant.id}>
            <ManageRestaurantsTile restaurant={restuarant} />
            <ManageMenuItems restaurant={restuarant} />
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
};

export default ManageRestaurants;

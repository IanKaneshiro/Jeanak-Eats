import React, { useState, useEffect } from "react";
import { Switch, useRouteMatch, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsersRestaurants, usersRestaurants } from "../../store/restaurant";
import CreateRestaurantForm from "../CreateRestaurantForm";
import ManageRestaurantDetails from "../ManageRestaurantDetails";
import ManagerPortalHome from "../ManagerPortalHome";
import ProtectedRoute from "../auth/ProtectedRoute";
import ManageMenuItems from "../ManageMenuItems";

import "./ManagerPortal.css";

const ManagerPortal = () => {
  let { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const restuarants = useSelector(usersRestaurants);
  const [openRestaurants, setOpenRestaurants] = useState(false);

  useEffect(() => {
    dispatch(getUsersRestaurants());
  }, [dispatch]);

  const handleOpenRestaurants = () => {
    setOpenRestaurants(!openRestaurants);
  };

  return (
    <div className="manager--main">
      <nav className="manager--navbar">
        <h1>Manager Portal</h1>
        <ul className="manager--navbar-links">
          <li>
            <NavLink to="/manage">
              <i className="fa-solid fa-house fa-sm"></i> Home
            </NavLink>
          </li>

          {restuarants[0] && (
            <li>
              <button onClick={handleOpenRestaurants}>
                <i className="fa-solid fa-utensils fa-sm"></i> Restaurants{" "}
                <i
                  className={
                    openRestaurants
                      ? "fa-solid fa-caret-down fa-sm caret-open"
                      : "fa-solid fa-caret-down fa-sm caret-closed"
                  }
                ></i>
              </button>
              <ul
                className={
                  openRestaurants
                    ? "manager--navbar-restaurants manager--open"
                    : "manager--navbar-restaurants"
                }
              >
                {restuarants.map((restuarant) => (
                  <li key={restuarant.id}>
                    <NavLink to={`${url}/restaurants/${restuarant.id}`}>
                      {restuarant.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li>
            <NavLink to={`${url}/restaurants/new`}>
              <i className="fa-solid fa-hammer fa-sm"></i> Add a restaurant
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="manager--routes">
        <Switch>
          <ProtectedRoute exact path="/manage">
            <ManagerPortalHome />
          </ProtectedRoute>
          <ProtectedRoute path={`${path}/restaurants/new`}>
            <CreateRestaurantForm />
          </ProtectedRoute>
          <ProtectedRoute path={`${path}/restaurants/:id`}>
            <ManageRestaurantDetails />
          </ProtectedRoute>
          <ProtectedRoute path={`${path}/restaurants/:id/menuItems`}>
            <ManageMenuItems />
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  );
};

export default ManagerPortal;

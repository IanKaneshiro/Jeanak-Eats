import React from "react";
import { Switch, useRouteMatch, NavLink } from "react-router-dom";
import ManageRestaurants from "../ManageRestaurants";
import CreateRestaurantForm from "../CreateRestaurantForm";
import ManageRestaurantUpdatePage from "../ManageRestaurantUpdatePage";
import ProtectedRoute from "../auth/ProtectedRoute";

import "./ManagerPortal.css";

const ManagerPortal = () => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <div className="manager--main">
        <h1>Manager Portal</h1>
        <ul className="manager--navbar">
          <li>
            <NavLink to={`${url}/restaurants`}>Manage restaurants</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/restaurants/new`}>Add a restaurant</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Switch>
          <ProtectedRoute exact path={`${path}/restaurants`}>
            <ManageRestaurants />
          </ProtectedRoute>
          <ProtectedRoute path={`${path}/restaurants/new`}>
            <CreateRestaurantForm />
          </ProtectedRoute>
          <ProtectedRoute path={`${path}/restaurants/:id`}>
            <ManageRestaurantUpdatePage />
          </ProtectedRoute>
        </Switch>
      </div>
    </>
  );
};

export default ManagerPortal;

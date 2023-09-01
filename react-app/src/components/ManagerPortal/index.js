import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import ManageRestaurants from "./ManageRestaurants";
import UpdateRestaurantForm from "../Restaurants/UpdateRestaurantForm";

import "./ManagerPortal.css";

const ManagerPortal = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h1>Manager Portal</h1>
      <ul>
        <li>
          <Link to={`${url}/restuarants`}>Manage restaurants</Link>
        </li>
        <li>
          <Link to={`${url}/reviews`}>Manage reviews</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={`${path}/restuarants`}>
          <ManageRestaurants />
        </Route>
        <Route path={`${path}/restuarants/:id`}>
          <UpdateRestaurantForm />
        </Route>
        <Route path={`${path}/reviews`}>Manage Reviews</Route>
      </Switch>
    </div>
  );
};

export default ManagerPortal;

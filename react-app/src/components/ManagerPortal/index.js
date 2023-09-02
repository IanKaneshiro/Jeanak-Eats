import React from "react";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import ManageRestaurants from "./ManageRestaurants";
import CreateRestaurantForm from "../Restaurants/CreateRestaurantForm";
import ManageRestaurantUpdatePage from "./ManageRestaurantUpdatePage";

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
            <NavLink to={`${url}/restaurants/create`}>Add a restaurant</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Switch>
          <Route exact path={`${path}/restaurants`}>
            <ManageRestaurants />
          </Route>
          <Route path={`${path}/restaurants/create`}>
            <CreateRestaurantForm />
          </Route>
          <Route path={`${path}/restaurants/:id`}>
            <ManageRestaurantUpdatePage />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default ManagerPortal;

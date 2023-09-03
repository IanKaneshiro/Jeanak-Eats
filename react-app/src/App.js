import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";

import Reviews from './components/Reviews'
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CreateRestaurantForm from "./components/Restaurants/CreateRestaurantForm";
import MenuItems from "./components/MenuItems";
import MenuItemDetail from "./components/MenuItems/MenuItemDetail";
import MenuItemForm from "./components/MenuItems/MenuItemForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/restaurants/:restaurantId/reviews">

            <Reviews/>
          </Route>
          <Route path="/restaurants/create">
            <CreateRestaurantForm />
          </Route>
          <Route path="/restaurants/:restaurantId/menuItems">
            <MenuItems />
          </Route>
          <Route path="/menuItems/:id">
            <MenuItemDetail />
          </Route>
          <Route path="/restaurants/:restaurantId/menuItems/new">
            <MenuItemForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

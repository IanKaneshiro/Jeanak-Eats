import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MenuItemDetail from "./components/MenuItems/MenuItemDetail";
import NewMenuItemForm from "./components/MenuItems/NewMenuItemForm";
import UpdateMenuItemForm from "./components/MenuItems/UpdateMenuItemForm";
import ManagerPortal from "./components/ManagerPortal";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AllReviews from "./components/Reviews/AllReviews";
import UpdateModal from "./components/Reviews/UpdateModal";
import DeleteModal from "./components/DeleteModal";
import AddModal from "./components/Reviews/AddModal";
import RestaurantDetails from "./components/RestaurantDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation loading={isLoaded} />
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
            <AllReviews />
          </Route>
          <ProtectedRoute path="/manage">
            <ManagerPortal />
          </ProtectedRoute>
          <Route path="/restaurants/:restaurantId/menuItems">
            <NewMenuItemForm />
          </Route>
          <Route path="/restaurants/:restaurantId">
            <RestaurantDetails />
          </Route>
          <Route path="/menuItems/:menuItemId/update">
            <UpdateMenuItemForm />
          </Route>
          <Route path="/menuItems/:menuItemId">
            <MenuItemDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

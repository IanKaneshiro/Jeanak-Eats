import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MenuItemDetail from "./components/MenuItemDetail";
import ManagerPortal from "./components/ManagerPortal";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RestaurantDetails from "./components/RestaurantDetails";
import Footer from "./components/Footer";
import CartPurchase from "./components/CartPurchase";

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
        <>
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
            <Route path="/purchase">
              <CartPurchase/>
            </Route>
            <ProtectedRoute path="/manage">
              <ManagerPortal />
            </ProtectedRoute>
            <Route path="/restaurants/:restaurantId">
              <RestaurantDetails />
            </Route>
            <ProtectedRoute path="/manage">
              <ManagerPortal />
            </ProtectedRoute>
            <Route path="/restaurants/:restaurantId">
              <RestaurantDetails />
            </Route>
            <Route path="/menuItems/:menuItemId">
              <MenuItemDetail />
            </Route>
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;

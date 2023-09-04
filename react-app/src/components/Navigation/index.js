import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import NavigationSideBar from "../NavigationSideBar";
import NavigationCartBar from "../NavigationCartBar";
import OpenModalButton from "../OpenModalButton";
import AddressModal from "../AddressModal";
import "./Navigation.css";

function Navigation({ loading }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [sidebar, setSidebar] = useState(false);
  const [cartSidebar, setCartSidebar] = useState(false);
  const [deliveryPickup, setDeliverPickup] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const showCartSidebar = () => setCartSidebar(!cartSidebar);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    showSidebar();
  };

  const handleDeliverPickup = () => {
    setDeliverPickup(!deliveryPickup);
  };

  if (!loading) return null;

  return (
    <>
      <div className="navbar--main">
        <div>
          <Link to="#" onClick={showSidebar} className="navbar--menuicon">
            <i className="fa-solid fa-bars"></i>
          </Link>
        </div>
        <div className="navbar--home">
          <NavLink exact to="/">
            <i className="fa-solid fa-house">Jeanak Eats</i>
          </NavLink>
        </div>
        <div className="navbar--deliver-pickup" onClick={handleDeliverPickup}>
          <p
            className={
              deliveryPickup
                ? "navbar--delivery del-pick-highlight"
                : "navbar--delivery"
            }
          >
            Delivery
          </p>
          <div
            className={
              deliveryPickup
                ? "navbar--pickup"
                : "navbar--pickup del-pick-highlight"
            }
          >
            <p>Pickup</p>
          </div>
        </div>
        <div className="navbar--location">
          <i className="fa-solid fa-location-dot"></i>
          <OpenModalButton
            modalComponent={<AddressModal />}
            buttonText={
              sessionUser?.address ? sessionUser.address : "Enter Location"
            }
          />
        </div>
        <div className="navbar--searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Foods, groceries, drinks, etc" />
        </div>
        <button onClick={showCartSidebar} className="navbar--shopping-btn">
          <i className="fa-solid fa-cart-shopping"></i> 0 carts
        </button>
      </div>
      <NavigationSideBar
        sidebar={sidebar}
        showSidebar={showSidebar}
        sessionUser={sessionUser}
        handleLogout={handleLogout}
      />
      <NavigationCartBar
        cartSidebar={cartSidebar}
        setCartSidebar={setCartSidebar}
      />
    </>
  );
}

export default Navigation;

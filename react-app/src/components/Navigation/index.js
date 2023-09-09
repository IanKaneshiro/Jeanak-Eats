import React, { useState } from "react";
import { NavLink, Link, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import NavigationSideBar from "../NavigationSideBar";
import NavigationCartBar from "../NavigationCartBar";
import OpenModalButton from "../OpenModalButton";
import AddressModal from "../AddressModal";
import SearchBar from "../SearchBar";
import { cuisineUrls } from "../../Resources/imageUrlArrays";
import "./Navigation.css";
import { notImplemented } from "../../Resources/helperFunctions";

function Navigation({ loading }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [sidebar, setSidebar] = useState(false);
  const [cartSidebar, setCartSidebar] = useState(false);
  const [deliveryPickup, setDeliverPickup] = useState(true);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");

  const showSidebar = () => setSidebar(!sidebar);
  const showCartSidebar = () => setCartSidebar(!cartSidebar);
  const manageCheck = useRouteMatch({ path: "/", strict: true, exact: true });

  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    showSidebar();
    history.push("/");
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
            <i className="fa-solid fa-bowl-rice" id="logo">
              Jeanak Eats
            </i>
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
        <div onClick={() => setSearch(true)} className="navbar--searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for restaurant..."
          />
        </div>
        <button onClick={showCartSidebar} className="navbar--shopping-btn">
          <i className="fa-solid fa-cart-shopping"></i> 0 carts
        </button>
      </div>
      {search && (
        <SearchBar setSearch={setSearch} query={query} setQuery={setQuery} />
      )}
      {manageCheck && (
        <div className="navbar--cuisine-container">
          <ul className="navbar--cuisine-main">
            {cuisineUrls.map((img) => {
              return (
                <button key={img} onClick={notImplemented}>
                  <img src={img.url} alt={img.url} />
                  <p>{img.name}</p>
                </button>
              );
            })}
          </ul>
        </div>
      )}
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

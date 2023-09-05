import React from "react";
import { Link } from "react-router-dom";
import "./NavigationSideBar.css";
import { notImplemented } from "../../Resources/helperFunctions";

const NavigationSideBar = ({
  sidebar,
  showSidebar,
  sessionUser,
  handleLogout,
}) => {
  return (
    <>
      <nav className={sidebar ? "sidebar--menu open" : "sidebar--menu"}>
        <ul className="sidebar--menu-items-container">
          {sessionUser ? (
            <>
              <li>
                <div className="sidebar--profile">
                  <div>
                    <i class="fa-solid fa-circle-user fa-2xl"></i>
                  </div>
                  <div>
                    <p>{sessionUser.firstName}</p>
                    <Link onClick={showSidebar} to="/manage">
                      Manager Portal
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="sidebar--menu-items"
                  onClick={notImplemented}
                >
                  <i class="fa-solid fa-bag-shopping fa-lg"></i>
                  <p>Orders</p>
                </button>
              </li>
              <li>
                <button
                  className="sidebar--menu-items"
                  onClick={notImplemented}
                >
                  <i class="fa-solid fa-heart fa-lg"></i>
                  <p>Favorites</p>
                </button>
              </li>
              <li>
                <button
                  className="sidebar--menu-items"
                  onClick={notImplemented}
                >
                  <i class="fa-solid fa-wallet fa-lg"></i>
                  <p>Wallet</p>
                </button>
              </li>
              <li>
                <button
                  className="sidebar--menu-items"
                  onClick={notImplemented}
                >
                  <i class="fa-solid fa-briefcase fa-lg"></i>
                  <p>Meal Plan</p>
                </button>
              </li>
              <li>
                <button
                  className="sidebar--menu-items"
                  onClick={notImplemented}
                >
                  <i class="fa-solid fa-circle-info fa-lg"></i>
                  <p>Help</p>
                </button>
              </li>
              <li>
                <button
                  className="sidebar--menu-items"
                  onClick={notImplemented}
                >
                  <i class="fa-solid fa-globe fa-lg"></i>
                  <p>Uber One</p>
                </button>
              </li>
              <li>
                <button
                  className="sidebar--menu-items"
                  onClick={notImplemented}
                >
                  <i class="fa-solid fa-gift fa-lg"></i>
                  <p>Invite Friends</p>
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="sidebar--signout-btn">
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <ul className="sidebar--sign-out-main">
              <li>
                <Link to="/login">
                  <button onClick={showSidebar}>Login</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button onClick={showSidebar}>Signup</button>
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
      <div
        onClick={showSidebar}
        className={sidebar ? "sidebar--background" : ""}
      ></div>
    </>
  );
};

export default NavigationSideBar;

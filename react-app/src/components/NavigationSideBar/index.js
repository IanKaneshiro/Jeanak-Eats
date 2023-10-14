import React from "react";
import { Link } from "react-router-dom";
import "./NavigationSideBar.css";

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
                    <i className="fa-solid fa-circle-user fa-2xl"></i>
                  </div>
                  <div>
                    <p>{sessionUser.firstName}</p>
                    <Link
                      className="sidebar--manager-portal-btn"
                      onClick={showSidebar}
                      to="/manage"
                    >
                      Manager Portal
                    </Link>
                  </div>
                </div>
              </li>
              <li className="sidebar--signout-container">
                <button onClick={handleLogout} className="sidebar--signout-btn">
                  Sign Out{" "}
                  <i
                    className="fa-solid fa-arrow-right-from-bracket fa-sm"
                    style={{ color: "#8d8d8d" }}
                  ></i>
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

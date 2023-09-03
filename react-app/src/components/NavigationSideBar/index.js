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
        <ul className="sidebar--menu-items">
          {sessionUser ? (
            <>
              <li>{sessionUser.firstName}</li>
              <li className="sidebar--toggle" onClick={showSidebar}>
                <Link to="/manage" className="sidebar--menu-bars">
                  Manager Portal
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sign out</button>
              </li>
            </>
          ) : (
            <>
              <li className="sidebar--toggle" onClick={showSidebar}>
                <button>
                  <Link to="/login">Login</Link>
                </button>
              </li>
              <li className="sidebar--toggle" onClick={showSidebar}>
                <button>
                  <Link to="/signup">Signup</Link>
                </button>
              </li>
            </>
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

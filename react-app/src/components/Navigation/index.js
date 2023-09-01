import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar--main">
        <Link to="#" onClick={showSidebar}>
          #
        </Link>
        <ul>
          <li>
            <NavLink exact to="/">
              UBER EATS LOGO
            </NavLink>
          </li>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </div>
      <nav className={sidebar ? "navbar--menu active" : "navbar--menu"}>
        <Link to="#" onClick={showSidebar}>
          X
        </Link>
        <ul className="navbar--menu-items">
          <li className="navbar--toggle" onClick={showSidebar}>
            <Link to="/restaurants/create" className="navbar--menu-bars">
              Create a Restauarnt
            </Link>
          </li>
          <li className="navbar--toggle" onClick={showSidebar}>
            <Link to="/manage" className="navbar--menu-bars">
              Manager Portal
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;

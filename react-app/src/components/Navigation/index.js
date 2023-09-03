import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    showSidebar();
  };

  return (
    <>
      <div className="navbar--main">
        <div>
          <Link to="#" onClick={showSidebar}>
            <i class="fa-solid fa-bars"></i>
          </Link>
        </div>
        <ul className="navbar--main-nav">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          {!sessionUser && (
            <li>
              <button>
                <Link to="/login">Login</Link>
              </button>
              <button>
                <Link to="/signup">Signup</Link>
              </button>
            </li>
          )}
        </ul>
      </div>
      <nav className={sidebar ? "navbar--menu open" : "navbar--menu"}>
        <Link to="#" onClick={showSidebar}>
          ❌
        </Link>
        <ul className="navbar--menu-items">
          {sessionUser ? (
            <>
              <li>{sessionUser.firstName}</li>
              <li className="navbar--toggle" onClick={showSidebar}>
                <Link to="/manage" className="navbar--menu-bars">
                  Manager Portal
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sign out</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar--toggle" onClick={showSidebar}>
                <button>
                  <Link to="/login">Login</Link>
                </button>
              </li>
              <li className="navbar--toggle" onClick={showSidebar}>
                <button>
                  <Link to="/signup">Signup</Link>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navigation;

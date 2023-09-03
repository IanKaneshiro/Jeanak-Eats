import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./Navigation.css";
import NavigationSideBar from "../NavigationSideBar";

function Navigation({ loading }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    showSidebar();
  };

  if (!loading) return null;

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
      <NavigationSideBar
        sidebar={sidebar}
        showSidebar={showSidebar}
        sessionUser={sessionUser}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default Navigation;

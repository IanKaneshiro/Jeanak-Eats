import "./MenuItems.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuItems,
  allMenuItems,
  clearAllMenuItems,
} from "../../store/menuItems";
import { useParams, useHistory } from "react-router-dom";
import MenuItemDetailSidebar from "../MenuItemDetailSidebar";
import { currentRestaurant, getRestaurantById } from "../../store/restaurant";
import LoadingSpinner from "../LoadingSpinner";

const MenuItems = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const menu = useSelector(allMenuItems);
  const restaurant = useSelector(currentRestaurant);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllMenuItems(restaurantId));
    dispatch(getRestaurantById(restaurantId));

    return () => dispatch(clearAllMenuItems());
  }, [dispatch, restaurantId]);

  if (!menu) {
    return <LoadingSpinner />;
  }

  if (menu.length) {
    return (
      <div className="all-menu-items--container">
        <div className="menu--sidebar">
          <MenuItemDetailSidebar restaurant={restaurant} />
        </div>
        <div className="menu--tiles">
          <ul className="menu-ul">
            {menu.map((item) => (
              <li
                className="menu-li"
                key={item.id}
                onClick={() => history.push(`/menuItems/${item.id}`)}
              >
                {item.imageUrl ? (
                  <img
                    className="menu-tile-img"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                ) : (
                  <i
                    className="fa-solid fa-bowl-rice fa-2xl"
                    id="menu-tile--no-image"
                  ></i>
                )}
                <span>
                  <h3 className="menu-tile-name">{item.name}</h3>
                </span>
                <span className="menu-tile-price">
                  ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="all-menu-items--container-empty">
        <span>It looks like this restaurant hasn't added a menu yet...</span>
        <span>Check back later for a menu!</span>
      </div>
    );
  }
};

export default MenuItems;

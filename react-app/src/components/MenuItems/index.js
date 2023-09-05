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

  return (
    <div className="all-menu-items-container">
      {/*A challenge I forsee happening is dealing with the filtering menu on the left 
      side of screen. On ubereats it underlines the current category you are viewing and clicking
      on the category scrolls the page down to view that set of items
      */}
      {/* <div className="menu-item-detail-sidebar">
        <MenuItemDetailSidebar restaurant={restaurant} />
      </div> */}
      <ul className="menu-ul">
        {menu.map((item) => (
          <li
            className="menu-li"
            key={item.id}
            onClick={() => history.push(`/menuItems/${item.id}`)}
          >
            <img
              className="menu-tile-img"
              src={item.imageUrl}
              alt={item.name}
            />
            <span>
              <h3 className="menu-tile-name">{item.name}</h3>
            </span>
            <span className="menu-tile-price">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;

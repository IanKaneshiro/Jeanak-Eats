import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItems, allMenuItems } from "../../store/menuItems";
import { useParams } from "react-router-dom";

const MenuItems = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const menu = useSelector(allMenuItems);

  useEffect(() => {
    dispatch(getAllMenuItems(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <div>
      <h1>Menu Items Component</h1>
      <ul className="menu-ul">
        {menu.map((item) => (
          <li className="menu-li" key={item.id}>
            <img
              className="menu-tile-img"
              src={item.imageUrl}
              alt={item.name}
            />
            <span className="menu-tile-name">{item.name}</span>
            <span className="menu-tile-price">${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;

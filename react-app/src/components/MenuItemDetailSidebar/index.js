import "./MenuItemDetailSidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { allMenuItems, getAllMenuItems } from "../../store/menuItems";
import { useEffect } from "react";

const MenuItemDetailSidebar = ({ restaurant }) => {
  const menuItemCategories = useSelector(allMenuItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMenuItems(restaurant.id));
  }, [dispatch, restaurant.id]);
  return (
    <div>
      <h1>Menu Item Detail Sidebar Component</h1>
      <ul>
        {menuItemCategories.map((item) => (
          <li key={item.id}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemDetailSidebar;

import "./MenuItemDetailSidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { allMenuItems, getAllMenuItems } from "../../store/menuItems";
import { useEffect } from "react";

const MenuItemDetailSidebar = ({ restaurantId }) => {
  const menuItemCategories = useSelector(allMenuItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMenuItems(restaurantId));
  }, [dispatch, restaurantId]);
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

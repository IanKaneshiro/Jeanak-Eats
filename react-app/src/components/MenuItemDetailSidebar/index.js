import "./MenuItemDetailSidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { allMenuItems, getAllMenuItems } from "../../store/menuItems";
import { useEffect } from "react";

const MenuItemDetailSidebar = ({ restaurant }) => {
  const categories = useSelector(allMenuItems).map((item) => item.category);
  const dispatch = useDispatch();

  // Creates an array of unique categories
  const catList = [];
  categories.forEach((item) => {
    if (!catList.includes(item)) {
      catList.push(item);
    }
    return catList;
  });

  useEffect(() => {
    dispatch(getAllMenuItems(restaurant.id));
  }, [dispatch, restaurant.id]);
  return (
    <div className="restaurant-detail--sidebar">
      <ul className="restaurant-detail--ul">
        {catList.map((item, idx) => (
          <li className="restaurant-detail--li" key={idx}>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemDetailSidebar;

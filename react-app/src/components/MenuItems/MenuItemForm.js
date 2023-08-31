import "./MenuItems.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewItem } from "../../store/menuItems";
import { useParams } from "react-router-dom";

const MenuItemForm = () => {
  return (
    <div>
      <h1>Menu Item Form Component</h1>
    </div>
  );
};

export default MenuItemForm;

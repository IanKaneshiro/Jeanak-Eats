import "./MenuItems.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewItem } from "../../store/menuItems";
import { useParams } from "react-router-dom";

const MenuItemForm = () => {

  const handleSubmit((e) => {
    e.preventDefault()
  })  
  return (
    <div className="itemFormContainer">
      <h1>Menu Item Form Component</h1>
      <form className="menu-item-form" onSubmit={handleSubmit}></form>
    </div>
  );
};

export default MenuItemForm;

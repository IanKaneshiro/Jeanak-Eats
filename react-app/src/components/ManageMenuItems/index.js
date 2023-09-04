import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMenuItems, getAllMenuItems } from "../../store/menuItems";
import DeleteMenuItemModal from "../MenuItems/DeleteMenuItem";

const ManageMenuItems = ({ restaurant }) => {
  const dispatch = useDispatch();
  const menuItems = useSelector(allMenuItems);

  useEffect(() => {
    dispatch(getAllMenuItems());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span>{item.price}</span>
            <span>{item.category}</span>
            <span>{item.dietary}</span>
            <span>{item.imageUrl}</span>
            <button>Edit</button>
            <DeleteMenuItemModal item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMenuItems;

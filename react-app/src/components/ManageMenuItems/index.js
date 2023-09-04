import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMenuItems, getAllMenuItems } from "../../store/menuItems";
import DeleteMenuItemModal from "../MenuItems/DeleteMenuItem";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-redux-dom";

//I need to figure out where to put this component. It wasn't showing
//up where I was expecting it to.

const ManageMenuItems = ({ restaurant }) => {
  const dispatch = useDispatch();
  const menuItems = useSelector(allMenuItems);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllMenuItems(restaurant.id));
  }, [dispatch]);

  return (
    <div className="manage-menu-item-container">
      <ul className="manage-menu-item-ul">
        {menuItems.map((item) => (
          <li key={item.id} className="manage-menu-item-li">
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span>{item.price}</span>
            <span>{item.category}</span>
            <span>{item.dietary}</span>
            <span>{item.imageUrl}</span>
            <button
              onClick={() => history.push(`/menuItems/${item.id}/update`)}
            >
              Edit
            </button>
            <OpenModalButton
              className="delete-button"
              buttonText="Delete"
              modalComponent={<DeleteMenuItemModal item={item} />}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMenuItems;

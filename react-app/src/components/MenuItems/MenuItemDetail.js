import "./MenuItems.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentMenuItem, getOneMenuItem } from "../../store/menuItems";
import { useParams } from "react-router-dom";

const MenuItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector(currentMenuItem);

  useEffect(() => {
    dispatch(getOneMenuItem(id));
  }, [dispatch, id]);
  if (!item) {
    return "Loading...";
  }

  return (
    <div className="menuItemDetail">
      <span>← Back to PLACEHOLDER RESTAURANT NAME</span>
      <div className="menuItemTile">
        <img className="itemDetailImg" src={item.imageUrl} alt={item.id} />
        <h1 className="itemDetailName">{item.name}</h1>
        <h2 className="itemDetailPrice">${item.price}</h2>
        <span className="itemDetailDescription">{item.description}</span>
        <button>Add to order · ${item.price}</button>
      </div>
    </div>
  );
};

export default MenuItemDetail;

import "./MenuItems.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneItem } from "../../store/singleMenuItem";
import { useParams } from "react-router-dom";

const MenuItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state) => state.singleItem[id]);
  console.log("ONE ITEM", item);

  useEffect(() => {
    dispatch(getOneItem(id));
  }, [dispatch, id]);
  if (!item) {
    return "Loading...";
  }

  return (
    <div className="menuItemDetail">
      <img className="itemDetailImg" src={item.imageUrl} alt={item.id} />
      <h1 className="itemDetailName">{item.name}</h1>
      <h2 className="itemDetailPrice">${item.price}</h2>
      <span className="itemDetailDescription">{item.description}</span>
      <button>Add NUM to order · ${item.price}</button>
    </div>
  );
};

export default MenuItemDetail;

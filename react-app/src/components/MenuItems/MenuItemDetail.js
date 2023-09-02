import "./MenuItems.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMenuItem,
  getOneMenuItem,
  clearCurrentMenuItem,
} from "../../store/menuItems";
import { useParams, useHistory } from "react-router-dom";

const MenuItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector(currentMenuItem);
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneMenuItem(id));
  }, [dispatch, id]);
  if (!item) {
    return "Loading...";
  }

  const goBackToRestaurant = () => {
    dispatch(clearCurrentMenuItem());
    history.push(`/restaurants/${item.restaurantId}`);
  };

  //Prevents errors for undefined price before dispatch
  const floatPrice = item.price !== undefined ? item.price.toFixed(2) : "";

  return (
    <div className="menuItemDetail">
      <span className="back-to-restaurant" onClick={goBackToRestaurant}>
        ← Back to PLACEHOLDER RESTAURANT NAME
      </span>
      <div className="menuItemTile">
        <img className="itemDetailImg" src={item.imageUrl} alt={item.id} />
        <h1 className="itemDetailName">{item.name}</h1>
        <h3 className="itemDetailPrice">${floatPrice}</h3>
        <span className="itemDetailDescription">{item.description}</span>
        <button className="add-to-order-button">
          Add to order · ${floatPrice}
        </button>
      </div>
    </div>
  );
};

export default MenuItemDetail;

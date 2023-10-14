import "./MenuItemDetail.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMenuItem,
  getOneMenuItem,
  clearCurrentMenuItem,
  clearAllMenuItems,
} from "../../store/menuItems";
import { useParams, useHistory } from "react-router-dom";
import { getAllRestaurants } from "../../store/restaurant";
import LoadingSpinner from "../LoadingSpinner";
import { notImplemented } from "../../Resources/helperFunctions";

import AddTo from "../../components/ShoppingCart/AddTo"

const MenuItemDetail = () => {
  const dispatch = useDispatch();
  const { menuItemId } = useParams();
  const item = useSelector(currentMenuItem);
  const restaurants = useSelector((state) => state.restaurants.allRestaurants);
  const restaurant = restaurants[item.restaurantId];
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getOneMenuItem(menuItemId));
    dispatch(getAllRestaurants());

    return () => {
      dispatch(clearCurrentMenuItem());
      dispatch(clearAllMenuItems());
    };
  }, [dispatch, menuItemId]);

  if (!item || !restaurant) {
    return <LoadingSpinner />;
  }

  const goBackToRestaurant = () => {
    // dispatch(clearCurrentMenuItem());
    history.push(`/restaurants/${item.restaurantId}`);
  };

  //Prevents errors for undefined price before dispatch
  const floatPrice = item.price !== undefined ? item.price.toFixed(2) : "";

  //Prices the add to order button based on quantity
  const floatPriceTotal =
    item.price !== undefined
      ? (item.price * parseInt(quantity)).toFixed(2)
      : "";


  const payload = {
    id:menuItemId,
    name: item.name,
    amount: quantity,
    price: floatPriceTotal,
  }



  return (
    <div className="menu-item-detail--container">
      <span className="back-to-restaurant" onClick={goBackToRestaurant}>
        ← Back to {restaurant.name}
      </span>

      <div className="menuItemTile">
        <div className="item-detail-img--container">
          {item.imageUrl ? (
            <img className="itemDetailImg" src={item.imageUrl} alt={item.id} />
          ) : (
            <i
              className="fa-solid fa-bowl-rice fa-2xl"
              id="item-detail--no-image"
            ></i>
          )}
        </div>
        <h1 className="itemDetailName">{item.name}</h1>
        <h3 className="itemDetailPrice">${floatPrice}</h3>
        <span className="itemDetailDescription">{item.description}</span>
        <span>
          {" "}
          <select
            className="item-quantity-select"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option className="quantity-option">1</option>
            <option className="quantity-option">2</option>
            <option className="quantity-option">3</option>
            <option className="quantity-option">4</option>
            <option className="quantity-option">5</option>
            <option className="quantity-option">6</option>
            <option className="quantity-option">7</option>
            <option className="quantity-option">8</option>
            <option className="quantity-option">9</option>
            <option className="quantity-option">10</option>
          </select>
        </span>

        <button className="add-to-order-button" onClick={notImplemented}>
          Add {quantity} to order · ${floatPriceTotal}
        </button>
      </div>

      <AddTo payload = {payload}/>

    </div>
  );
};

export default MenuItemDetail;

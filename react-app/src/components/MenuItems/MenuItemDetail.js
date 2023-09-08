import "./MenuItems.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMenuItem,
  getOneMenuItem,
  clearCurrentMenuItem,
} from "../../store/menuItems";
import { useParams, useHistory } from "react-router-dom";
import { allRestaurants, getAllRestaurants } from "../../store/restaurant";
import LoadingSpinner from "../LoadingSpinner";
import MenuItemDetailSidebar from "../MenuItemDetailSidebar";

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
  }, [dispatch, menuItemId]);

  if (!item || !restaurant) {
    return <LoadingSpinner />;
  }

  const goBackToRestaurant = () => {
    dispatch(clearCurrentMenuItem());
    history.push(`/restaurants/${item.restaurantId}`);
  };

  //Prevents errors for undefined price before dispatch
  const floatPrice = item.price !== undefined ? item.price.toFixed(2) : "";

  //Prices the add to order button based on quantity
  const floatPriceTotal =
    item.price !== undefined
      ? (item.price * parseInt(quantity)).toFixed(2)
      : "";

  return (
    <div className="menuItemDetail">
      <span className="back-to-restaurant" onClick={goBackToRestaurant}>
        ← Back to {restaurant.name}
      </span>

      <div className="menuItemTile">
        <img className="itemDetailImg" src={item.imageUrl} alt={item.id} />
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

        <button className="add-to-order-button">
          Add {quantity} to order · ${floatPriceTotal}
        </button>
      </div>
    </div>
  );
};

export default MenuItemDetail;

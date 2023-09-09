import "./ManageMenuItems.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMenuItems, getAllMenuItems } from "../../store/menuItems";
import DeleteMenuItemModal from "../MenuItems/DeleteMenuItem";
import OpenModalButton from "../OpenModalButton";
import ProtectedRoute from "../auth/ProtectedRoute";
import UpdateMenuItemModal from "../UpdateMenuItemModal";
import CreateMenuItemModal from "../CreateMenuItemModal";

const ManageMenuItems = ({ restaurant }) => {
  const dispatch = useDispatch();
  const menuItems = useSelector(allMenuItems);

  useEffect(() => {
    dispatch(getAllMenuItems(restaurant.id));
  }, [dispatch, restaurant.id]);

  //Helper function to return price in $X.XX format
  const floatPrice = (price) => {
    return price.toFixed(2);
  };

  if (!menuItems.length) {
    return (
      <div className="manage-menu--no-menu">
        <span>It looks like you don't have any menu items!</span>
        <OpenModalButton
          className="mit-bttn add-menu-item-bttn"
          buttonText="Get cooking, chef!"
          modalComponent={<CreateMenuItemModal restaurantId={restaurant.id} />}
        />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="manage-menu-item-container">
        <OpenModalButton
          className="mit-bttn add-menu-item-bttn"
          buttonText="Add Menu Item"
          modalComponent={<CreateMenuItemModal restaurantId={restaurant.id} />}
        />

        <table className="manage-menu-item-table">
          <thead>
            <tr>
              <th className="menu-item-table-header">Name</th>
              <th className="menu-item-table-header">Description</th>
              <th className="menu-item-table-header">Price</th>
              <th className="menu-item-table-header">Category</th>
              <th className="menu-item-table-header">Dietary</th>
              <th className="menu-item-table-header">Image</th>
              <th className="menu-item-table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id} className="manage-menu-item-row">
                <td className="menu-item-table-data">{item.name}</td>
                <td className="menu-item-table-data mit-desc">
                  {item.description}
                </td>
                <td className="menu-item-table-data">
                  ${floatPrice(item.price)}
                </td>
                <td className="menu-item-table-data">{item.category}</td>
                <td className="menu-item-table-data">{item.dietary}</td>
                <td className="menu-item-table-data">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="menu-item-image"
                    />
                  ) : (
                    <i
                      className="fa-solid fa-bowl-rice fa-2xl"
                      id="manage-menu--no-image"
                    ></i>
                  )}
                </td>
                <td className={"menu-item-table-data mit-buttons"}>
                  <OpenModalButton
                    className="mit-bttn"
                    buttonText="Edit"
                    modalComponent={<UpdateMenuItemModal item={item} />}
                  />
                  <OpenModalButton
                    className="mit-bttn"
                    buttonText="Delete"
                    modalComponent={<DeleteMenuItemModal item={item} />}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
};

export default ManageMenuItems;

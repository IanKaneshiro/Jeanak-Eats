import "./ManageMenuItems.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMenuItems, getAllMenuItems } from "../../store/menuItems";
import DeleteMenuItemModal from "../MenuItems/DeleteMenuItem";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

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
    <ProtectedRoute>
      <div className="manage-menu-item-container">
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
                <td className="menu-item-table-data">{item.description}</td>
                <td className="menu-item-table-data">${item.price}</td>
                <td className="menu-item-table-data">{item.category}</td>
                <td className="menu-item-table-data">{item.dietary}</td>
                <td className="menu-item-table-data">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="menu-item-image"
                  />
                </td>
                <td className="menu-item-table-data">
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

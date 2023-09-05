import { useModal } from "../../context/Modal";
import { deleteMenuItem, getAllMenuItems } from "../../store/menuItems";
import { useDispatch } from "react-redux";

const DeleteMenuItemModal = ({ item }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();

    dispatch(deleteMenuItem(item.id)).then(
      dispatch(getAllMenuItems(item.restaurantId))
    );
    closeModal();
  };

  const rejectDelete = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <div className="delete-menu-item-container">
      <h1>Delete Menu Item Modal Component</h1>
      <span>Delete this menu item?</span>
      <button onClick={confirmDelete}>Delete</button>
      <button onClick={rejectDelete}>Keep</button>
    </div>
  );
};

export default DeleteMenuItemModal;

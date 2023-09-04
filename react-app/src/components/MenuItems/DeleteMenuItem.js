import { useModal } from "../../context/Modal";
import { deleteMenuItem } from "../../store/menuItems";
import { useDispatch } from "react-redux";

const DeleteMenuItemModal = ({ menuItem }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();

    dispatch(deleteMenuItem(menuItem.id));
  };

  return (
    <div className="delete-menu-item-container">
      <h1>Delete Menu Item Modal Component</h1>
      <span>Delete this menu item?</span>
      <button>Delete</button>
      <button>Keep</button>
    </div>
  );
};

export default DeleteMenuItemModal;

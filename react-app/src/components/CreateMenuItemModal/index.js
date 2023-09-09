import "./CreateMenuItemModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createMenuItem } from "../../store/menuItems";

const CreateMenuItemModal = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [dietary, setDietary] = useState("None");
  const [image_url, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("dietary", dietary);
    formData.append("image_url", image_url);

    const data = await dispatch(createMenuItem(formData, restaurantId));
    if (data?.errors) {
      setErrors(data?.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="itemFormContainer">
      <form
        className="menu-item-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="item-form-header">Add a menu item to your restaurant</h2>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Menu item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="errors">{errors.name}</p>}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          type="text"
          placeholder="Give a brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="errors">{errors.description}</p>}
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          placeholder="Set a price (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className="errors">{errors.price}</p>}

        <label htmlFor="category">Category</label>
        <select
          id="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option key="blankKey" hidden value>
            Select a category
          </option>
          <option>Appetizer</option>
          <option>Beverages</option>
          <option>Burgers</option>
          <option>Burritos</option>
          <option>Chicken</option>
          <option>Chicken and Fish Sandwiches</option>
          <option>Desserts</option>
          <option>Entrees</option>
          <option>Kid's Meal</option>
          <option>Pasta</option>
          <option>Plates</option>
          <option>Salads</option>
          <option>Sandwiches</option>
          <option>Seafood</option>
          <option>Seasonal Specials</option>
          <option>Sides</option>
          <option>Soups</option>
          <option>Small Plates</option>
          <option>Steaks</option>
          <option>Sushi</option>
          <option>Tacos</option>
          <option>Vegetarian</option>
          <option>Wraps</option>
        </select>
        {errors.category && <p className="errors">{errors.category}</p>}
        <label htmlFor="dietary">Dietary</label>
        <select
          id="dietary"
          placeholder="Dietary"
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
        >
          <option key="blankKey" hidden value>
            Select a dietary option
          </option>
          <option>None</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Halal</option>
          <option>Kosher</option>
          <option>Gluten-Free</option>
        </select>
        {errors.dietary && <p className="errors">{errors.dietary}</p>}
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(e.target.files[0])}
        />
        {errors.image_url && <p className="errors">{errors.image_url}</p>}
        <button type="submit">Create Menu Item</button>
      </form>
    </div>
  );
};

export default CreateMenuItemModal;

import "./MenuItems.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewItem } from "../../store/menuItems";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const MenuItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [dietary, setDietary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const history = useHistory();
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newItem = {
      restaurantId: parseInt(restaurantId),
      name,
      description,
      price,
      category,
      dietary,
      imageUrl,
    };
    console.log(newItem);
    console.log(newItem.name);
    dispatch(createNewItem(newItem));
  };

  return (
    <div className="itemFormContainer">
      <form className="menu-item-form" onSubmit={handleSubmit}>
        <h2 className="item-form-header">Add a menu item to your restaurant</h2>
        <label>
          Name
          <input
            className="item-name"
            type="text"
            placeholder="Menu item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Description
          <input
            className="item-description"
            type="text"
            placeholder="Give a brief description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Price
          <input
            className="item-price"
            type="number"
            placeholder="Set a price (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Category
          <select
            className="item-category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option key="blankKey" hidden value>
              Select a category option
            </option>
            <option>Appetizer</option>
            <option>Beverages</option>
            <option>Burgers</option>
            <option>Burritos</option>
            <option>Chicken</option>
            <option>Chicken and Fish Sandwiches</option>
            <option>Desserts</option>
            <option>Entrees</option>
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
        </label>

        <label>
          Dietary
          <select
            className="item-dietary"
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
        </label>

        <label>
          Image
          <input
            className="item-img-url"
            placeholder="Add an image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <button className="item-submit" type="submit">
          Submit new item
        </button>
      </form>
    </div>
  );
};

export default MenuItemForm;

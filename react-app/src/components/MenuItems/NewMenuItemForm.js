import "./MenuItems.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMenuItem } from "../../store/menuItems";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NewMenuItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [dietary, setDietary] = useState("");
  const [image_url, setImageUrl] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const history = useHistory();
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsSubmitted(true);

    const newItem = {
      restaurant_id: parseInt(restaurantId),
      name,
      description,
      price,
      category,
      dietary,
      image_url,
    };

    dispatch(createMenuItem(newItem, restaurantId)).then((createdItem) => {
      console.log("CREATED ITEM", createdItem);
      history.push(`/menuItems/${createdItem.id}`);
    });
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
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <button className="item-submit" type="submit">
          Create Menu Item
        </button>
      </form>
    </div>
  );
};

export default NewMenuItemForm;

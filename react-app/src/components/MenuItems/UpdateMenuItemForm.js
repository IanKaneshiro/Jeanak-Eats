import "./MenuItems.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMenuItem,
  getOneMenuItem,
  updateMenuItem,
} from "../../store/menuItems";
import { useParams, useHistory } from "react-router-dom";

const UpdateMenuItemForm = () => {
  const history = useHistory();
  const { menuItemId } = useParams();
  const item = useSelector(currentMenuItem);
  const dispatch = useDispatch();
  console.log("CURRENT ITEM", item);
  console.log("UPDATE ITEM ID:", menuItemId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [dietary, setDietary] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //Gets the currentMenuItem to render the form's present data
  useEffect(() => {
    dispatch(getOneMenuItem(menuItemId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, menuItemId]);

  //If there is a currentMenuItem, populate fields with its data or "" if null
  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setDescription(item.description || "");
      setPrice(item.price || "");
      setCategory(item.category || "");
      setDietary(item.dietary || "");
      setImageUrl(item.image_url || "");
    }
  }, [item]);

  //Conditionally renders when currentMenuItem data is made available to populate form
  if (isLoading) return <div>Loading...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const itemUpdates = {
      name,
      description,
      price,
      category,
      dietary,
      image_url,
    };

    dispatch(updateMenuItem(itemUpdates, menuItemId)).then((item) => {
      history.push(`/menuItems/${item.id}`);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Description
          <input
            className="item-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Price
          <input
            className="item-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Category
          <select
            className="item-category"
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
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <button className="item-submit" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateMenuItemForm;

import "./UpdateMenuItemModal.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOneMenuItem, updateMenuItem } from "../../store/menuItems";
import LoadingSpinner from "../LoadingSpinner";
import { useModal } from "../../context/Modal";

const UpdateMenuItemModal = ({ item }) => {
  //   const item = useSelector(currentMenuItem);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [dietary, setDietary] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  //Gets the currentMenuItem to render the form's present data
  useEffect(() => {
    dispatch(getOneMenuItem(item.id)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, item.id]);

  //If there is a currentMenuItem, populate fields with its data or "" if null
  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setDescription(item.description || "");
      setPrice(item.price || "");
      setCategory(item.category || "");
      setDietary(item.dietary || "");
      setImageUrl(item.imageUrl || "");
    }
  }, [item]);

  //Conditionally renders when currentMenuItem data is made available to populate form
  if (isLoading) return <LoadingSpinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("id", item.id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("dietary", dietary);
    formData.append("image_url", image_url);
    formData.append("price", price);

    const data = await dispatch(updateMenuItem(formData, item.id));
    if (data?.errors) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="itemFormContainer">
      <form
        className="menu-item-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h2 className="item-form-header">Edit your menu item</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="errors">{errors.name}</p>}
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="errors">{errors.description}</p>}
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className="errors">{errors.price}</p>}
        <label htmlFor="category">Category</label>
        <select
          id="category"
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
          className="item-img-url"
          // value={image_url}
          onChange={(e) => setImageUrl(e.target.files[0])}
        />
        {errors.image_url && <p className="errors">{errors.image_url}</p>}
        <button className="item-submit" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateMenuItemModal;

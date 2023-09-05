import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRestaurant } from "../../store/restaurant";
import "./CreateRestaurantForm.css";
import {
  cuisineOptions,
  countryOptions,
  stateOptions,
} from "../../Resources/selectOptions";

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietary, setDietary] = useState("");
  const [price_range, setPriceRange] = useState("$");
  const [opens_at, setOpensAt] = useState("");
  const [closes_at, setClosesAt] = useState("");
  const [image_url, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("cuisine", cuisine);
    formData.append("dietary", dietary);
    formData.append("price_range", price_range);
    formData.append("opens_at", opens_at);
    formData.append("closes_at", closes_at);
    formData.append("image_url", image_url);
    setLoading(true);

    const data = await dispatch(createRestaurant(formData));
    if (data) {
      setErrors(data);
      setLoading(false);
    } else {
      setLoading(false);
      setName("");
      setAddress("");
      setState("");
      setCountry("");
      setDescription("");
      setCuisine("");
      setDietary("");
      setPriceRange("");
      setOpensAt("");
      setClosesAt("");
      setImageUrl("");
      history.push(`/manage/restaurants/${data.id}`);
    }
  };

  if (loading) return <h1>...loading</h1>;

  return (
    <div className="create--container">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create--main"
      >
        <h1>Create Restaurant</h1>
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <select required onChange={(e) => setState(e.target.value)}>
          <option value="">State</option>
          {stateOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <select required onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country</option>
          {countryOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <textarea
          value={description}
          placeholder="Optional: Provide a short sumary of your restaurant"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select required onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Cuisine</option>
          {cuisineOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <select onChange={(e) => setDietary(e.target.value)}>
          <option value="">Dietary (Optional)</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>
        <select required onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Price Range</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
        <label htmlFor="image">Image (Optional)</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(e.target.files[0])}
        />
        <label htmlFor="open">Opens At</label>
        <input
          id="open"
          type="time"
          value={opens_at}
          onChange={(e) => setOpensAt(e.target.value)}
        />
        <label htmlFor="close">Closes At</label>
        <input
          required
          id="close"
          type="time"
          value={closes_at}
          onChange={(e) => setClosesAt(e.target.value)}
        />

        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default CreateRestaurantForm;

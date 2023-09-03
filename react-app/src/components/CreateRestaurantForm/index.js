import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
    if (data.errors) {
      setErrors(data);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <h1>...loading</h1>;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create--main"
      >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <select onChange={(e) => setState(e.target.value)}>
            <option value="">Select...</option>
            {stateOptions.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Country
          <select onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select...</option>
            {countryOptions.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Description
          <textarea
            value={description}
            placeholder="Optional: Provide a short sumary of your restaurant"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Cuisine
          <select required onChange={(e) => setCuisine(e.target.value)}>
            <option value="">Select...</option>
            {cuisineOptions.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Dietary
          <select onChange={(e) => setDietary(e.target.value)}>
            <option value="">Select...</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
        </label>
        <label>
          Price Range
          <select required onChange={(e) => setPriceRange(e.target.value)}>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </label>
        <label>
          Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </label>
        <label>
          Opens At
          <input
            type="time"
            value={opens_at}
            onChange={(e) => setOpensAt(e.target.value)}
          />
        </label>
        <label>
          Closes At
          <input
            type="time"
            value={closes_at}
            onChange={(e) => setClosesAt(e.target.value)}
          />
        </label>
        <button type="submit">Create Restaurant</button>
      </form>
    </>
  );
};

export default CreateRestaurantForm;

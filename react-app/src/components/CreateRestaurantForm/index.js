import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRestaurant } from "../../store/restaurant";
import "./CreateRestaurantForm.css";
import {
  cuisineOptions,
  countryOptions,
  stateOptions,
  dietaryOptions,
  priceOptions,
} from "../../Resources/selectOptions";
import { filterOptionsArr } from "../../Resources/helperFunctions";
import LoadingSpinner from "../LoadingSpinner";

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
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
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
    setLoading(false);
    if (data?.errors) {
      setErrors(data?.errors);
    } else {
      history.push(`/manage/restaurants/${data.id}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="create--container">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create--main"
      >
        <h1>Create Restaurant</h1>
        <input
          required
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="errors">{errors.name}</p>}
        <input
          required
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className="errors">{errors.address}</p>}
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errors.city && <p className="errors">{errors.city}</p>}
        <select required onChange={(e) => setState(e.target.value)}>
          <option value="">State</option>
          {stateOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.state && <p className="errors">{errors.state}</p>}
        <select required onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country</option>
          {countryOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.country && <p className="errors">{errors.country}</p>}
        <textarea
          value={description}
          placeholder="Optional: Provide a short sumary of your restaurant"
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="errors">{errors.description}</p>}
        <select required onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Cuisine</option>
          {cuisineOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.cuisine && <p className="errors">{errors.cuisine}</p>}
        <select onChange={(e) => setDietary(e.target.value)}>
          <option value="">Dietary (Optional)</option>
          {filterOptionsArr(dietaryOptions, "").map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.dietary && <p className="errors">{errors.dietary}</p>}
        <select required onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Price Range</option>
          {priceOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.price_range && <p className="errors">{errors.price_range}</p>}
        <label htmlFor="image">Image (Optional)</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(e.target.files[0])}
        />
        {errors.image_url && <p className="errors">{errors.image_url}</p>}
        <label htmlFor="open">Opens At</label>
        <input
          id="open"
          type="time"
          value={opens_at}
          onChange={(e) => setOpensAt(e.target.value)}
        />
        {errors.opens_at && <p className="errors">{errors.opens_at}</p>}
        <label htmlFor="close">Closes At</label>
        <input
          required
          id="close"
          type="time"
          value={closes_at}
          onChange={(e) => setClosesAt(e.target.value)}
        />
        {errors.closes_at && <p className="errors">{errors.closes_at}</p>}
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default CreateRestaurantForm;

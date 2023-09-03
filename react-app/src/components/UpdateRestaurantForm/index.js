import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  updateRestaurant,
  getRestaurantById,
  currentRestaurant,
} from "../../store/restaurant";
import "./UpdateRestaurantForm.css";
import {
  cuisineOptions,
  countryOptions,
  stateOptions,
} from "../../Resources/selectOptions";

const UpdateRestaurantForm = ({ type, id }) => {
  const dispatch = useDispatch();
  const restaurant = useSelector(currentRestaurant);
  const { closeModal } = useModal();
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

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getRestaurantById(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setAddress(restaurant.address);
      setCity(restaurant.city);
      setState(restaurant.state);
      setCountry(restaurant.country);
      setDescription(restaurant.description);
      setCuisine(restaurant.cuisine);
      setDietary(restaurant.dietary);
      setPriceRange(restaurant.priceRange);
      setOpensAt(restaurant.opensAt);
      setClosesAt(restaurant.closesAt);
      setImageUrl(restaurant.imageUrl);
    }
  }, [restaurant]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
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
    formData.append("image_url", image_url || restaurant.imageUrl);
    console.log(image_url, formData.get("image_url"));
    const data = await dispatch(updateRestaurant(formData));
    if (data.errors) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="update--main"
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
            <option value={state}>{state}</option>
            {stateOptions.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Country
          <select onChange={(e) => setCountry(e.target.value)}>
            <option value={country}>{country}</option>
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
            <option value={cuisine}>{cuisine}</option>
            {cuisineOptions.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        </label>
        <label>
          Dietary
          <select onChange={(e) => setDietary(e.target.value)}>
            <option value={dietary}>{dietary}</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegitarian">Vegitarian</option>
          </select>
        </label>
        <label>
          Price Range
          <select required onChange={(e) => setPriceRange(e.target.value)}>
            <option value={price_range}>{price_range}</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </label>

        <label>
          Image Url
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

        <button type="submit">Update Restaurant</button>
      </form>
    </>
  );
};

export default UpdateRestaurantForm;

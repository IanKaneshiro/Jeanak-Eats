import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createRestaurant } from "../../../store/restaurant";
import "./CreateRestaurantForm.css";

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietary, setDietary] = useState("");
  const [price_range, setPriceRange] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurant = {
      name,
      address,
      city,
      state,
      country,
      description,
      cuisine,
      dietary,
      price_range,
    };
    const data = await dispatch(createRestaurant(restaurant));
    if (data.errors) {
      setErrors(data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Cuisine
          <select required onChange={(e) => setCuisine(e.target.value)}>
            <option value=""></option>
            <option value="American">American</option>
            <option value="Chinese">Chinese</option>
          </select>
        </label>
        <label>
          Dietary
          <select onChange={(e) => setDietary(e.target.value)}>
            <option value=""></option>
            <option value="Vegan">Vegan</option>
            <option value="Vegitarian">Vegitarian</option>
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
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default CreateRestaurantForm;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import {
  updateRestaurant,
  getRestaurantById,
  currentRestaurant,
  clearCurrentSpot,
} from "../../../store/restaurant";
import "./UpdateRestaurantForm.css";

const UpdateRestaurantForm = ({ closeModal, resId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const restaurant = useSelector(currentRestaurant);
  const { id } = useParams();
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
    dispatch(getRestaurantById(Number(resId)));
    return () => dispatch(clearCurrentSpot());
  }, [dispatch, resId]);

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

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      updateRestaurant({
        id: resId,
        name,
        address,
        city,
        state,
        country,
        description,
        cuisine,
        dietary,
        price_range,
        opens_at,
        closes_at,
        image_url,
      })
    );
    if (data.errors) {
      setErrors(data);
    } else {
      closeModal();
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
          />
        </label>
        <label>
          Cuisine
          <select required onChange={(e) => setCuisine(e.target.value)}>
            <option value={cuisine}>{cuisine}</option>
            <option value="American">American</option>
            <option value="Chinese">Chinese</option>
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
            type="text"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
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

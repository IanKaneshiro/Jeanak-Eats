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
  priceOptions,
  dietaryOptions,
} from "../../Resources/selectOptions";

import { filterOptionsArr } from "../../Resources/helperFunctions";

const UpdateRestaurantForm = ({ id }) => {
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

  const [errors, setErrors] = useState({});

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
    formData.append("image_url", image_url);

    const data = await dispatch(updateRestaurant(formData));

    if (data?.errors) {
      setErrors(data?.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="update--container">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="update--main"
      >
        <h1>Update Restaurant</h1>
        <div className="update--main-inner">
          <div className="update--main-fields">
            <input
              required
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="errors">{errors.name}</p>}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <p className="errors">{errors.address}</p>}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            {errors.city && <p className="errors">{errors.city}</p>}
            <select onChange={(e) => setState(e.target.value)}>
              <option value={state}>{state}</option>
              {filterOptionsArr(stateOptions, restaurant.state).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.state && <p className="errors">{errors.state}</p>}
            <select onChange={(e) => setCountry(e.target.value)}>
              <option value={country}>{country}</option>
              {filterOptionsArr(countryOptions, restaurant.country).map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
            {errors.country && <p className="errors">{errors.country}</p>}
            <textarea
              value={description}
              placeholder="Optional: Provide a short sumary of your restaurant"
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="errors">{errors.description}</p>
            )}
          </div>
          <div className="update--main-fields">
            <select required onChange={(e) => setCuisine(e.target.value)}>
              <option value={cuisine}>{cuisine}</option>
              {filterOptionsArr(cuisineOptions, restaurant.cuisine).map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
            {errors.cuisine && <p className="errors">{errors.cuisine}</p>}
            <select onChange={(e) => setDietary(e.target.value)}>
              {dietary ? (
                <option value={dietary}>{dietary}</option>
              ) : (
                <option value="">Dietary (Optional)</option>
              )}
              {filterOptionsArr(dietaryOptions, restaurant.dietary).map(
                (val) => (
                  <option key={val} value={val}>
                    {val ? val : "None"}
                  </option>
                )
              )}
            </select>
            {errors.dietary && <p className="errors">{errors.dietary}</p>}
            <select required onChange={(e) => setPriceRange(e.target.value)}>
              <option value={price_range}>{price_range}</option>
              {filterOptionsArr(priceOptions, restaurant.priceRange).map(
                (val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                )
              )}
            </select>
            {errors.price_range && (
              <p className="errors">{errors.price_range}</p>
            )}
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
              id="close"
              type="time"
              value={closes_at}
              onChange={(e) => setClosesAt(e.target.value)}
            />
            {errors.closes_at && <p className="errors">{errors.closes_at}</p>}
          </div>
        </div>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default UpdateRestaurantForm;

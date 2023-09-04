import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { countryOptions, stateOptions } from "../../Resources/selectOptions";
import { updateUserAddress } from "../../store/session";
import "./AddressModal.css";

const AddressModal = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      updateUserAddress(address, city, state, country)
    );
    if (data?.errors) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  return (
    <div>
      <h1>Delivery details</h1>
      <form onSubmit={handleSubmit} className="address--modal">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label htmlFor="state">State</label>
        <select id="state" onChange={(e) => setState(e.target.value)}>
          <option value="">Select...</option>
          {stateOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label htmlFor="country">Country</label>
        <select id="country" onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select...</option>
          {countryOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default AddressModal;

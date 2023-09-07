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
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      updateUserAddress(address, city, state, country)
    );
    if (data.errors) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  return (
    <div>
      <h1>Delivery details</h1>
      <form onSubmit={handleSubmit} className="address--modal">
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {errors.address && <p>{errors.address}</p>}
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errors.city && <p>{errors.city}</p>}
        <select required onChange={(e) => setState(e.target.value)}>
          <option value="">State</option>
          {stateOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.state && <p>{errors.state}</p>}
        <select required onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country</option>
          {countryOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.country && <p>{errors.country}</p>}
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default AddressModal;

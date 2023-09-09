import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import { stateOptions, countryOptions } from "../../Resources/selectOptions";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [image_url, setImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(
          first_name,
          last_name,
          email,
          phone_number,
          address,
          city,
          state,
          country,
          image_url,
          password
        )
      );
      if (data) {
        setErrors(data);
      } else {
        return history.push("/");
      }
    } else if (!image_url) {
      setErrors({
        image_url: "Please select a profile image",
      });
    } else {
      setErrors({
        password:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  function displayImage() {
    const icons = [
      "https://res.cloudinary.com/dmkyocbqi/image/upload/v1694225929/pexels-photo-3429782-min_nr8d9w.jpg",
      "https://res.cloudinary.com/dmkyocbqi/image/upload/v1694225793/pexels-photo-1395958-min_yhqvfm.jpg",
      "https://res.cloudinary.com/dmkyocbqi/image/upload/v1694225792/pexels-photo-1132047-min_jaigak.jpg",
      "https://res.cloudinary.com/dmkyocbqi/image/upload/v1694225792/pexels-photo-918327-min_qunh1g.jpg",
      "https://res.cloudinary.com/dmkyocbqi/image/upload/v1694225792/pexels-photo-219794-min_agizd1.jpg",
    ];

    return icons.map((element) => {
      return (
        <label>
          <input
            type="radio"
            name="profile-image"
            value={element}
            className="allImagess"
            onChange={(e) => setImage(e.target.value)}
          />
          <img src={element} alt="Profile Icon" className="icon-image" />
        </label>
      );
    });
  }

  return (
    <div className="signup--container">
      <form onSubmit={handleSubmit} className="signup--main">
        <h1>Sign Up</h1>
        <div className="signup--image-container">
          <h4>Select profile image</h4>
          {errors.image_url && <p className="errors">{errors.image_url}</p>}
          <ul className="allImages">{displayImage()}</ul>
        </div>
        <input
          required
          placeholder="First Name"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.first_name && <p className="errors">{errors.first_name}</p>}
        <input
          required
          placeholder="Last Name"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.last_name && <p className="errors">{errors.last_name}</p>}
        <input
          required
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="errors">{errors.email}</p>}
        <input
          required
          placeholder="Phone Number"
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phone_number && <p className="errors">{errors.phone_number}</p>}
        <input
          placeholder="Address (Optional)"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className="errors">{errors.address}</p>}
        <input
          placeholder="City (Optional)"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && <p className="errors">{errors.city}</p>}
        <select onChange={(e) => setState(e.target.value)}>
          <option value="">State (Optional)</option>
          {stateOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        {errors.state && <p className="errors">{errors.state}</p>}
        <select onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country (Optional)</option>
          {countryOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        {errors.country && <p className="errors">{errors.country}</p>}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="errors">{errors.password}</p>}
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;

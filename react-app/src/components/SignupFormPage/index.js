import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [image, setImage] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    setErrors([]);
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
          image,
          password,
        )
      );
      if (data) {
        setErrors(data);
      } else {
        return history.push("/");
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  function displayImage(){
    const icons = [
      'https://images.pexels.com/photos/1395958/pexels-photo-1395958.jpeg',
      'https://images.pexels.com/photos/3429782/pexels-photo-3429782.jpeg',
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg',
      'https://images.pexels.com/photos/219794/pexels-photo-219794.jpeg',
      'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg'
  ]

  return icons.map( element => {

    return (
      <button onClick={()=>setImage(element)} className="allImagess">
      <img
      src= {element}
      alt="Profile Icon"
      className="icon-image"/>
    </button>
    )
  })
  }


  console.log(image, 'imageeeeeeeeee')

  return (
    <div className="signup--container">
      <form onSubmit={handleSubmit} className="signup--main">
        <h1>Sign Up</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          placeholder="First Name"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          placeholder="Last Name"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Phone Number"
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          placeholder="Address (Optional)"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          placeholder="City (Optional)"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select onChange={(e) => setState(e.target.value)}>
          <option value="">State (Optional)</option>
          {stateOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        <select onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country (Optional)</option>
          {countryOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>


        <div className="allImages">{displayImage()}</div>

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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

export default SignupFormPage

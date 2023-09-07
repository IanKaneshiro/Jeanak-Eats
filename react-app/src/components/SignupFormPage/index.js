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
  const [image_url, setImage] = useState('')
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
          password,
        )
      );
      if (data?.errors) {
        setErrors(data.errors);
      } else {
        return history.push("/");
      }
    } else {
      setErrors({
        password:
          "Confirm Password field must be the same as the Password field",
      });
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


  console.log(image_url, 'imageeeeeeeeee')

  return (
    <div className="signup--container">
      <form onSubmit={handleSubmit} className="signup--main">
        <h1>Sign Up</h1>
        <input
          required
          placeholder="First Name"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.first_name && <p>{errors.first_name}</p>}
        <input
          required
          placeholder="Last Name"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.last_name && <p>{errors.last_name}</p>}
        <input
          required
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          required
          placeholder="Phone Number"
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phone_number && <p>{errors.phone_number}</p>}
        <input
          required
          placeholder="Address (Optional)"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p>{errors.address}</p>}
        <input
          placeholder="City (Optional)"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && <p>{errors.city}</p>}
        <select onChange={(e) => setState(e.target.value)}>
          <option value="">State (Optional)</option>
          {stateOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
        {errors.state && <p>{errors.state}</p>}
        <select onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country (Optional)</option>
          {countryOptions.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>


        <div className="allImages">{displayImage()}</div>

        {errors.country && <p>{errors.country}</p>}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
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

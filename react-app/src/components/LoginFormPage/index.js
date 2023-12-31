import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = () => {
    dispatch(login("demo@aa.io", "password"));
    return <Redirect to="/" />;
  };

  return (
    <div className="login--container">
      <form onSubmit={handleSubmit} className="login--main">
        <h1>Log In</h1>
        <input
          placeholder="Enter phone number or email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="errors">{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
      <button className="login-demo-btn" onClick={loginDemo}>
        Login Demo
      </button>
    </div>
  );
}

export default LoginFormPage;

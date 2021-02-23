import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
import "./authStyling/form.css";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(firstname, lastname, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="center_box">
      <form onSubmit={onSignUp} className="form">
        <h1 className="form_title">Sign Up</h1>
        <hr className="break"></hr>
        <p className="form_text">
          Nice to meet you! Sign up for lists galore! <br></br>
          Already have an account?
          <a href="/login" className="form_link">
            Log in
          </a>
        </p>
        <div>
          <input
            className="form_input"
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={updateFirstname}
            value={firstname}
          ></input>
        </div>
        <div>
          <input
            className="form_input"
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={updateLastname}
            value={lastname}
          ></input>
        </div>
        <div>
          <input
            className="form_input"
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <input
            className="form_input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            className="form_input"
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type="submit" className="submit_button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

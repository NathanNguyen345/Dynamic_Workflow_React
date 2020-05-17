import React, { useState, useEffect, useRef } from "react";

function Password({ value }) {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [required, setRequired] = useState(value.required);
  const [toggleView, setToggleView] = useState(value.required);
  const requiredRef = useRef(null);

  // Check to see if password is required on render
  useEffect(() => {
    if (required) {
      requiredRef.current.checked = true;
      requiredRef.current.disabled = true;
      setToggleView(true);
    }
  }, []);

  // Use effect to handle password change and display valid password
  useEffect(() => {
    if (password === confirmedPassword) {
      setValidPassword(true);
    } else setValidPassword(false);
  }, [password, confirmedPassword]);

  // Toggle between password view
  const showToggle = () => {
    if (toggleView) {
      return (
        <div>
          <input
            type={showPassword ? "text" : "password"}
            onChange={passwordHandler1}
          ></input>
          <input
            type={showPassword ? "text" : "password"}
            onChange={passwordHandler2}
          ></input>
          <h3 hidden={validPassword ? true : false}>
            Password Requirement Not Met
          </h3>
          <input type="checkbox" onChange={showPasswordHandler}></input>
          <label>Show Passowrd</label>
        </div>
      );
    }
  };

  // Handle password change
  const passwordHandler1 = (e) => {
    setPassword(e.target.value);
  };

  // Handle confirmed password change
  const passwordHandler2 = (e) => {
    setConfirmedPassword(e.target.value);
  };

  // Handle the show password checkbox
  const showPasswordHandler = (e) => {
    setShowPassword(!showPassword);
  };

  // Handle checkbox to show password view
  const checkboxHandler = (e) => {
    setToggleView(!toggleView);
  };

  return (
    <div>
      <input
        type="checkbox"
        ref={requiredRef}
        onChange={checkboxHandler}
      ></input>
      <h3>Password Require</h3>
      {showToggle()}
    </div>
  );
}

export default Password;

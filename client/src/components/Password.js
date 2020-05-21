import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowSelector";

function Password({ value }) {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [toggleView, setToggleView] = useState(value.required);
  const requiredRef = useRef(null);
  const required = value.required;

  const jsonContext = useContext(JsonConext);

  // Check to see if password is required on render
  useEffect(() => {
    if (required) {
      requiredRef.current.checked = true;
      requiredRef.current.disabled = true;
      setToggleView(true);
    }
  }, [required]);

  // Use effect to handle password change and display valid password
  // Need to check for required
  useEffect(() => {
    if (password === confirmedPassword) {
      setValidPassword(true);
      jsonContext.jsonDispatch({
        type: "securityOptions",
        value: password,
        id: "openPassword",
      });
    } else {
      setValidPassword(false);
      jsonContext.jsonDispatch({
        type: "securityOptions",
        value: "",
        id: "openPassword",
      });
    }
  }, [password, confirmedPassword, jsonContext]);

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

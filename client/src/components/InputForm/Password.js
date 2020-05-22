import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext, ResetContext } from "../WorkflowSelector/WorkflowSelector";
import classes from "./InputForm.module.css";

function Password({ value }) {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [toggleView, setToggleView] = useState(value.required);
  const requiredRef = useRef(null);
  const required = value.required;

  const jsonContext = useContext(JsonConext);
  const resetReducer = useContext(ResetContext);

  // Check to see if password is required on render
  useEffect(() => {
    if (required) {
      requiredRef.current.checked = true;
      requiredRef.current.disabled = true;
      setToggleView(true);
    } else {
      requiredRef.current.checked = false;
      requiredRef.current.disabled = false;
      setToggleView(false);
    }
  }, [required]);

  // Reset component
  useEffect(() => {
    if (!required) {
      requiredRef.current.checked = false;
      requiredRef.current.disabled = false;
      setToggleView(false);
    }
  }, [resetReducer.resetState]);

  // Use effect to handle password change and display valid password
  // Endless render when we add jsonContext as dependency
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
  }, [password, confirmedPassword]);

  // Toggle between password view
  const showToggle = () => {
    if (toggleView) {
      return (
        <>
          <input
            className={classes.user_input}
            type={showPassword ? "text" : "password"}
            onChange={passwordHandler1}
          ></input>
          <input
            className={classes.user_input}
            type={showPassword ? "text" : "password"}
            onChange={passwordHandler2}
          ></input>
          <h3 className={classes.error} hidden={validPassword ? true : false}>
            Password Requirement Not Met
          </h3>
          <input type="checkbox" onChange={showPasswordHandler}></input>
          <label className={classes.option_label}>Show Password</label>
        </>
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
    <React.Fragment>
      <input
        type="checkbox"
        ref={requiredRef}
        onChange={checkboxHandler}
      ></input>
      <label className={classes.option_label}>Password Required</label>
      {showToggle()}
    </React.Fragment>
  );
}

export default Password;

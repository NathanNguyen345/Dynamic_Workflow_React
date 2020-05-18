import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowForm";

function Cc({ value, ccId }) {
  const [userInput, setUserInput] = useState(value.defaultValue);
  const emailRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  // On mount assign all values to recipients
  // Should be able to strip this out and make it abstract
  useEffect(() => {
    emailRef.current.defaultValue = value.defaultValue;
    jsonContext.jsonDispatch({
      type: "ccs",
      value: userInput,
      id: ccId,
    });
  }, []);

  // Handle email change
  const handleEmailChange = (e) => {
    setUserInput(e.target.value);
    jsonContext.jsonDispatch({
      type: "ccs",
      value: e.target.value,
      id: ccId,
    });
  };

  return (
    <div>
      <h3>{value.label}</h3>
      <input
        type="text"
        ref={emailRef}
        onChange={handleEmailChange}
        placeholder="Enter Cc's Email"
      ></input>
    </div>
  );
}

export default Cc;

import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowSelector";

// Check renders, being rendered twice

function Recipients({ value, recipientsId }) {
  const [userInput, setUserInput] = useState(value.defaultValue);
  const emailRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  // On mount assign all values to recipients
  // Should be able to strip this out and make it abstract
  useEffect(() => {
    emailRef.current.defaultValue = value.defaultValue;
    jsonContext.jsonDispatch({
      type: "recipientsListInfo",
      value: userInput,
      id: recipientsId,
    });
  }, []);

  // Handle email change and dispatch to reducer
  const handleEmailChange = (e) => {
    setUserInput(e.target.value);
    jsonContext.jsonDispatch({
      type: "recipientsListInfo",
      value: e.target.value,
      id: recipientsId,
    });
  };

  return (
    <div>
      <h3>{value.label}</h3>
      <input
        type="text"
        ref={emailRef}
        onChange={handleEmailChange}
        placeholder="Enter Recipient's Email"
      ></input>
    </div>
  );
}

export default Recipients;

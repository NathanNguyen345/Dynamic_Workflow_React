import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowSelector";

// Check renders, being rendered twice

function Recipients({ value, recipientsId }) {
  const emailRef = useRef(null);
  const jsonContext = useContext(JsonConext);
  const reduceState = jsonContext.jsonState["recipientsListInfo"][recipientsId];

  // On mount assign all values to recipients
  useEffect(() => {
    emailRef.current.defaultValue = reduceState;
  }, [reduceState]);

  // Handle email change and dispatch to reducer
  const handleEmailChange = (e) => {
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

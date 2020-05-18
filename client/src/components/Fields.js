import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowForm";

function Fields({ value, fieldId }) {
  const [userInput, setUserInput] = useState("");
  const emailRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    emailRef.current.defaultValue = value.defaultValue;
    setUserInput(value.defaultValue);
  }, [value]);

  // Handle field name change
  const handleEmailChange = (e) => {
    setUserInput(e.target.value);
    jsonContext.jsonDispatch({
      type: "mergeFieldInfo",
      value: e.target.value,
      id: fieldId,
    });
  };

  return (
    <div>
      <h3>{value.displayName}</h3>
      <input type="text" ref={emailRef} onChange={handleEmailChange}></input>
    </div>
  );
}

export default Fields;

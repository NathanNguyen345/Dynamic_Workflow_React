import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowForm";

function DocumentName({ value }) {
  const [userInput, setUserInput] = useState("");
  const targetRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    targetRef.current.defaultValue = value.defaultValue;
    setUserInput(value.defaultValue);
  }, [value]);
  // Handle email change
  const handleDocumentNameChange = (e) => {
    setUserInput(e.target.value);
    jsonContext.jsonDispatch({ type: "name", value: userInput });
  };

  return (
    <div>
      <h3>Document Name</h3>
      <h2>{userInput}</h2>
      <input
        type="text"
        ref={targetRef}
        onChange={handleDocumentNameChange}
      ></input>
    </div>
  );
}

export default DocumentName;

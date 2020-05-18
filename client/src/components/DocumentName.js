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
  }, []);

  // Handle email change
  const handleDocumentNameChange = (e) => {
    jsonContext.jsonDispatch({ type: "name", value: e.target.value });
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h3>Document Name</h3>
      <input
        type="text"
        placeholder="Please Enter A Document Name"
        ref={targetRef}
        onChange={handleDocumentNameChange}
      ></input>
    </div>
  );
}

export default DocumentName;

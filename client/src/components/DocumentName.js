import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowSelector";

function DocumentName({ value }) {
  const targetRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  // On mount assign all values to recipients
  useEffect(() => {
    targetRef.current.defaultValue = jsonContext.jsonState["name"];
  }, [jsonContext.jsonState["name"]]);

  // Handle email change
  const handleDocumentNameChange = (e) => {
    setDocumentName(e.target.value);
    jsonContext.jsonDispatch({ type: "name", value: e.target.value });
  };

  return (
    <div>
      <h3>Document Name</h3>
      <h3>{jsonContext.jsonState["name"]}</h3>
      <input
        id="agreement-name"
        type="text"
        placeholder="Please Enter A Document Name"
        ref={targetRef}
        onChange={handleDocumentNameChange}
      ></input>
    </div>
  );
}

export default DocumentName;

import React, { useEffect, useRef, useContext } from "react";
import { JsonConext } from "../WorkflowSelector/WorkflowSelector";

function DocumentName() {
  const targetRef = useRef(null);
  const jsonContext = useContext(JsonConext);
  const reduceState = jsonContext.jsonState["name"];

  // On mount assign all values to recipients
  useEffect(() => {
    targetRef.current.defaultValue = reduceState;
  }, [reduceState]);

  // Handle email change
  const handleDocumentNameChange = (e) => {
    jsonContext.jsonDispatch({ type: "name", value: e.target.value });
  };

  return (
    <div>
      <h3>Document Name</h3>
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

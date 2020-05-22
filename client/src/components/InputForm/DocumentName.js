import React, { useEffect, useRef, useContext } from "react";
import { JsonConext } from "../WorkflowSelector/WorkflowSelector";
import classes from "./InputForm.module.css";

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
        className={classes.user_input}
        type="text"
        placeholder="Please Enter A Document Name"
        ref={targetRef}
        onChange={handleDocumentNameChange}
      ></input>
    </div>
  );
}

export default DocumentName;

import React, { useState, useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowSelector";

function Messages({ value }) {
  const targetRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    targetRef.current.defaultValue = value.defaultValue;
    jsonContext.jsonDispatch({ type: "message", value: value.defaultValue });
  }, []);

  // Handle email change
  const handleDocumentNameChange = (e) => {
    jsonContext.jsonDispatch({ type: "message", value: e.target.value });
  };

  return (
    <div>
      <h3>Messages</h3>
      <input
        type="text"
        ref={targetRef}
        placeholder="Please Enter A Message"
        onChange={handleDocumentNameChange}
      ></input>
    </div>
  );
}

export default Messages;

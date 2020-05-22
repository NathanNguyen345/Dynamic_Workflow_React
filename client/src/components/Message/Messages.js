import React, { useEffect, useRef, useContext } from "react";
import { JsonConext } from "../WorkflowSelector/WorkflowSelector";

function Messages() {
  const targetRef = useRef(null);
  const jsonContext = useContext(JsonConext);
  const reduceState = jsonContext.jsonState["message"];

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    targetRef.current.defaultValue = reduceState;
  }, [reduceState]);

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

import React, { useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowSelector";

function Cc({ value, ccId }) {
  const emailRef = useRef(null);
  const jsonContext = useContext(JsonConext);
  const reduceState = jsonContext.jsonState["ccs"][ccId];

  // On mount assign all values to recipients
  useEffect(() => {
    emailRef.current.defaultValue = reduceState;
  }, [reduceState]);

  // Handle email change
  const handleEmailChange = (e) => {
    jsonContext.jsonDispatch({
      type: "ccs",
      value: e.target.value,
      id: ccId,
    });
  };

  return (
    <div>
      <h3>{value.label}</h3>
      <input
        type="text"
        ref={emailRef}
        onChange={handleEmailChange}
        placeholder="Enter Cc's Email"
      ></input>
    </div>
  );
}

export default Cc;

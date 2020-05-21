import React, { useEffect, useRef, useContext } from "react";
import { JsonConext } from "./WorkflowSelector";

function Fields({ value, fieldId }) {
  const emailRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  // On mount assign all values to recipients
  useEffect(() => {
    emailRef.current.defaultValue = value.defaultValue;
  }, [value]);

  // Handle field name change
  const handleEmailChange = (e) => {
    const mergeData = {
      defaultValue: e.target.value,
      fieldName: value.fieldName,
    };

    jsonContext.jsonDispatch({
      type: "mergeFieldsInfo",
      value: mergeData,
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

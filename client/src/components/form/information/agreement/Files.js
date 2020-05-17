import React, { useState, useEffect, useRef } from "react";

function Files({ value }) {
  const [documentKey, setDocumentKey] = useState("");
  const targetRef = useRef(null);

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    setDocumentKey(value.defaultValue);
  }, [value]);

  // Handle email change
  const handleDocumentNameChange = (e) => {
    setDocumentKey(e.target.value);
  };

  const checkForLibraryDocument = () => {
    if ("workflowLibraryDocumentSelectorList" in value) {
      return <h4>{value.workflowLibraryDocumentSelectorList[0].label}</h4>;
    } else {
      return (
        <input
          type="text"
          ref={targetRef}
          onChange={handleDocumentNameChange}
        ></input>
      );
    }
  };

  return (
    <div>
      <h3>{value.label}</h3>
      {checkForLibraryDocument()}
    </div>
  );
}

export default Files;

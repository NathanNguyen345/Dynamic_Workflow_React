import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Files({ value }) {
  const [documentKey, setDocumentKey] = useState("");
  const targetRef = useRef(null);

  const [fileName, setFileName] = useState("");

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    setDocumentKey(value.defaultValue);
    console.log(value);
  }, [value]);

  // Handle document change change
  const handleDocumentChange = (e) => {
    setDocumentKey(e.target.value);

    setFileName(e.target.files[0].name);
  };

  const checkForLibraryDocument = () => {
    if ("workflowLibraryDocumentSelectorList" in value) {
      return <h4>{value.workflowLibraryDocumentSelectorList[0].label}</h4>;
    } else {
      return (
        <input
          type="file"
          ref={targetRef}
          onChange={handleDocumentChange}
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

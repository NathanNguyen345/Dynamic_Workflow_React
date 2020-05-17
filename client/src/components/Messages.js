import React, { useState, useEffect, useRef } from "react";

function Messages({ value }) {
  const [userInput, setUserInput] = useState("");
  const targetRef = useRef(null);

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    targetRef.current.defaultValue = value.defaultValue;
    setUserInput(value.defaultValue);
  }, [value]);

  // Handle email change
  const handleDocumentNameChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h3>Messages</h3>
      <input
        type="text"
        ref={targetRef}
        onChange={handleDocumentNameChange}
      ></input>
    </div>
  );
}

export default Messages;

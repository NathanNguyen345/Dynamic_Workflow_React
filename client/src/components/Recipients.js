import React, { useState, useEffect, useRef } from "react";

// Check renders, being rendered twice

function Recipients({ value, recipientsId }) {
  const [userInput, setUserInput] = useState("");
  const emailRef = useRef(null);

  // On mount assign all values to recipients
  // Should be able to strip this out and back it abstract
  useEffect(() => {
    emailRef.current.defaultValue = value.defaultValue;
    setUserInput(value.defaultValue);
  }, [value]);

  // Handle email change
  const handleEmailChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h3>{value.label}</h3>
      <input type="text" ref={emailRef} onChange={handleEmailChange}></input>
    </div>
  );
}

export default Recipients;

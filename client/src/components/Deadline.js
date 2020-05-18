import React, { useState } from "react";

function Deadline({ value }) {
  const [required, setRequired] = useState(!value.visible);

  // Toggle deadline view
  const toggleView = () => {
    if (required) {
      return (
        <div>
          <input type="date"></input>
        </div>
      );
    }
  };

  // Handle checkbox changes
  const checkboxHandler = (e) => {
    setRequired(!required);
  };

  return (
    <div>
      <input type="checkbox" onChange={checkboxHandler}></input>
      <label>Completion Deadline</label>
      {toggleView()}
    </div>
  );
}

export default Deadline;

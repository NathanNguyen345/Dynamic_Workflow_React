import React, { useState, useEffect } from "react";

function WorkflowSelector() {
  const [workflows, setWorkflows] = useState([]);

  return (
    <div className="jumbotron">
      <div className="form-group">
        <label>Work Flow Selector</label>
        <select>
          <option>1</option>
          <option>1</option>
          <option>1</option>
        </select>
      </div>
    </div>
  );
}

export default WorkflowSelector;

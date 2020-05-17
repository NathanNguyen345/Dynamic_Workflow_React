import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import WorkflowForm from "../form/WorkflowForm";

function WorkflowSelector() {
  const [workflows, setWorkflows] = useState([]);
  const [id, setId] = useState("");
  const selectRef = useRef(null);
  const [submit, setSubmit] = useState(false);

  // Call Express API to retreive workflows run on mount
  useEffect(() => {
    selectRef.current.focus();
    axios
      .get("/api/getWorkflows")
      .then((response) => {
        setWorkflows(response.data["userWorkflowList"]);
        setId(response.data["userWorkflowList"][0]["workflowId"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Map all workflows to options for selection
  const mapWorkflows = workflows.map((workflow) => (
    <option key={workflow.workflowId} value={workflow.workflowId}>
      {workflow.displayName}
    </option>
  ));

  // Handle onChange of selection
  const handleSelectChange = (e) => {
    setId(e.target.value);
  };

  // Handle the submit button
  const submitHandler = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <div className="jumbotron">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Work Flow Selector</label>
          <select
            className="form-control"
            id="workflow-dropdown"
            ref={selectRef}
            onChange={handleSelectChange}
          >
            {mapWorkflows}
          </select>
        </div>
        <button>Select</button>
      </form>

      {submit && <WorkflowForm id={id} />}
    </div>
  );
}

export default WorkflowSelector;

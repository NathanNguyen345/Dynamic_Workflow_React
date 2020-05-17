import React, { useState, useRef } from "react";
import WorkflowForm from "../form/WorkflowForm";

function WorkflowSelector(props) {
  const [id, setId] = useState(props.workflows[0].workflowId);
  const selectRef = useRef("");
  const [click, setClick] = useState(0);
  const [viewForm, setViewForm] = useState(false);

  // Map all workflows to options for selection
  const mapWorkflows = props.workflows.map((workflow) => (
    <option key={workflow.workflowId} value={workflow.workflowId}>
      {workflow.displayName}
    </option>
  ));

  // Select handler for option change
  const handleSelectChange = (e) => {
    setId(e.target.value);
  };

  // Button
  const clickHandler = () => {
    setClick((prevClick) => prevClick + 1);
    setViewForm(true);
  };

  return (
    <div className="jumbotron">
      <form>
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
        <button type="button" onClick={clickHandler}>
          Select
        </button>
      </form>
      <div>{viewForm && <WorkflowForm id={id} click={click} />}</div>
    </div>
  );
}

export default WorkflowSelector;

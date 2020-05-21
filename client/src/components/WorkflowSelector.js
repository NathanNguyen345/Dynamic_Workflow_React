import React, {
  useState,
  useRef,
  useReducer,
  useEffect,
  cloneElement,
} from "react";
import axios from "axios";
import WorkflowForm from "./WorkflowForm";

export const JsonConext = React.createContext();

const initalState = {
  fileInfos: [],
  name: "",
  recipientsListInfo: [],
  ccs: [],
  securityOptions: {},
  mergeFieldInfo: [],
  daysUntilSigningDeadline: "",
  reminderFrequency: "",
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fileInfos":
      state.fileInfos[action.id] = action.value;
      return { ...state };
    case "name":
      return { ...state, name: action.value };
    case "recipientsListInfo":
      state.recipientsListInfo[action.id] = action.value;
      return { ...state };
    case "ccs":
      state.ccs[action.id] = action.value;
      return { ...state };
    case "securityOptions":
      state.securityOptions[action.id] = action.value;
      return { ...state };
    case "mergeFieldInfo":
      state.mergeFieldInfo[action.id] = action.value;
      return { ...state };
    case "daysUntilSigningDeadline":
      return { ...state, daysUntilSigningDeadline: action.value };
    case "reminderFrequency":
      return { ...state, reminderFrequency: action.value };
    case "message":
      return { ...state, message: action.value };
    case "reset":
      return { ...state };
  }
};

function WorkflowSelector(props) {
  const [id, setId] = useState(props.workflows[0].workflowId);
  const selectRef = useRef("");
  const [viewForm, setViewForm] = useState(false);
  const [workflowId, setWorkflowById] = useState([]);
  const [jsonAPI, dispatch] = useReducer(reducer, initalState);

  // Map all workflows to options for selection
  const mapWorkflows = props.workflows.map((workflow, index) => (
    <option key={workflow.workflowId} name={index} value={workflow.workflowId}>
      {workflow.displayName}
    </option>
  ));

  // Select handler for option change
  const handleSelectChange = (e) => {
    setId(e.target.value);
  };

  // Button
  const clickHandler = () => {
    axios
      .get(`/api/getWorkflows/${id}`)
      .then((response) => {
        setWorkflowById(response.data);
        dispatch({
          type: "name",
          value: response.data.agreementNameInfo.defaultValue,
        });
        dispatch({
          type: "message",
          value: response.data.messageInfo.defaultValue,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setViewForm(true);
  };

  return (
    <JsonConext.Provider value={{ jsonState: jsonAPI, jsonDispatch: dispatch }}>
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
        <div>{viewForm && <WorkflowForm id={workflowId} />}</div>
      </div>
    </JsonConext.Provider>
  );
}

export default WorkflowSelector;

import React, { useState, useRef, useReducer } from "react";
import axios from "axios";
import WorkflowForm from "../WorkflowForm/WorkflowForm";
import classes from "./WorkflowSelector.module.css";

export const JsonConext = React.createContext();
export const ResetContext = React.createContext();

const initalState = {
  fileInfos: [],
  name: "",
  recipientsListInfo: [],
  ccs: [],
  securityOptions: {},
  mergeFieldsInfo: [],
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
    case "mergeFieldsInfo":
      state.mergeFieldsInfo[action.id] = action.value;
      return { ...state };
    case "daysUntilSigningDeadline":
      return { ...state, daysUntilSigningDeadline: action.value };
    case "reminderFrequency":
      return { ...state, reminderFrequency: action.value };
    case "message":
      return { ...state, message: action.value };
    case "reset":
      return { ...state };
    default:
      return;
  }
};

const resetInitalState = 0;

const resetReducer = (state, action) => {
  switch (action) {
    case "reset":
      return state + 1;
    default:
      return resetInitalState;
  }
};

function WorkflowSelector(props) {
  const [id, setId] = useState(props.workflows[0].workflowId);
  const selectRef = useRef("");
  const [viewForm, setViewForm] = useState(false);
  const [workflowId, setWorkflowById] = useState([]);
  const [jsonAPI, dispatch] = useReducer(reducer, initalState);
  const [resetClicked, resetDispatch] = useReducer(
    resetReducer,
    resetInitalState
  );

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
    resetDispatch("reset");

    if (viewForm === false) {
      setViewForm(true);
    } else {
      setViewForm(false);
    }

    axios
      .get(`/api/getWorkflows/${id}`)
      .then((response) => {
        setWorkflowById(response.data);
        console.log(response.data);
        dispatch({
          type: "name",
          value: response.data.agreementNameInfo.defaultValue,
        });

        dispatch({
          type: "message",
          value: response.data.messageInfo.defaultValue,
        });

        // Need to readjust json
        response.data.recipientsListInfo.map((recipient, index) => {
          const email = {
            email: response.data.recipientsListInfo[index].defaultValue,
          };

          const userInfo = {
            name: response.data.recipientsListInfo[index].name,
            recipients: [email],
          };

          dispatch({
            type: "recipientsListInfo",
            value: userInfo,
            id: index,
          });
        });

        if ("ccsListInfo" in response.data) {
          response.data.ccsListInfo.map((recipient, index) => {
            dispatch({
              type: "ccs",
              value: response.data.ccsListInfo[index].defaultValue,
              id: index,
            });
          });
        } else {
          jsonAPI["ccs"].filter((email) => email.length > 0);
        }

        response.data.fileInfos.map((file, index) => {
          var fileData = {
            name: "",
            workflowLibraryDocumentId: "",
            transientDocumentId: "",
          };

          if ("workflowLibraryDocumentSelectorList" in file) {
            fileData = {
              name: file.name,
              workflowLibraryDocumentId:
                file.workflowLibraryDocumentSelectorList[0].workflowLibDoc,
            };
          } else {
            fileData = {
              name: file.label,
              transientDocumentId: "",
            };
          }
          dispatch({
            type: "fileInfos",
            value: fileData,
            id: index,
          });
        });

        if ("mergeFieldsInfo" in response.data) {
          response.data.mergeFieldsInfo.map((field, index) => {
            const mergeData = {
              defaultValue: field.defaultValue,
              fieldName: field.fieldName,
            };
            dispatch({
              type: "mergeFieldsInfo",
              value: mergeData,
              id: index,
            });
          });
        } else {
          jsonAPI["mergeFieldsInfo"].filter((field) => field.length >= 0);
        }

        if ("passwordInfo" in response.data) {
          dispatch({
            type: "securityOptions",
            value: response.data.passwordInfo.defaultValue,
            id: "openPassword",
          });
        } else {
          dispatch({
            type: "securityOptions",
            value: "",
            id: "openPassword",
          });
        }

        if ("expirationInfo" in response.data) {
          dispatch({
            type: "daysUntilSigningDeadline",
            value: response.data.expirationInfo.defaultValue,
          });
        }

        setViewForm(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <JsonConext.Provider value={{ jsonState: jsonAPI, jsonDispatch: dispatch }}>
      <ResetContext.Provider
        value={{ resetState: resetClicked, resetDispatch: resetDispatch }}
      >
        <div className="row h-100 justify-content-center align-items-center ">
          <div className={`${classes.workflow_form_top}`}>
            <div className={classes.workflow_form_top_wrapper}>
              <form className={classes.selector_form}>
                <div className="form-group">
                  <label className={classes.workflow_label}>
                    Workflow Selector
                  </label>
                  <select
                    className={`form-control ${classes.dropdown}`}
                    ref={selectRef}
                    onChange={handleSelectChange}
                  >
                    {mapWorkflows}
                  </select>
                </div>
                <button
                  className={`btn btn-primary btn-custom ${classes.button}`}
                  type="button"
                  onClick={clickHandler}
                >
                  Select
                </button>
              </form>
            </div>
            {viewForm && <WorkflowForm id={workflowId} agreementId={id} />}
          </div>
        </div>
      </ResetContext.Provider>
    </JsonConext.Provider>
  );
}

export default WorkflowSelector;

import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Recipients from "./Recipients";
import Cc from "./Cc";
import DocumentName from "./DocumentName";
import Messages from "./Messages";
import Files from "./Files";
import Fields from "./Fields";
import Password from "./Password";
import Deadline from "./Deadline";
import Reminders from "./Reminders";
import Test from "./Test";

export const JsonConext = React.createContext();

const initalState = {
  fileInfos: [],
  name: "111",
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
  }
};

function WorkflowForm({ id, click }) {
  const [workflowById, setWorkflowById] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [jsonAPI, dispatch] = useReducer(reducer, initalState);

  // Call Express route to retreive workflow by ID
  // Need to use callback or memo to reduce rendering
  useEffect(() => {
    axios
      .get(`/api/getWorkflows/${id}`)
      .then((response) => {
        console.log(response.data);
        setWorkflowById(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [click]);

  // Can use custom hook to reduce this down
  // Function to render recipients component
  const renderRecipients = () => {
    if (isLoaded) {
      return workflowById.recipientsListInfo.map((recipient, index) => (
        <Recipients
          key={index}
          recipientsId={index}
          value={workflowById.recipientsListInfo[index]}
        />
      ));
    }
  };

  // Function to render CC component
  const renderCCs = () => {
    if (isLoaded && "ccsListInfo" in workflowById) {
      return (
        isLoaded &&
        "ccsListInfo" in workflowById &&
        workflowById.ccsListInfo.map((recipient, index) => (
          <Cc
            key={index}
            ccId={index}
            value={workflowById.ccsListInfo[index]}
          ></Cc>
        ))
      );
    }
  };

  const renderDocumentName = () => {
    if (isLoaded) {
      return <DocumentName value={workflowById.agreementNameInfo} />;
    }
  };

  const renderMessages = () => {
    if (isLoaded) {
      return <Messages value={workflowById.messageInfo} />;
    }
  };

  const renderFiles = () => {
    if (isLoaded) {
      return workflowById.fileInfos.map((file, index) => (
        <Files
          key={index}
          fileId={index}
          value={workflowById.fileInfos[index]}
        />
      ));
    }
  };

  const renderFields = () => {
    if (isLoaded && "mergeFieldsInfo" in workflowById) {
      return workflowById.mergeFieldsInfo.map((merge, index) => (
        <Fields
          key={index}
          fieldId={index}
          value={workflowById.mergeFieldsInfo[index]}
        />
      ));
    }
  };

  const renderPassword = () => {
    if (isLoaded && workflowById.passwordInfo.visible) {
      return <Password value={workflowById.passwordInfo} />;
    }
  };

  const renderDeadline = () => {
    if (isLoaded && "expirationInfo" in workflowById) {
      return <Deadline value={workflowById.expirationInfo} />;
    }
  };

  const renderReminders = () => {
    if (isLoaded) {
      return <Reminders />;
    }
  };

  // // Handle email change
  // const handleDocumentNameChange = (e) => {
  //   dispatch({ type: "name", value: userInput });
  // };

  return (
    <JsonConext.Provider value={{ jsonState: jsonAPI, jsonDispatch: dispatch }}>
      <div>
        <form>
          <h3 id="workflow-description">{workflowById.description}</h3>
          {/* Might want to refractor this to top form */}
          {renderRecipients()}
          {renderCCs()}

          {/* Refractor to bottom form */}
          {renderDocumentName()}
          {renderMessages()}
          {renderFiles()}
          {renderFields()}
          {renderPassword()}
          {renderDeadline()}
          {renderReminders()}
          {isLoaded && <button type="button">Submit</button>}
        </form>
      </div>
    </JsonConext.Provider>
  );
}

export default WorkflowForm;

import React, { useState, useEffect, useContext } from "react";
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
import { JsonConext } from "./WorkflowSelector";

function WorkflowForm({ id, loaded }) {
  const [isLoaded, setIsLoaded] = useState(loaded);
  const length = Object.keys(id).length > 0;

  const jsonContext = useContext(JsonConext);

  // Can use custom hook to reduce this down
  // Function to render recipients component
  const renderRecipients = () => {
    if (length) {
      return id.recipientsListInfo.map((recipient, index) => (
        <Recipients
          key={index}
          recipientsId={index}
          value={id.recipientsListInfo[index]}
        />
      ));
    }
  };

  // Function to render CC component
  const renderCCs = () => {
    if (isLoaded && "ccsListInfo" in id) {
      return (
        isLoaded &&
        "ccsListInfo" in id &&
        id.ccsListInfo.map((recipient, index) => (
          <Cc key={index} ccId={index} value={id.ccsListInfo[index]}></Cc>
        ))
      );
    }
  };

  const renderMessages = () => {
    if (isLoaded) {
      return <Messages value={id.messageInfo} />;
    }
  };

  const renderFiles = () => {
    if (isLoaded) {
      return id.fileInfos.map((file, index) => (
        <Files key={index} fileId={index} value={id.fileInfos[index]} />
      ));
    }
  };

  const renderFields = () => {
    if (isLoaded && "mergeFieldsInfo" in id) {
      return id.mergeFieldsInfo.map((merge, index) => (
        <Fields key={index} fieldId={index} value={id.mergeFieldsInfo[index]} />
      ));
    }
  };

  const renderPassword = () => {
    if (isLoaded && id.passwordInfo.visible) {
      return <Password value={id.passwordInfo} />;
    }
  };

  const renderDeadline = () => {
    if (isLoaded && "expirationInfo" in id) {
      return <Deadline value={id.expirationInfo} />;
    }
  };

  const renderReminders = () => {
    if (isLoaded) {
      return <Reminders />;
    }
  };

  return (
    <div>
      <form id="form-bottom">
        <h3 id="workflow-description">{id.description}</h3>
        {/* Might want to refractor this to top form */}
        {renderRecipients()}
        {/* {renderCCs()} */}
        {/* Refractor to bottom form */}
        {length && <DocumentName />}
        {length && <Messages />}
        {/* // {renderFiles()}
        // {renderFields()}
        // {renderPassword()}
        // {renderDeadline()}
        // {renderReminders()} } */}
        {isLoaded && <button type="button">Submit</button>}
      </form>
    </div>
  );
}

export default WorkflowForm;

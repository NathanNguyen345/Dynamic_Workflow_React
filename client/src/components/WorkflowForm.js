import React from "react";
import Recipients from "./Recipients";
import Cc from "./Cc";
import DocumentName from "./DocumentName";
import Messages from "./Messages";
import Files from "./Files";
import Fields from "./Fields";
import Password from "./Password";
import Deadline from "./Deadline";
import Reminders from "./Reminders";

function WorkflowForm({ id, loaded }) {
  const isLoaded = loaded;
  const length = Object.keys(id).length > 0;

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
    if (length && "ccsListInfo" in id) {
      return id.ccsListInfo.map((recipient, index) => (
        <Cc key={index} ccId={index} value={id.ccsListInfo[index]}></Cc>
      ));
    }
  };

  const renderFiles = () => {
    if (length) {
      return id.fileInfos.map((file, index) => (
        <Files key={index} fileId={index} value={id.fileInfos[index]} />
      ));
    }
  };

  const renderFields = () => {
    if (length && "mergeFieldsInfo" in id) {
      return id.mergeFieldsInfo.map((merge, index) => (
        <Fields key={index} fieldId={index} value={id.mergeFieldsInfo[index]} />
      ));
    }
  };

  const renderPassword = () => {
    if (length && id.passwordInfo.visible) {
      return <Password value={id.passwordInfo} />;
    }
  };

  const renderDeadline = () => {
    if (length && "expirationInfo" in id) {
      return <Deadline value={id.expirationInfo} />;
    }
  };

  const renderReminders = () => {
    if (length) {
      return <Reminders />;
    }
  };

  return (
    <div>
      <form id="form-bottom">
        <h3 id="workflow-description">{id.description}</h3>
        {/* Might want to refractor this to top form */}
        {renderRecipients()}
        {renderCCs()}
        {/* Refractor to bottom form */}
        {length && <DocumentName />}
        {length && <Messages />}
        {renderFiles()}
        {renderFields()}
        {renderPassword()}
        {renderDeadline()}
        {renderReminders()}
        {isLoaded && <button type="button">Submit</button>}
      </form>
    </div>
  );
}

export default WorkflowForm;

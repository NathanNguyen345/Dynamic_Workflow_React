import React from "react";
import Recipients from "../Recipient/Recipients";
import Cc from "../Cc/Cc";
import DocumentName from "../DocumentName/DocumentName";
import Messages from "../Message/Messages";
import Files from "../Files/Files";
import Fields from "../Fields/Fields";
import Password from "../Password/Password";
import Deadline from "../Deadline/Deadline";
import Reminders from "../Reminders/Reminders";

function WorkflowForm({ id, loaded }) {
  const isLoaded = loaded;
  const visible = Object.keys(id).length > 0;

  return (
    <div>
      <form id="form-bottom">
        <h3 id="workflow-description">{id.description}</h3>
        {visible &&
          id.recipientsListInfo.map((recipient, index) => (
            <Recipients
              key={index}
              recipientsId={index}
              value={id.recipientsListInfo[index]}
            />
          ))}
        {visible &&
          "ccsListInfo" in id &&
          id.ccsListInfo.map((recipient, index) => (
            <Cc key={index} ccId={index} value={id.ccsListInfo[index]} />
          ))}
        {visible && <DocumentName />}
        {visible && <Messages />}
        {visible &&
          id.fileInfos.map((file, index) => (
            <Files key={index} fileId={index} value={id.fileInfos[index]} />
          ))}
        {visible &&
          "mergeFieldsInfo" in id &&
          id.mergeFieldsInfo.map((merge, index) => (
            <Fields
              key={index}
              fieldId={index}
              value={id.mergeFieldsInfo[index]}
            />
          ))}
        {visible && id.passwordInfo.visible && (
          <Password value={id.passwordInfo} />
        )}
        {visible && "expirationInfo" in id && (
          <Deadline value={id.expirationInfo} />
        )}
        {visible && <Reminders />}
        {isLoaded && <button type="button">Submit</button>}
      </form>
    </div>
  );
}

export default WorkflowForm;

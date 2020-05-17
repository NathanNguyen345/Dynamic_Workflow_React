import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipients from "./recipients/Recipients";
import Cc from "./recipients/Cc";
import DocumentName from "./information/agreement/DocumentName";
import Messages from "./information/agreement/Messages";
import Files from "./information/agreement/Files";
import Fields from "./information/agreement/Fields";

function WorkflowForm({ id, click }) {
  const [workflowById, setWorkflowById] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
          <Cc key={index} value={workflowById.ccsListInfo[index]}></Cc>
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
        <Files key={index} value={workflowById.fileInfos[index]} />
      ));
    }
  };

  const renderFields = () => {
    if (isLoaded && "mergeFieldsInfo" in workflowById) {
      return workflowById.mergeFieldsInfo.map((merge, index) => (
        <Fields key={index} value={workflowById.mergeFieldsInfo[index]} />
      ));
    }
  };

  return (
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
        {isLoaded && <button type="button">Submit</button>}
      </form>
    </div>
  );
}

export default WorkflowForm;

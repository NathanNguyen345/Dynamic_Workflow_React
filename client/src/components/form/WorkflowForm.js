import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipients from "./recipients/Recipients";
import Cc from "./recipients/Cc";

function WorkflowForm({ id, click }) {
  const [workflowById, setWorkflowById] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Call Express route to retreive workflow by ID
  // Need to use callback or memo to reduce rendering
  useEffect(() => {
    axios
      .get(`/api/getWorkflows/${id}`)
      .then((response) => {
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
        ></Recipients>
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

  return (
    <div>
      <form>
        <h3 id="workflow-description">{workflowById.description}</h3>
        {renderRecipients()}
        {renderCCs()}
      </form>
    </div>
  );
}

export default WorkflowForm;

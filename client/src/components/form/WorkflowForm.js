import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipients from "./recipients/Recipients";
import Cc from "./recipients/Cc";

function WorkflowForm(props) {
  const [workflowById, setWorkflowById] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Call Express route to retreive workflow by ID
  useEffect(() => {
    axios
      .get(`/api/getWorkflows/${props.id}`)
      .then((response) => {
        console.log(response.data);
        setWorkflowById(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <form>
        <h3 id="workflow-description">{workflowById.description}</h3>
        {isLoaded &&
          workflowById.recipientsListInfo.map((recipient, index) => (
            <Recipients
              key={index}
              value={workflowById.recipientsListInfo[index]}
            ></Recipients>
          ))}

        {isLoaded &&
          workflowById.ccsListInfo.map((recipient, index) => (
            <Cc key={index} value={workflowById.ccsListInfo[index]}></Cc>
          ))}
      </form>
    </div>
  );
}

export default WorkflowForm;

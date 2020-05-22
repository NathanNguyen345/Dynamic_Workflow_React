import React, { useRef, useContext } from "react";
import axios from "axios";
import { JsonConext } from "../WorkflowSelector/WorkflowSelector";

function Files({ value, fileId }) {
  const targetRef = useRef(null);
  const jsonContext = useContext(JsonConext);
  const reduceState = jsonContext.jsonState["fileInfos"][fileId];

  // Handle document change change
  const handleDocumentChange = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);

    await axios
      .post("/api/postTransient", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const formData = {
            name: reduceState.name,
            transientDocumentId: response.data,
          };
          jsonContext.jsonDispatch({
            type: "fileInfos",
            value: formData,
            id: fileId,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkForLibraryDocument = () => {
    if ("workflowLibraryDocumentSelectorList" in value) {
      return <h4>{value.workflowLibraryDocumentSelectorList[0].label}</h4>;
    } else {
      return (
        <input
          type="file"
          ref={targetRef}
          onChange={handleDocumentChange}
        ></input>
      );
    }
  };

  return (
    <div>
      <h3>{value.label}</h3>
      {checkForLibraryDocument()}
    </div>
  );
}

export default Files;

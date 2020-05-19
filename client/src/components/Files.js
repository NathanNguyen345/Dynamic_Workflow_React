import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { JsonConext } from "./WorkflowForm";

function Files({ value, fileId }) {
  const targetRef = useRef(null);
  const jsonContext = useContext(JsonConext);

  useEffect(() => {
    if ("workflowLibraryDocumentSelectorList" in value) {
      jsonContext.jsonDispatch({
        type: "fileInfos",
        value: {
          label: value.label,
          libraryDocumentId:
            value.workflowLibraryDocumentSelectorList[0].workflowLibDoc,
        },
        id: fileId,
      });
    }
  }, []);

  // Need to test for file clearing
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
          jsonContext.jsonDispatch({
            type: "fileInfos",
            value: { label: value.label, transientDocumentId: response.data },
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
      jsonContext.jsonDispatch({
        type: "fileInfos",
        value: {
          label: value.label,
          libraryDocumentId:
            value.workflowLibraryDocumentSelectorList[0].workflowLibDoc,
        },
        id: fileId,
      });
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

import React, { useContext } from "react";
import Recipients from "../InputForm/Recipients";
import Cc from "../InputForm/Cc";
import DocumentName from "../InputForm/DocumentName";
import Messages from "../InputForm/Messages";
import Files from "../InputForm/Files";
import Fields from "../InputForm/Fields";
import Password from "../InputForm/Password";
import Deadline from "../InputForm/Deadline";
import Reminders from "../InputForm/Reminders";
import classes from "./WorkflowForm.module.css";
import { JsonConext } from "../WorkflowSelector/WorkflowSelector";
import axios from "axios";

function WorkflowForm({ id, agreementId }) {
  const visible = Object.keys(id).length > 0;
  const jsonConext = useContext(JsonConext);

  const submitFormHandle = () => {
    axios
      .post(`/api/postAgreement/${agreementId}`, jsonConext.jsonState)
      .then((response) => {
        alert(response.data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.data);
        window.location.reload();
      });
  };

  return (
    <div className={classes.form_bottom}>
      <div className={classes.form_bottom_wrapper}>
        <form className={classes.user_input_form}>
          <h3 id="workflow-description">{id.description}</h3>
          {/* Render Recipient */}
          {visible &&
            id.recipientsListInfo.map((recipient, index) => (
              <Recipients
                key={index}
                recipientsId={index}
                value={id.recipientsListInfo[index]}
              />
            ))}
          {/* Render CCs */}
          {visible &&
            "ccsListInfo" in id &&
            id.ccsListInfo.map((recipient, index) => (
              <Cc key={index} ccId={index} value={id.ccsListInfo[index]} />
            ))}
          <div className={`row ${classes.bottom_row}`}>
            <div className="col-lg-7">
              {/* Render Document Name */}
              {visible && <DocumentName />}
              {/* Render Messages */}
              {visible && <Messages />}
              {/* Render File Infos */}
              {visible &&
                id.fileInfos.map((file, index) => (
                  <Files
                    key={index}
                    fileId={index}
                    value={id.fileInfos[index]}
                  />
                ))}
              {/* Render Merge Fields */}
              {visible &&
                "mergeFieldsInfo" in id &&
                id.mergeFieldsInfo.map((merge, index) => (
                  <Fields
                    key={index}
                    fieldId={index}
                    value={id.mergeFieldsInfo[index]}
                  />
                ))}
            </div>

            <div className="col-lg-5">
              <div className={classes.option_wrapper}>
                {/* Render Passwords */}
                {visible && id.passwordInfo.visible && (
                  <Password value={id.passwordInfo} />
                )}
                {/* Render Expiration */}
                {visible && "expirationInfo" in id && (
                  <Deadline value={id.expirationInfo} />
                )}
                {/* Render Reminders */}
                {visible && <Reminders />}
              </div>
            </div>
          </div>
          {visible && (
            <button
              className={`btn btn-primary btn-custom ${classes.button}`}
              type="button"
              onClick={submitFormHandle}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default WorkflowForm;

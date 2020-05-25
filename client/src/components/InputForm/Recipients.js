import React, { useEffect, useRef, useContext } from "react";
import { JsonConext } from "../WorkflowSelector/WorkflowSelector";
import classes from "./InputForm.module.css";

// Check renders, being rendered twice

function Recipients({ value, recipientsId }) {
  const emailRef = useRef(null);
  const jsonContext = useContext(JsonConext);
  const reduceState = jsonContext.jsonState["recipientsListInfo"][recipientsId];

  // On mount assign all values to recipients
  useEffect(() => {
    if (reduceState != null) {
      emailRef.current.defaultValue = reduceState.recipients[0].email;
    }
  }, [reduceState]);

  // Handle email change and dispatch to reducer
  const handleEmailChange = (e) => {
    const email = {
      email: e.target.value,
    };

    const userInfo = {
      name: reduceState.name,
      recipients: [email],
    };

    jsonContext.jsonDispatch({
      type: "recipientsListInfo",
      value: userInfo,
      id: recipientsId,
    });
  };

  return (
    <div>
      <h3>{value.label}</h3>
      <input
        type="text"
        className={classes.user_input}
        ref={emailRef}
        onChange={handleEmailChange}
        placeholder="Enter Recipient's Email"
      ></input>
    </div>
  );
}

export default Recipients;

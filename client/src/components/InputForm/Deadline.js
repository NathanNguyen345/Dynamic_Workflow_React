import React, { useState, useContext, useRef, useEffect } from "react";
import { JsonConext, ResetContext } from "../WorkflowSelector/WorkflowSelector";
import classes from "./InputForm.module.css";

function Deadline({ value }) {
  const [required, setRequired] = useState(!value.visible);
  const jsonContext = useContext(JsonConext);
  const resetReducer = useContext(ResetContext);
  const checkboxRef = useRef(null);

  useEffect(() => {
    setRequired(!value.visible);
    checkboxRef.current.checked = false;
  }, [resetReducer.resetState]);

  // Toggle deadline view
  const toggleView = () => {
    if (required) {
      return (
        <div>
          <input
            type="date"
            className={classes.user_input}
            min={dateLimit(0)}
            max={dateLimit(90)}
            onChange={handleDateChange}
          ></input>
        </div>
      );
    }
  };

  const dateLimit = (range) => {
    const date = new Date();
    date.setDate(date.getDate() + range);
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    if (mm < 9) {
      mm = `0${mm}`;
    }

    if (dd < 9) {
      dd = `0${dd}`;
    }

    return `${yyyy}-${mm}-${dd}`;
  };

  const handleDateChange = (e) => {
    jsonContext.jsonDispatch({
      type: "daysUntilSigningDeadline",
      value: dateDifference(e.target.value),
    });
  };

  const dateDifference = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const diffTime = Math.abs(selectedDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle checkbox changes
  const checkboxHandler = (e) => {
    setRequired(!required);
  };

  return (
    <React.Fragment>
      <input
        type="checkbox"
        onChange={checkboxHandler}
        ref={checkboxRef}
      ></input>
      <label className={classes.option_label}>Completion Deadline</label>
      {toggleView()}
    </React.Fragment>
  );
}

export default Deadline;

import React, { useState, useContext, useEffect, useRef } from "react";
import { ResetContext } from "../WorkflowSelector/WorkflowSelector";
import classes from "./InputForm.module.css";

function Reminders() {
  const [required, setRequired] = useState(false);
  const resetReducer = useContext(ResetContext);
  const checkboxRef = useRef(null);

  useEffect(() => {
    setRequired(false);
    checkboxRef.current.checked = false;
  }, [resetReducer.resetState]);

  // Toggle deadline view
  const toggleView = () => {
    if (required) {
      return (
        <div>
          <select className={classes.user_input}>
            <option value="DAILY_UNTIL_SIGNED">Every Day</option>
            <option value="WEEKLY_UNTIL_SIGNED">Every Week</option>
            <option value="WEEKDAILY_UNTIL_SIGNED">Every Business Day</option>
            <option value="EVERY_OTHER_DAY_UNTIL_SIGNED">
              Every Other Day
            </option>
            <option value="EVERY_THIRD_DAY_UNTIL_SIGNED">
              Every Third Day
            </option>
            <option value="EVERY_FIFTH_DAY_UNTIL_SIGNED">
              Every Fifth Day
            </option>
          </select>
        </div>
      );
    }
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
      <label className={classes.option_label}>Set Reminders</label>
      {toggleView()}
    </React.Fragment>
  );
}

export default Reminders;

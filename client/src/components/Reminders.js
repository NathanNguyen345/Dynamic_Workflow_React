import React, { useState } from "react";

function Reminders() {
  const [required, setRequired] = useState(false);

  // Toggle deadline view
  const toggleView = () => {
    if (required) {
      return (
        <div>
          <select>
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
    <div>
      <input type="checkbox" onChange={checkboxHandler}></input>
      <label>Set Reminders</label>
      {toggleView()}
    </div>
  );
}

export default Reminders;

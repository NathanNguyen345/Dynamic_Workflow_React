import React, { useEffect, useState } from "react";
import "./App.css";
import WorkflowSelector from "./components/WorkflowSelector";
import axios from "axios";

function App() {
  const [workflows, setWorkflows] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    axios
      .get("/api/getWorkflows")
      .then((response) => {
        setWorkflows(response.data["userWorkflowList"]);
        setIsLogged(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App container h-100">
      {isLogged && <WorkflowSelector workflows={workflows} />}
    </div>
  );
}

export default App;

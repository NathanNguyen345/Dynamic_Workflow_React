const express = require("express");
const app = express();

const axios = require("axios");

// File System & Path
const fs = require("fs");
const path = require("path");

// FormData, Multer, & Uploads
const FormData = require("form-data");
const fileUpload = require("express-fileupload");

// Body-Parser
const bodyParser = require("body-parser");

// YAML & Configuration
const yaml = require("js-yaml");
const config = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, "config", "config.yaml"), "utf-8")
);

// Configuration
var integration = config["enterprise"]["integration"];
var host = config["server"]["host"];
var endpoint = config["server"]["endpoint"];
var url = host + endpoint;
// var port = process.env.PORT || config.port || 80;
var headers = {
  "Access-Token": integration,
};

app.use(fileUpload());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// GET /workflows
app.get("/api/getWorkflows", (req, res) => {
  const path = url + "/workflows";
  axios
    .get(path, { headers: headers })
    .then((response) => res.status(200).send(response.data))
    .catch((error) => console.log(error));
});

// GET /workflows/{workflowsId}
app.get("/api/getWorkflows/:id", (req, res) => {
  const path = url + "/workflows/" + req.params.id;
  axios
    .get(path, { headers: headers })
    .then((response) => res.status(200).send(response.data))
    .catch((error) => console.log(error));
});

// GET /libraryDocuments/{libraryDocumentId}/documents
app.get("/api/getLibraryDocuments/:id", (req, res) => {
  const path = url + "/libraryDocuments/" + req.params.id + "/documents";
  axios
    .get(path, { headers: headers })
    .then((response) => res.status(200).send(response.data))
    .catch((error) => console.log(error));
});

// Need to double check once containers are built
// POST /workflows/{workflowId}/agreements
app.post("/api/postAgreement/:id", (req, res) => {
  const path = url + "/workflows/" + req.params.id + "/agreements";

  const jsonData = {
    documentCreationInfo: req.body,
  };

  axios
    .post(path, jsonData, {
      headers: headers,
    })
    .then((response) => {
      res.status(200).send("Agreement Sent");
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
});

// POST /transientDocuments
app.post("/api/postTransient", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // Create Form data for API POST
  const path = url + "/transientDocuments";
  const file = req.files.file;
  const form = new FormData();
  form.append("File-Name", file.name);
  form.append("Mime-Type", file.mimetype);
  form.append("File", file.data);

  // Call POST to Adobe Sign
  axios({
    method: "post",
    url: path,
    headers: {
      "Access-Token": integration,
      "content-type": `multipart/form-data; boundary=${form._boundary}`,
    },
    data: form,
  })
    .then((response) => res.status(200).send(response.data.transientDocumentId))
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

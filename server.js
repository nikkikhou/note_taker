const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);
// call express to object
const app = express();
// set port
const PORT = 3001;

// first middleware
app.use(express.static("public"));

// root route
app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

// api routes
app.get("/api/notes", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
//   res.send("notes");
});

// server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

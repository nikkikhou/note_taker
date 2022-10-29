const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require('uuid');

// call express to object
const app = express();
// set port
const PORT = 3001;

// first middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// root route
app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

// html pages notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// api routes
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  const { text, title } = req.body;
  readFromFile("./db/db.json").then((data) => {
    let db = JSON.parse(data);
    db.push({ id: uuidv4(), text, title });
    console.log(db);
    writeToFile("./db/db.json", db);
    res.json(db)
  });
});

// server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

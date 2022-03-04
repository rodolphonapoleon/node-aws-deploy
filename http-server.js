const express = require("express");
const cors = require("cors");
const app = express();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

app.use(cors());

const adapter = new FileSync("db.json");
const db = low(adapter);

// data Parser - used to parse post data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set some defaults
db.defaults({ users: [] }).write();

// Serve static files from public directory
app.use(express.static("public"));

//Return all users
app.get("/data", (req, res) => {
  res.send(db.get("users").value());
});

app.post("/test", (req, res) => {
  console.log(req.body.username, req.body.password);
  res.send(req.body.username + " " + req.body.password);
});

app.post("/add", (req, res) => {
  const user = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    streetaddress: req.body.streetaddress,
    citystatezip: req.body.citystatezip,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    avatar: req.body.avatar,
  };
  db.get("users").push(user).write();
  console.log(db.get("users").value());
  res.send(db.get("users").value());
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});


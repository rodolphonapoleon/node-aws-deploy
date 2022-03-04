const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("HELLO WORD");
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

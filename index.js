const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/formats", (req, res) => {
  res.set("Content-Type", "application/json");
  return res.send({ formats: [] });
});

app.post("/formats", (req, res) => {
  console.log(req.body);
  return res.send("OK");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

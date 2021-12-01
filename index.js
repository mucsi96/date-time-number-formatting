const express = require("express");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

function readDB() {
  let data;
  try {
    data = JSON.parse(readFileSync(join(__dirname, "db.json"), "utf8"));
  } catch {}

  return data ?? {};
}

function writeDB(data) {
  writeFileSync(
    join(__dirname, "db.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

app.get("/formats", (req, res) => {
  const db = readDB();
  res.set("Content-Type", "application/json");
  return res.send(db);
});

app.post("/formats", (req, res) => {
  const db = readDB();

  if (!req.body.platform || !req.body.formats) {
    return res.status(400).send();
  }

  db[req.body.platform] = req.body.formats;

  writeDB(db);
  return res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

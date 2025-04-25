// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "filmek"
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM filmek", (err, results) => {
    if (err) return res.json({ error: err });
    return res.json(results);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
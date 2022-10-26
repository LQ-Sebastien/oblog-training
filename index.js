require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./app/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listen on ${port} | Address: http://localhost:${port}`);
})
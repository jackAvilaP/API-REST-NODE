const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

connection();

//create server Node for express
const app = express();
const PORT = 3900;
// configure cors
app.use(cors());

//convert body -> object Js all querys
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Create router
const router_article = require("./routers/articles");

//upload router
app.use("/api", router_article);

//creates routes example
app.get("/probando", (req, res) => {
  console.log("Se ejecuto endopoint probando");

  return res.status(200).json({
    curso: "master React",
    url: "react.com",
  });
});

//create server and listen query http
app.listen(PORT, () => {
  console.log("server run in port ", +PORT);
});

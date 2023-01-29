const express = require("express");
const bodyparser = require("body-parser");

const serverless = require("serverless-http");
const exphbs = require("express-handlebars");
const app = express();

require("dotenv").config();

module.exports.handler = serverless(app);
const port = process.env.port || 5000;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.static("public"));

const handlebars = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

const routes = require("./server/routes/svt");

app.use("/.netlify/functions/api", routes);
// app.listen(port, () => {
//   console.log("lisining" + port);
// });

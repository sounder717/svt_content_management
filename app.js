const express = require("express");
const bodyparser = require("body-parser");

const exphbs = require("express-handlebars");
const app = express();
let cors = require("cors");

require("dotenv").config();

const port = process.env.port || 5000;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.static("public"));
app.use(cors());
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

const routes = require("./server/routes/svt");

app.use("/", routes);
app.listen(port, () => {
  console.log("lisining" + port);
});

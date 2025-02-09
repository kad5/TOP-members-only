require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const router = require("./backend/routes/router");
const errorHandler = require("./backend/middleware/errorHandler");
const { passport } = require("./backend/middleware/auth");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "backend/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "frontend")));

app.use("/", router);
app.use((req, res) => res.render("404"));
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}!`)
);

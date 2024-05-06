// app.js

const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("./config/passport.js");

// Routes
const authRoutes = require("./routes/authRoutes.js");
const otherRoutes = require("./routes/otherRoutes.js");

// App
const app = express();

// Load environment variables
dotenv.config();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes Usage
app.use("/auth", authRoutes);
app.use(otherRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening or port ${port}`);
});

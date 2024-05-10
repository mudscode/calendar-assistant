// otherRoutes.js

const router = require("express").Router();
const { userCommandToAnalyze } = require("../config/nluAnalysis");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

router.post("/analyse-text", isAuthenticated, async (req, res) => {
  console.log("Received POST request at /analyse-text");

  try {
    const { text } = req.body;

    console.log(text);

    const analyzedText = await userCommandToAnalyze(text);
    console.log(analyzedText);

    res.status(200).send("Recieved the text data.");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", isAuthenticated, (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;

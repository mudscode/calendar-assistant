// otherRoutes.js

const router = require("express").Router();
const { userCommandToAnalyze } = require("../config/nluAnalysis");
const { createEvent } = require("../config/googleCalendar");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

router.post("/analyse-text", isAuthenticated, async (req, res) => {
  console.log("Received POST request at /analyse-text");

  const accessToken = req.user.accessToken;
  console.log(accessToken);

  try {
    const { text } = req.body;

    const analyzedText = await userCommandToAnalyze(text);
    console.log(analyzedText);

    const eventDetails = analyzedText.eventDetails;
    const operation = analyzedText.operation;

    if (operation === "create") {
      await createEvent(accessToken, eventDetails, res);
    } else if (operation === "delete") {
    }

    // res.status(200).send("Recieved the text data.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error processing the request");
  }
});

router.get("/", isAuthenticated, (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;

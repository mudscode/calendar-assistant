const { google } = require("googleapis");

const createEvent = async (accessToken, eventDetails, res) => {

  const calendar = google.calendar({
    version: "v3",
    auth: accessToken,
  });

  try {
    const create = await calendar.events.insert({
      calendarId: "primary",
      resource: eventDetails,
    });

    console.log("Event Created", create.data);
    res.send("Event created successfully.");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Erorr creating event.");
  }
};

module.exports = { createEvent };

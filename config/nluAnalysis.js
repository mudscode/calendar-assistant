const OpenAi = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

const userCommandToAnalyze = async (text) =>  {
  let context = `Analyse the text and provide details in a format suitable for the Google Calendar API. Specify whether it's creating, deleting, or updating an event. Then, convert those details to a valid JSON object in this specific format:
    {
      "summary": "Meeting with John",
      "location": "Conference Room A",
      "description": "Discuss project milestones",
      "start": {
        "dateTime": "2024-05-10T10:00:00",
        "timeZone": "Pakistan/Islamabad"
      },
      "end": {
        "dateTime": "2024-05-10T11:00:00",
        "timeZone": "Pakistan/Islamabad"
      },
      "attendees": [
        {"email": "john.doe@example.com"},
        {"email": "jane.doe@example.com"}
      ],
      "reminders": {
        "useDefault": true
      },
      "operation": "delete/create/update"
    }
    .
     Stay consistent with your responses. Don't show the special chars like /n, + or others in the json object. Leave the values null if they are not specified in the text.`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You analyse text for NLU and send that back in json.",
        },
        // { role: "user", content: "Set up a meeting for 10 O' clock today."},
        {
          role: "user",
          content: text + " " + context,
        },
      ],
      // "type": "json-object",
    });

    const response = completion.choices[0].message;
    return response;
  } catch (error) {
    console.log("Error:", error);
  }
}

// chat();

module.exports = { userCommandToAnalyze };

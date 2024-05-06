const btn = document.getElementById("btn");
const transcript = document.getElementById("transcript");

btn.addEventListener("click", async () => {
  try {
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new recognition();

    // recognitionInstance.lang = "ur-PK";
    recognitionInstance.lang = "en-US";

    // recognitionInstance.continuous = true;

    // recognitionInstance.interimResults = true;

    recognitionInstance.onresult = (event) => {
      const text = event.results[0][0].transcript;
      transcript.innerText = text;

      console.log("Recognized text:", text);
      // Replace with your logic to display text on the calendar or send for NLP
      recognitionInstance.onerror = (error) => {
        console.error("Speech Recognition Error:", error);
        // You can display user-friendly error message here
        transcript.innerText = "Speech recognition error. Please try again.";
      };
    };

    recognitionInstance.onspeechend = () => {
      console.log("Speech Recognition ended");
      recognitionInstance.stop();
    };

    await recognitionInstance.start();
  } catch (error) {
    console.error("Error initializing SpeechRecognition:", error);
    transcript.innerText = "An error occurred. Please refresh and try again.";
  }
});

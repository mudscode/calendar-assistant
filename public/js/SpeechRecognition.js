const btn = document.getElementById("btn");
const transcript = document.getElementById("transcript");
let recognition;

const firstClick = async () => {
  try {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    await recognition.start();

    recognition.lang = "en-US";
    // recognition.lang = "ur-PK"

    // recognition.continuous = true;

    // recongnition.interimResults = true;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      transcript.innerHTML = text;
      console.log("Recognized speech:", text);
    };

    recognition.onspeechend = () => {
      console.log("Speech Recognition ended.");
    };
  } catch (error) {
    console.log(error);
  }
};

const secondClick = () => {
  if (recognition) {
    recognition.stop();
  }
};

btn.addEventListener("click", firstClick);
btn.addEventListener("click", secondClick);

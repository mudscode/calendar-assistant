// SpeechRecognition.js

const btn = document.getElementById("btn");
const transcript = document.getElementById("transcript");
const proceedBtn = document.getElementById("proceedBtn");
const discardBtn = document.getElementById("discardBtn");
const transdiv = document.querySelector(".transdiv");
let recognition;

const firstClick = async () => {
  try {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    // recognition.lang = "ur-PK"
    recognition.lang = "en-US";

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      transcript.innerHTML = text;
      console.log("Recognized speech:", text);

      // Show transcript and buttons
      transdiv.style.display = "block";
    };

    recognition.onend = () => {
      console.log("Speech Recognition ended.");
    };

    await recognition.start();
  } catch (error) {
    console.log(error);
  }
};
// const secondClick = () => {
//   if (recognition) {
//     recognition.stop();
//   }
// };

btn.addEventListener("click", firstClick);

proceedBtn.addEventListener("click", () => {
  const text = transcript.innerText.trim();

  if (text) {
    fetch("http://localhost:8080/analyse-text", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Requrest unsuccessful: ", response.status);
        }
      })
      .then((data) => {
        console.log("Response: ", data);
        console.log("Data sent successfully.");
      })
      .catch((error) => {
        console.log(error);
      });

    transdiv.style.display = "none";
    transcript.innerHTML = "";
  }
});

discardBtn.addEventListener("click", () => {
  transcript.innerHTML = "";
  transdiv.style.display = "none";
});

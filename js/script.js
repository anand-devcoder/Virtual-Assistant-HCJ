let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice")
// Speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN";  // You can change to "hi-IN" for Hindi
    window.speechSynthesis.speak(text_speak);
}
// Wish user based on time
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}
window.addEventListener('load', () => {
    wishMe();
})
// Initialize Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
    console.log("Result:", transcript);
}
recognition.onend = () => {
    btn.style.display = "flex";
    voice.style.display = "none";
    console.log("Recognition ended.");
}
recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    btn.style.display = "flex";
    voice.style.display = "none";
    speak("Sorry, I didn't catch that. Please try again.");
}
// Start listening
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
})
// Voice Commands
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none"
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, What can I help you with?");
    }
    else if (message.includes("who are you") || message.includes("hu r u")) {
        speak("I am your virtual assistant, created by Anand Sir.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    }
    else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    }
    else if (message.includes("open chatgpt")) {
        speak("Opening ChatGPT...");
        window.open("https://chatgpt.com/", "_blank");
    }
    else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    }
    else{
        speak(`this is what i found on internet regarding ${message}`)
        window.open(`https://www.google.com/search?q=${message}`,"_blank")
    }
}
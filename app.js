const speechRecognitionService = window.SpeechRecognitionService || window.webkitSpeechRecognition;
const recognitionService = new speechRecognitionService();

const startBtn = document.querySelector(".btn-start");
const textLog = document.querySelector(".text-log");

const languages = {
    English: "en-US",
    Romanian: "ro-RO"
};

startBtn.addEventListener("click", () => {
    recognitionService.lang = determineLanguage();
    recognitionService.continuous = true;

    startBtn.classList.add("btn-pulsating");

    if (startBtn.classList.contains("btn-pulsating")) {
        stopRecording();
    }
    else {
        startRecording();
    }
});

function determineLanguage() {
    const selected = document.querySelector("#language").value;
    switch (selected) {
        case "English":
            return languages.English;
        case "Romanian":
            return languages.Romanian;
        default:
            throw new Error("Language not supported > " + selected);
    }
}

function handleResult(event) {
    const results = [];
    for (const result of event.results) {
        results.push(`${result[0].transcript}`);
    }
    textLog.innerHTML += ressults.at(-1);
}

function stopRecording() {
    recognitionService.stop();
    startBtn.classList.remove("btn-pulsating");
    textLog.innerHTML += "<br />";
}

function startRecording() {
    recognitionService.onresult = handleResult;
    recognitionService.start();
}
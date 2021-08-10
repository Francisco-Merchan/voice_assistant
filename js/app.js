const msg = new SpeechSynthesisUtterance();
const voicesOptions = document.querySelector(`[name="voice"]`);
const options = document.querySelectorAll(`[type="range"], [name="text]`);
const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
let voices = [];

function populatevoices() {
  voices = this.getVoices();
  voicesOptions.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`
    )
    .join(" ");
}

function setVoice() {
  msg.voice = voices.find((voice) => this.value === voice.name);
  playVoice();
}

function playVoice(start = true) {
  msg.text = document.querySelector(`[name = "text"]`).value;
  speechSynthesis.cancel();
  if (start) {
    speechSynthesis.speak(msg);
  }
}

function changeOptions() {
  msg[this.name] = this.value;
  playVoice();
}

speechSynthesis.addEventListener("voiceschanged", populatevoices);
voicesOptions.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", changeOptions));
play.addEventListener("click", playVoice);
stop.addEventListener("click", () => playVoice(false));

// script.js - (Updated to properly hide the closed letter area)

const openLetterBtn = document.getElementById("open-letter-btn");
const closedLetterDiv = document.getElementById("closed-letter");
const letterContentDiv = document.getElementById("letter-content");
const chiquititaAudio = document.getElementById("chiquitita-audio");
const giftCardBtn = document.getElementById("gift-card-btn");
const giftCardArea = document.getElementById("gift-card-area");
const volumeSlider = document.getElementById("volume-slider");

// --- 1. Opening the Letter and Fading in the Song ---
openLetterBtn.addEventListener("click", () => {
  // *** FIX 1: Add a class to hide the closed letter div completely ***
  closedLetterDiv.classList.add("hide-closed");

  // Wait for the transition to finish before setting display: none
  setTimeout(() => {
    closedLetterDiv.style.display = "none";
  }, 500); // Matches CSS transition time

  chiquititaAudio.volume = 0;
  chiquititaAudio
    .play()
    .then(() => {
      let volumeInterval = setInterval(() => {
        if (chiquititaAudio.volume < parseFloat(volumeSlider.value)) {
          chiquititaAudio.volume += 0.02;
        } else {
          chiquititaAudio.volume = parseFloat(volumeSlider.value);
          clearInterval(volumeInterval);
        }
      }, 200);
    })
    .catch((error) => {
      console.error("Audio playback failed:", error);
    });

  // Since the letter content is initially hidden with display: none in CSS,
  // we first remove the 'scroll-hidden' class to allow the content to fade in.
  // The 'scroll-visible' class applies the final visible styles.
  letterContentDiv.classList.remove("scroll-hidden");
  letterContentDiv.classList.add("scroll-visible");

  // Small timeout is no longer needed since we manage visibility via class names
  // and CSS transitions, but I'll leave the display change in place in case
  // there are other issues.
});

// --- Volume Slider Event Listener ---
volumeSlider.addEventListener("input", () => {
  chiquititaAudio.volume = volumeSlider.value;
});

// --- 2. Revealing the Gift Card Area ---
if (giftCardBtn && giftCardArea) {
  giftCardBtn.addEventListener("click", () => {
    giftCardArea.classList.remove("content-hidden");
    giftCardArea.classList.add("content-visible");
    giftCardBtn.disabled = true;
    giftCardBtn.textContent = "Gift Revealed!";

    // Optional: Hide the "There's one more thing..." heading
    const revealHeading = document.querySelector("#gift-reveal-container h3");
    if (revealHeading) {
      revealHeading.style.display = "none";
    }
  });
}

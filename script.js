document.addEventListener("DOMContentLoaded", () => {
  const heartBtn = document.getElementById("heartBtn");
  const envelope = document.getElementById("envelope");
  const bgMusic = document.getElementById("bgMusic");
  const notesContainer = document.getElementById("notesContainer");

  // Customize your love notes here!
  const loveMessages = [
    "Happy 3 Months! ❤️",
    "I love you!",
    "You're my everything",
    "the best thing that happened to ",
    "Forever & Always",
    "My heart is yours",
    "Cutie pie",
    "Best 3 months ever!",
    "You make me smile",
    "Home is wherever you are",
    "Still falling for you",
  ];

  // Paper tones: cream, blush, kraft, peach, soft white
  const paperColors = ["#fbf1e0", "#f8d7d0", "#e0bd93", "#f6cfb0", "#fffaf2"];

  let running = false;

  function openCard() {
    envelope.classList.add("open");
    heartBtn.setAttribute("aria-label", "Card opened");

    // Browsers allow audio after a user click
    bgMusic.play().catch((error) => {
      console.log("Audio couldn't play. Ensure the path is correct.", error);
    });

    // Let the cover swing open first
    setTimeout(generateNotes, 700);
  }

  function onActivate() {
    if (!envelope.classList.contains("open")) {
      openCard();
    } else if (!running) {
      generateNotes(); // tap again for another shower of notes
    }
  }

  heartBtn.addEventListener("click", onActivate);
  heartBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  });

  function generateNotes() {
    if (running) return;
    running = true;
    let noteCount = 0;

    const noteInterval = setInterval(() => {
      if (noteCount >= 30) {
        clearInterval(noteInterval);
        running = false;
        return;
      }

      const note = document.createElement("div");
      note.classList.add("note");
      note.innerText =
        loveMessages[Math.floor(Math.random() * loveMessages.length)];
      note.style.backgroundColor =
        paperColors[Math.floor(Math.random() * paperColors.length)];
      note.style.left = `${Math.random() * 55 + 8}%`;

      const duration = Math.random() * 2 + 4; // 4-6s
      const rise = window.innerHeight * (0.5 + Math.random() * 0.4);
      const sway = () => `${(Math.random() * 120 - 60).toFixed(0)}px`;

      note.style.animationDuration = `${duration}s`;
      note.style.setProperty("--rise", `${rise}px`);
      note.style.setProperty("--dx1", sway());
      note.style.setProperty("--dx2", sway());
      note.style.setProperty(
        "--rot",
        `${(Math.random() * 40 - 20).toFixed(0)}deg`,
      );

      notesContainer.appendChild(note);
      noteCount++;

      setTimeout(() => note.remove(), duration * 1000);
    }, 350);
  }
});

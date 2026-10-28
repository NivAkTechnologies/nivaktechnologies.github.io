"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector(".about-workflow");
  if (!root) return;

  const steps = Array.from(root.querySelectorAll(".about-workflow__step"));
  const message = document.getElementById("about-workflow-message");
  const percent = document.getElementById("about-workflow-percent");
  const fill = root.querySelector(".about-workflow__fill");
  const track = root.querySelector(".about-workflow__track");

  const stages = [
    { text: "Preparing the development journey.", progress: 0 },
    { text: "Turning ideas into meaningful products.", progress: 25 },
    { text: "Designing clear and intuitive experiences.", progress: 50 },
    { text: "Building dependable digital solutions.", progress: 75 },
    { text: "Preparing products for their launch.", progress: 100 }
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let interval = null;

  function render(index) {
    const stage = stages[index];

    steps.forEach(function (step, i) {
      step.classList.toggle("is-active", index > 0 && i === index - 1);
      step.classList.toggle("is-done", index > 0 && i < index - 1);
    });

    message.textContent = stage.text;
    percent.textContent = stage.progress + "%";
    fill.style.width = stage.progress + "%";
    track.setAttribute("aria-valuenow", String(stage.progress));
  }

  function start() {
    if (interval !== null) clearInterval(interval);
    interval = null;

    if (reduceMotion.matches) {
      render(4);
      return;
    }

    current = 0;
    render(current);

    interval = setInterval(function () {
      current = (current + 1) % stages.length;
      render(current);
    }, 2400);
  }

  reduceMotion.addEventListener("change", start);
  window.addEventListener("pagehide", function () {
    if (interval !== null) clearInterval(interval);
  });

  start();
});

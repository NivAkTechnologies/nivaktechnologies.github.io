"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const panel = document.querySelector(".support-v3-hero-panel");
  if (!panel) return;

  const rows = Array.from(
    panel.querySelectorAll(".support-v3-hero-panel__row")
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let active = 0;
  let interval = null;

  function render(index) {
    rows.forEach(function (row, i) {
      row.classList.toggle("is-active", i === index);
    });
  }

  function start() {
    if (interval !== null) clearInterval(interval);
    interval = null;

    if (reducedMotion.matches) {
      render(0);
      return;
    }

    active = 0;
    render(active);

    interval = setInterval(function () {
      active = (active + 1) % rows.length;
      render(active);
    }, 2300);
  }

  reducedMotion.addEventListener("change", start);

  window.addEventListener("pagehide", function () {
    if (interval !== null) clearInterval(interval);
  });

  start();
});

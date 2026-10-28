"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const number = document.getElementById("offers-discount-value");
  if (!number) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Reduced-motion visitors see the final discount immediately.
  if (reduceMotion.matches) {
    number.textContent = "10";
    return;
  }

  let value = 1;
  number.textContent = String(value);

  const interval = window.setInterval(function () {
    if (value >= 10) {
      window.clearInterval(interval);
      return;
    }

    value += 1;
    number.textContent = String(value);

    if (value === 10) {
      window.clearInterval(interval);
    }
  }, 220);

  window.addEventListener("pagehide", function () {
    window.clearInterval(interval);
  });
});

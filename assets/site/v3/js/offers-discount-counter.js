"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const number = document.getElementById("offers-discount-value");
  if (!number) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finalValue = 10;
  const startingValue = 1;
  const duration = 1980;

  let interval = null;
  let startTime = null;

  function finish() {
    if (interval !== null) {
      window.clearInterval(interval);
      interval = null;
    }

    number.textContent = String(finalValue);
  }

  if (reduceMotion.matches) {
    finish();
    return;
  }

  number.textContent = String(startingValue);

  function tick() {
    if (startTime === null) {
      startTime = Date.now();
    }

    const elapsed = Math.max(0, Date.now() - startTime);
    const steps = Math.floor(elapsed / 220);
    const value = Math.min(finalValue, startingValue + steps);

    number.textContent = String(value);

    if (value >= finalValue) {
      finish();
    }
  }

  startTime = Date.now();
  interval = window.setInterval(tick, 50);

  // Complete the counter when navigation suspends the page,
  // so browser history restoration cannot leave a partial value.
  window.addEventListener("pagehide", finish, { once: true });

  // Recover immediately if the browser restores a cached page.
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      finish();
    }
  });

  // Clicking anywhere does not cancel the animation.
});

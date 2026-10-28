"use strict";

(function () {
  const HOUR_MS = 60 * 60 * 1000;

  function hash(value) {
    let h = 2166136261;

    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }

    return h >>> 0;
  }

  function randomGenerator(seed) {
    let state = seed >>> 0;

    return function () {
      state = (state + 0x6D2B79F5) >>> 0;

      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(items, seed) {
    const result = [...items];
    const random = randomGenerator(seed);

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const phoneIcons = Array.from(
      document.querySelectorAll(".apps-v3-universe__icons img")
    );

    const floatingCards = Array.from(
      document.querySelectorAll(".apps-v3-universe__floating")
    );

    const products = window.NIVAK_PRODUCTS || [];

    if (
      products.length < 8 ||
      phoneIcons.length !== 6 ||
      floatingCards.length !== 0
    ) {
      console.warn("Apps universe rotation: expected elements missing.");
      return;
    }

    let activeHour = null;

    function renderHour() {
      const hour = Math.floor(Date.now() / HOUR_MS);

      if (hour === activeHour) return;

      const ordered = shuffle(
        products,
        hash("NivAk-apps-universe-" + hour)
      );

      // Six unique apps inside the phone.
      const phoneApps = ordered.slice(0, 6);

      phoneApps.forEach((product, index) => {
        const image = phoneIcons[index];
        image.src = product.icon;
        image.alt = product.name;
      });
      activeHour = hour;
    }

    renderHour();

    // Check periodically so an open page updates at the next hour.
    const timer = window.setInterval(renderHour, 30000);

    window.addEventListener("pagehide", function () {
      window.clearInterval(timer);
    });
  });
})();

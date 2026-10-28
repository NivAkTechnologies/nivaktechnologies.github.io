"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header-inner");

  if (!nav || !header) return;

  nav.id = "v3-main-navigation";

  const toggle = document.createElement("button");

  toggle.type = "button";
  toggle.className = "mobile-menu-toggle";
  toggle.setAttribute("aria-label", "Open navigation");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", nav.id);
  toggle.textContent = "☰";

  header.appendChild(toggle);

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.textContent = "☰";
  }

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    toggle.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const desktop = window.matchMedia("(min-width: 761px)");

  desktop.addEventListener("change", function (event) {
    if (event.matches) closeMenu();
  });
});

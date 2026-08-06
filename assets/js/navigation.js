(() => {
  const header = document.querySelector("[data-site-header]");
  const menu = document.querySelector("[data-nav-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");

  const closeMenu = () => {
    if (!menu || !toggle) {
      return;
    }

    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menu || !toggle) {
      return;
    }

    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  toggle?.addEventListener("click", () => {
    const isOpen = menu?.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!menu || !toggle) {
      return;
    }

    if (
      menu.classList.contains("is-open") &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });

  const updateHeader = () => {
    header?.classList.toggle(
      "is-scrolled",
      window.scrollY > 12
    );
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );
})();

(() => {
  const yearElements =
    document.querySelectorAll("[data-current-year]");

  const currentYear =
    new Date().getFullYear().toString();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
  ) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  document
    .querySelectorAll("[data-current-page]")
    .forEach((link) => {
      const currentPath =
        window.location.pathname.replace(/\/index\.html$/, "/");

      const linkPath =
        new URL(link.href).pathname.replace(/\/index\.html$/, "/");

      if (currentPath === linkPath) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
})();

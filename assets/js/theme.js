(() => {
  const storageKey = "nivak-theme";
  const root = document.documentElement;

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(storageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const updateThemeButtons = (theme) => {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isDark = theme === "dark";

      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );

      button.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );

      const icon = button.querySelector("[data-theme-icon]");

      if (icon) {
        icon.textContent = isDark ? "☀" : "☾";
      }
    });
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
    updateThemeButtons(theme);
  };

  applyTheme(getPreferredTheme());

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-toggle]");

    if (!button) {
      return;
    }

    const nextTheme =
      root.dataset.theme === "dark"
        ? "light"
        : "dark";

    applyTheme(nextTheme);
  });
})();

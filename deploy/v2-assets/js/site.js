"use strict";

(() => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const themeToggle = document.querySelector(".theme-toggle");

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem("nivak-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const updateThemeButton = () => {
    if (!themeToggle) {
      return;
    }

    const dark = root.dataset.theme === "dark";

    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme"
    );

    themeToggle.textContent = dark ? "☀" : "☾";
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem("nivak-theme", theme);
    updateThemeButton();
  };

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  const updateHeader = () => {
    if (!header) {
      return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();

/* =========================================================
   Daily Featured Products
   ========================================================= */

(() => {
  const container = document.querySelector("#featured-products");

  if (!container || !Array.isArray(window.NIVAK_PRODUCTS)) {
    return;
  }

  const products = window.NIVAK_PRODUCTS;
  const statuses = window.NIVAK_PRODUCT_STATUS || {};

  if (products.length === 0) {
    return;
  }

  /*
   * Create a stable number from the local calendar date.
   * Everyone keeps the same selection throughout that day.
   */
  const now = new Date();

  const dateSeed = Number(
    `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate()
    ).padStart(2, "0")}`
  );

  /*
   * Deterministic seeded shuffle.
   * This changes the selection each day without random changes
   * every time the page refreshes.
   */
  const seededValue = (seed) => {
    const value = Math.sin(seed) * 10000;
    return value - Math.floor(value);
  };

  const dailyProducts = [...products];

  for (let index = dailyProducts.length - 1; index > 0; index -= 1) {
    const random = seededValue(dateSeed + index * 97);
    const target = Math.floor(random * (index + 1));

    [dailyProducts[index], dailyProducts[target]] = [
      dailyProducts[target],
      dailyProducts[index]
    ];
  }

  const featured = dailyProducts.slice(0, 3);

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  featured.forEach((product) => {
    const status = statuses[product.status] || {
      label: product.status,
      className: ""
    };

    const article = document.createElement("article");
    article.className = "card product-card";

    const action =
      product.status === "production" && product.playStore
        ? `<a class="text-link"
              href="${escapeHtml(product.playStore)}"
              target="_blank"
              rel="noopener noreferrer">
             View on Google Play <span aria-hidden="true">→</span>
           </a>`
        : `<a class="text-link" href="apps/">
             View product <span aria-hidden="true">→</span>
           </a>`;

    article.innerHTML = `
      <div class="card__body">

        <div class="product-card__top">

          <img
            class="product-card__icon"
            src="${escapeHtml(product.icon)}"
            alt="${escapeHtml(product.name)} app icon"
            loading="lazy"
          >

          <span class="badge ${escapeHtml(status.className)}">
            ${escapeHtml(status.label)}
          </span>

        </div>

        <div class="product-card__category">
          ${escapeHtml(product.type)}
        </div>

        <h3 class="product-card__title">
          ${escapeHtml(product.name)}
        </h3>

        <p class="product-card__description">
          ${escapeHtml(product.description)}
        </p>

        <div class="product-card__footer">
          ${action}
        </div>

      </div>
    `;

    container.appendChild(article);
  });
})();

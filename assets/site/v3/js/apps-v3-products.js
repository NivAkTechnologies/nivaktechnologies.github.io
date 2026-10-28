"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("apps-v3-products");
  const filters = Array.from(
    document.querySelectorAll(".apps-v3-filters [data-product-filter]")
  );

  const products = window.NIVAK_PRODUCTS || [];
  const statuses = window.NIVAK_PRODUCT_STATUS || {};

  if (!grid) return;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = String(text);
    return node;
  }

  function buildCard(product) {
    const card = element("article", "apps-v3-card");

    const top = element("div", "apps-v3-card__top");
    const icon = element("img", "apps-v3-card__icon");

    icon.src = product.icon;
    icon.alt = "";
    icon.loading = "lazy";

    const info = element("div");
    const title = element("h3", "apps-v3-card__name", product.name);

    const type = element(
      "div",
      "apps-v3-card__type",
      product.category || product.type || "Digital Product"
    );

    info.append(title, type);
    top.append(icon, info);

    const description = element(
      "p",
      "apps-v3-card__description",
      product.description || ""
    );

    const footer = element("div", "apps-v3-card__footer");

    const statusInfo = statuses[product.status] || {};
    const status = element(
      "span",
      "apps-v3-card__status",
      statusInfo.label ||
        (product.status === "production"
          ? "Available"
          : product.status === "nearly-complete"
            ? "Nearly Complete"
            : "In Development")
    );

    footer.appendChild(status);

    if (product.status === "production" && product.playStore) {
      const link = element(
        "a",
        "apps-v3-card__button",
        "Google Play"
      );
      link.href = product.playStore;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute(
        "aria-label",
        "View " + product.name + " on Google Play"
      );
      footer.appendChild(link);
    } else {
      const upcoming = element(
        "span",
        "apps-v3-card__upcoming",
        "Coming Soon"
      );
      footer.appendChild(upcoming);
    }

    card.append(top, description, footer);
    return card;
  }

  function render(filter) {
    const visible = filter === "all"
      ? products
      : products.filter(product => product.status === filter);

    grid.replaceChildren();

    if (visible.length === 0) {
      grid.appendChild(
        element("p", "apps-v3-empty", "No products in this category.")
      );
      return;
    }

    const fragment = document.createDocumentFragment();

    visible.forEach(product => {
      fragment.appendChild(buildCard(product));
    });

    grid.appendChild(fragment);
  }

  filters.forEach(button => {
    button.setAttribute("aria-pressed", String(
      button.dataset.productFilter === "all"
    ));

    button.addEventListener("click", function () {
      filters.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      render(button.dataset.productFilter);
    });
  });

  render("all");
});

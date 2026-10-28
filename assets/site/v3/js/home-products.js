"use strict";

(function () {
  const container = document.querySelector("#v3-featured-products");
  const products = window.NIVAK_PRODUCTS;
  const statuses = window.NIVAK_PRODUCT_STATUS || {};

  if (!container || !Array.isArray(products)) {
    return;
  }

  const eligible = products.filter(function (product) {
    return (
      product &&
      product.id &&
      product.name &&
      product.icon &&
      !/aero[\s_-]*empire/i.test(product.id + " " + product.name)
    );
  });

  if (eligible.length < 3) {
    container.textContent = "Product showcase unavailable.";
    return;
  }

  // Deterministic selection based on visitor-local date.
  const today = new Date();

  const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  let seed = 2166136261;

  for (const char of "nivak-v3-" + dateKey) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }

  seed >>>= 0;

  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  const shuffled = eligible.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selected = shuffled.slice(0, 3);

  selected.forEach(function (product) {
    const status = statuses[product.status] || {
      label: "In Development"
    };

    const card = document.createElement("article");
    card.className = "product-v3-card";

    const top = document.createElement("div");
    top.className = "product-v3-top";

    const icon = document.createElement("img");
    icon.className = "product-v3-icon";
    icon.src = product.icon;
    icon.alt = product.name;
    icon.loading = "lazy";

    const badge = document.createElement("span");
    badge.className = "product-v3-status";
    badge.dataset.status = product.status || "development";
    badge.textContent = status.label;

    top.append(icon, badge);

    const category = document.createElement("div");
    category.className = "product-v3-category";
    category.textContent = product.type || "Application";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description || "";

    const link = document.createElement("a");
    link.className = "product-v3-link";

    if (product.status === "production" && product.playStore) {
      link.href = product.playStore;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View on Google Play →";
    } else {
      link.href = "/apps/";
      link.textContent = "Explore Project →";
    }

    card.append(top, category, title, description, link);
    container.appendChild(card);
  });

  console.info(
    "NivAk V3 featured applications:",
    dateKey,
    selected.map(product => product.name)
  );
})();

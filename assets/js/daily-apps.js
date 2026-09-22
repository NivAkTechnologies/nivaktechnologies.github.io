(async function () {
  const target = document.querySelector("[data-daily-apps]");

  if (!target) {
    return;
  }

  try {
    const response = await fetch("apps/");

    if (!response.ok) {
      throw new Error("Could not load product catalogue.");
    }

    const html = await response.text();
    const documentCopy = new DOMParser().parseFromString(
      html,
      "text/html"
    );

    const sourceCards = Array.from(
      documentCopy.querySelectorAll("#apps .app-card")
    );

    if (sourceCards.length === 0) {
      return;
    }

    const products = sourceCards.map((card) => {
      const icon = card.querySelector(".app-symbol--image");
      const title = card.querySelector("h3");
      const status = card.querySelector(".status-badge");
      const description = card.querySelector("p");
      const link = card.querySelector(".text-link");

      return {
        icon: icon?.getAttribute("src") || "",
        title: title?.textContent.trim() || "",
        status: status?.textContent.trim() || "",
        description: description?.textContent.trim() || "",
        href: link?.getAttribute("href") || "apps/"
      };
    });

    const now = new Date();

    const dateSeed =
      now.getFullYear() * 10000 +
      (now.getMonth() + 1) * 100 +
      now.getDate();

    function seededRandom(seed) {
      let value = seed % 2147483647;

      if (value <= 0) {
        value += 2147483646;
      }

      return function () {
        value = value * 16807 % 2147483647;
        return (value - 1) / 2147483646;
      };
    }

    const random = seededRandom(dateSeed);
    const shuffled = [...products];

    for (let index = shuffled.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(
        random() * (index + 1)
      );

      [shuffled[index], shuffled[randomIndex]] =
        [shuffled[randomIndex], shuffled[index]];
    }

    const selected = shuffled.slice(
      0,
      Math.min(3, shuffled.length)
    );

    target.innerHTML = selected.map((product) => `
      <a class="daily-app-card" href="${product.href}">
        <div class="daily-app-card-top">
          <img
            class="daily-app-card-icon"
            src="${product.icon}"
            alt="${product.title} app icon"
          >

          <span class="daily-app-card-status">
            ${product.status}
          </span>
        </div>

        <h3>${product.title}</h3>

        <p>${product.description}</p>

        <span class="daily-app-card-link">
          Explore product
          <span aria-hidden="true">→</span>
        </span>
      </a>
    `).join("");

  } catch (error) {
    console.error(error);
  }
})();

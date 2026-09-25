import {
  initializeApp,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjFB4acVLJBCxIfiiDINB_Grn-RenNnJo",
  authDomain: "nivak-technologies-website.firebaseapp.com",
  projectId: "nivak-technologies-website",
  storageBucket: "nivak-technologies-website.firebasestorage.app",
  messagingSenderId: "715215788586",
  appId: "1:715215788586:web:6d904ee80912b667fdc153",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const form = document.getElementById("v2ContactForm");
const status = document.getElementById("contactStatus");
const submitButton = document.getElementById("contactSubmit");

const params = new URLSearchParams(window.location.search);
const selectedService = params.get("service")?.trim() ?? "";
const selectedOffer = params.get("offer")?.trim() ?? "";

const projectMode = Boolean(selectedService);
const offerMode = projectMode && Boolean(selectedOffer);

const value = (id) =>
  document.getElementById(id)?.value.trim() ?? "";

const showStatus = (message, isError = false) => {
  if (!status) {
    return;
  }

  status.textContent = message;
  status.style.color = isError
    ? "var(--color-danger, #b42318)"
    : "var(--color-success, #16794b)";
};

const setSubmitting = (submitting) => {
  if (!(submitButton instanceof HTMLButtonElement)) {
    return;
  }

  submitButton.disabled = submitting;

  if (submitting) {
    submitButton.textContent = "Sending...";
    return;
  }

  if (offerMode) {
    submitButton.textContent = "Send Offer Request";
  } else if (projectMode) {
    submitButton.textContent = "Send Project Request";
  } else {
    submitButton.textContent = "Send Message";
  }
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = value("contactName");
  const email = value("contactEmail");
  const generalSubject = value("contactSubject");
  const messageInput = value("contactMessage");

  if (!name || !email || !messageInput) {
    showStatus(
      "Please complete all required fields.",
      true,
    );
    return;
  }

  let appName = "General Enquiry";
  let topic = "General";
  let subject = generalSubject;
  let message = messageInput;

  if (projectMode) {
    const projectTitle = value("projectTitle");
    const targetPlatform = value("targetPlatform");
    const projectStage = value("projectStage");
    const preferredStart = value("preferredStart");

    if (
      !projectTitle ||
      !targetPlatform ||
      !projectStage ||
      !preferredStart
    ) {
      showStatus(
        "Please complete all required project details.",
        true,
      );
      return;
    }

    appName = "Service Request";
    topic = selectedService;
    subject = projectTitle;

    const details = [
      `Selected Service: ${selectedService}`,
    ];

    if (offerMode) {
      details.push(
        `Selected Offer: ${selectedService} - 10% OFF`,
        `Promo Code: ${selectedOffer}`,
      );
    }

    details.push(
      `Project Title: ${projectTitle}`,
      `Target Platform: ${targetPlatform}`,
      `Project Stage: ${projectStage}`,
      `Preferred Start: ${preferredStart}`,
      "",
      "Project Description:",
      messageInput,
    );

    message = details.join("\n");
  } else if (!generalSubject) {
    showStatus(
      "Please enter a subject.",
      true,
    );
    return;
  }

  if (messageInput.length < 10) {
    showStatus(
      projectMode
        ? "Please provide a more detailed project description."
        : "Please enter a more detailed message.",
      true,
    );
    return;
  }

  setSubmitting(true);

  showStatus(
    offerMode
      ? "Sending your offer request..."
      : projectMode
        ? "Sending your project request..."
        : "Sending your message...",
  );

  try {
    await addDoc(
      collection(database, "contact_messages"),
      {
        name,
        email,
        app: appName,
        topic,
        offer: offerMode ? selectedOffer : "",
        subject,
        message,
        createdAt: serverTimestamp(),
        status: "new",
        source: "website",
      },
    );

    form.reset();

    if (projectMode) {
      const serviceInput =
        document.getElementById("selectedService");

      if (serviceInput) {
        serviceInput.value = selectedService;
      }
    }

    if (offerMode) {
      const selectedOfferInput =
        document.getElementById("selectedOffer");

      const promoCodeInput =
        document.getElementById("promoCode");

      if (selectedOfferInput) {
        selectedOfferInput.value =
          `${selectedService} - 10% OFF`;
      }

      if (promoCodeInput) {
        promoCodeInput.value = selectedOffer;
      }

      showStatus(
        "Your offer request was sent successfully. We will review your project details and promotional code and get back to you.",
      );
    } else if (projectMode) {
      showStatus(
        "Your project request was sent successfully. We will review the details and get back to you.",
      );
    } else {
      showStatus(
        "Your message was sent successfully. We will review it as soon as possible.",
      );
    }
  } catch (error) {
    console.error("V2 contact submission failed:", error);

    showStatus(
      "Your message could not be sent. Please try again or contact us by email.",
      true,
    );
  } finally {
    setSubmitting(false);
  }
});

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
  apiKey: "AIzaSyDM52_dAWmORw3Z765PvmFA9JnJE6tkL90",
  authDomain: "resume-builder-nivak.firebaseapp.com",
  projectId: "resume-builder-nivak",
  storageBucket: "resume-builder-nivak.firebasestorage.app",
  messagingSenderId: "213872036572",
  appId: "1:213872036572:web:5a1c95cc86b74e94bcc219",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const form = document.getElementById("contact-email-form");

const getValue = (id) =>
  document.getElementById(id)?.value.trim() ?? "";

const showStatus = (message, isError = false) => {
  let status = document.getElementById("contact-form-status");

  if (!status) {
    status = document.createElement("p");
    status.id = "contact-form-status";
    status.setAttribute("role", "status");
    status.style.marginTop = "14px";
    status.style.fontWeight = "700";

    form?.appendChild(status);
  }

  status.textContent = message;
  status.style.color = isError
    ? "var(--color-danger, #b42318)"
    : "var(--color-success, #16794b)";
};

const setSubmitting = (submitting) => {
  const button = form?.querySelector('button[type="submit"]');

  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  button.disabled = submitting;
  button.textContent = submitting
    ? "Sending..."
    : "Send Message";
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = getValue("contact-name");
  const email = getValue("contact-email");
  const appName = getValue("contact-app");
  const topic = getValue("contact-topic");
  const subject = getValue("contact-subject");
  const message = getValue("contact-message");

  if (!name || !email || !message) {
    showStatus(
      "Please enter your name, email address and message.",
      true,
    );
    return;
  }

  if (message.length < 10) {
    showStatus(
      "Please enter a more detailed message.",
      true,
    );
    return;
  }

  setSubmitting(true);
  showStatus("Sending your message...");

  try {
    await addDoc(
      collection(database, "contact_messages"),
      {
        name,
        email,
        app: appName || "Resume Builder",
        topic: topic || "Support",
        subject,
        message,
        createdAt: serverTimestamp(),
        status: "new",
        source: "website",
      },
    );

    form.reset();

    showStatus(
      "Your message was sent successfully. We will review it as soon as possible.",
    );
  } catch (error) {
    console.error("Contact form submission failed:", error);

    showStatus(
      "Your message could not be sent. Please try again or use the email link.",
      true,
    );
  } finally {
    setSubmitting(false);
  }
});

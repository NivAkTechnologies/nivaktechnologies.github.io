document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");

  const enquirySelect = document.getElementById("contact-app");
  const topicSelect = document.getElementById("contact-topic");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");

  function resizeMessageBox() {
    if (!messageInput) return;

    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
    messageInput.style.overflowY = "hidden";
  }

  if (subjectInput) {
    subjectInput.value = "";
    subjectInput.placeholder = "Brief summary of your enquiry";
  }

  if (messageInput) {
    messageInput.value = "";
    messageInput.placeholder =
      "Tell us what you need, your project details, requirements, or any questions.";

    messageInput.addEventListener("input", resizeMessageBox);
  }

  if (service) {
    if (enquirySelect) {
      enquirySelect.value = "Service Enquiry";
    }

    if (topicSelect) {
      topicSelect.value = "General";
    }

    if (subjectInput) {
      subjectInput.placeholder =
        `${service} — brief summary of your enquiry`;
    }
  }

  resizeMessageBox();
});

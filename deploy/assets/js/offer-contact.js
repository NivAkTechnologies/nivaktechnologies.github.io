document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const offer = params.get("offer");

  const enquirySelect = document.getElementById("contact-app");
  const topicSelect = document.getElementById("contact-topic");
  const offerInput = document.getElementById("contact-offer");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");

  const offers = {
    NIVAK10: "Mobile App Development",
    FIX10: "Flutter Bug Fixing",
    ADMOB10: "AdMob Integration",
    FIREBASE10: "Firebase Integration",
    PLAY10: "Google Play Publishing Support"
  };

  const offerName =
    offer && offers[offer]
      ? offers[offer]
      : "NivAk Technologies promotional offer";

  if (enquirySelect) {
    enquirySelect.value = "Promotional Offer";
  }

  if (topicSelect) {
    topicSelect.value = "General";
  }

  if (offerInput) {
    offerInput.value =
      offer ? `${offerName} — ${offer}` : offerName;
  }

  if (subjectInput) {
    subjectInput.value = "";
    subjectInput.placeholder = "Brief summary of your enquiry";
  }

  if (messageInput) {
    messageInput.value = "";
    messageInput.placeholder =
      "Tell us about your app or project, what you need, and any important requirements.";

    const resize = () => {
      messageInput.style.height = "auto";
      messageInput.style.height = messageInput.scrollHeight + "px";
      messageInput.style.overflowY = "hidden";
    };

    messageInput.addEventListener("input", resize);
    resize();
  }
});

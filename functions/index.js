const {setGlobalOptions} = require("firebase-functions/v2");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {defineSecret} = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const {Resend} = require("resend");

setGlobalOptions({
  region: "europe-west1",
  maxInstances: 3,
});

const resendApiKey = defineSecret("RESEND_API_KEY");

exports.sendContactNotification = onDocumentCreated(
    {
      document: "contact_messages/{messageId}",
      secrets: [resendApiKey],
    },
    async (event) => {
      const snapshot = event.data;

      if (!snapshot) {
        logger.error("Contact document has no data.");
        return;
      }

      const data = snapshot.data();

      const name = String(data.name || "").trim();
      const email = String(data.email || "").trim();
      const app = String(data.app || "").trim();
      const topic = String(data.topic || "").trim();
      const offer = String(data.offer || "").trim();
      const subject = String(data.subject || "").trim();
      const message = String(data.message || "").trim();

      const supportTopics = [
        "Support",
        "Feedback",
        "Privacy",
        "Data Deletion",
      ];

      const isSupport =
        app === "App Support" ||
        app === "Service Request" ||
        supportTopics.includes(topic);

      const destination = isSupport ?
        "support@nivak-technologies.com" :
        "contact@nivak-technologies.com";

      const mailboxType = isSupport ? "Support" : "Company";

      const resend = new Resend(resendApiKey.value());

      const escapeHtml = (value) =>
        String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\"", "&quot;")
            .replaceAll("'", "&#039;");

      const html = `
        <h2>New NivAk Technologies Website Enquiry</h2>

        <p><strong>Mailbox:</strong> ${escapeHtml(mailboxType)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Type:</strong> ${escapeHtml(app)}</p>
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        ${
          offer ?
            `<p><strong>Offer:</strong> ${escapeHtml(offer)}</p>` :
            ""
}
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>

        <hr>

        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>

        <hr>

        <p>
          Sent automatically from the NivAk Technologies website contact form.
        </p>
      `;

      const emailOptions = {
        from: "NivAk Technologies Website <website@nivak-technologies.com>",
        to: [destination],
        subject: `[Website ${mailboxType}] ${subject || app || "New enquiry"}`,
        html,
      };

      if (email) {
        emailOptions.replyTo = email;
      }

      const {data: result, error} = await resend.emails.send(emailOptions);

      if (error) {
        logger.error("Resend failed to send contact notification.", {
          error,
          messageId: event.params.messageId,
          destination,
        });
        throw new Error("Failed to send contact notification.");
      }

      logger.info("Contact notification sent.", {
        messageId: event.params.messageId,
        destination,
        resendId: result && result.id,
      });
    },
);


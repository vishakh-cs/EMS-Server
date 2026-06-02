import { BrevoClient } from "@getbrevo/brevo";

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ BREVO_API_KEY is missing. Skipping email.");
    return null;
  }

  const client = new BrevoClient({ apiKey });

  try {
    const response = await client.transactionalEmails.sendTransacEmail({
      subject,
      to: [{ email: to }],
      sender: {
        email: process.env.SMTP_FROM || "wizmailer07@gmail.com",
        name: "WizMailer",
      },
      textContent: text,
      htmlContent: html,
    });
    console.log("✅ Email sent via Brevo API:", response.messageId);
    return response;
  } catch (error: any) {
    console.error("❌ Brevo API email failed:", {
      message: error.message,
      status: error.status,
      body: error.response?.body || error.body,
    });
  }
};
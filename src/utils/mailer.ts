import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } from "../config";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST || "smtp.ethereal.email",
  port: SMTP_PORT || 587,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER ? {
    user: SMTP_USER,
    pass: SMTP_PASS,
  } : undefined,
});

export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
  if (!SMTP_HOST && !SMTP_USER) {
    console.warn("SMTP configuration is missing. Skipping email sending.");
    return null;
  }

  try {
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't throw to avoid breaking the organization creation flow, or we could throw if email is critical.
    // For now, logging the error should be sufficient.
  }
};

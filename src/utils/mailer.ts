import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } from "../config";

console.log("📧 SMTP Config:", {
  host: SMTP_HOST,
  port: SMTP_PORT,
  user: SMTP_USER,
  from: SMTP_FROM,
  passProvided: !!SMTP_PASS,
  passLength: SMTP_PASS?.length,
});

const transporter = nodemailer.createTransport({
  host: SMTP_HOST || "smtp.gmail.com",
  port: SMTP_PORT || 587,
  secure: false,
  auth: SMTP_USER ? {
    user: SMTP_USER,
    pass: SMTP_PASS,
  } : undefined,
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Verify connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", {
      message: error.message,
      code: (error as any).code,
      command: (error as any).command,
      response: (error as any).response,
      responseCode: (error as any).responseCode,
    });
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
  console.log("📤 Attempting to send email to:", to);

  if (!SMTP_HOST && !SMTP_USER) {
    console.warn("⚠️ SMTP configuration is missing. Skipping email sending.");
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
    console.log("✅ Message sent:", info.messageId);
    console.log("📬 Preview URL:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error: any) {
    console.error("❌ Email sending failed:", {
      message: error.message,
      code: error.code,           // e.g. ECONNREFUSED, EAUTH
      command: error.command,     // e.g. AUTH, EHLO
      response: error.response,   // Gmail's exact error response
      responseCode: error.responseCode, // e.g. 535 = wrong password
      stack: error.stack,
    });
  }
};
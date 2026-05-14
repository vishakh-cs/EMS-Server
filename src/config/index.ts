import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT || process.env.server_port || 3000;
const MONGODB_URI = process.env.MONGODB_URI?.trim();
const JWT_SECRET = process.env.JWT_SECRET?.trim();
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN?.trim();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET?.trim();
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN?.trim();

const SMTP_HOST = process.env.SMTP_HOST?.trim();
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
const SMTP_USER = process.env.SMTP_USER?.trim();
const SMTP_PASS = process.env.SMTP_PASS?.trim();
const SMTP_FROM = process.env.SMTP_FROM?.trim() || "no-reply@ecom.com";

export { 
  PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN,
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
};

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT || process.env.server_port || 3000;
const MONGODB_URI = process.env.MONGODB_URI?.trim();
const JWT_SECRET = process.env.JWT_SECRET?.trim();
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN?.trim();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET?.trim();
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN?.trim();

export { PORT, MONGODB_URI,JWT_SECRET,JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN };

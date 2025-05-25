import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI ?? "mongodb://mongo:27017/myapp";
export const PORT = process.env.PORT ?? 8000;
export const NODE_ENV = process.env.NODE_ENV ?? "dev";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "Secreta";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "Secret";
export const NODEMAILER_PASSKEY = process.env.NODEMAILER_PASSKEY ?? "alsdf";
export const SENDER_EMAIL = process.env.SENDER_EMAIL ?? "alsdfk";
export const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";

// Company Name for Email Sending
export const COMPANY_NAME = "Mern stack template project";
export const COMPANY_DOMAIN = "dev.com";
export const OTP_EXPIRATION_MINUTES = 15;

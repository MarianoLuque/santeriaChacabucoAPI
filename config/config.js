const { config } = require("dotenv");

config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PUBLIC_URL = process.env.PUBLIC_URL;
const TOKEN_ACCESS = process.env.TOKEN_ACCESS;
const EMAIL_CONTACTO = process.env.EMAIL_CONTACTO;
const CONTRA_EMAIL_CONTACTO = process.env.CONTRA_EMAIL_CONTACTO;
const EMAIL_SANTERIA = process.env.EMAIL_SANTERIA;

module.exports = {
  PORT,
  DB_URI,
  JWT_SECRET,
  PUBLIC_URL,
  TOKEN_ACCESS,
  EMAIL_CONTACTO,
  CONTRA_EMAIL_CONTACTO,
  EMAIL_SANTERIA
};

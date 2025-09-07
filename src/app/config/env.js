import dotenv from "dotenv"

dotenv.config()

export const envVars = {
  port: process.env.PORT || 5000,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  paymentSecretKey: process.env.PAYMENT_SECRET_KEY,
};

// module.exports = config;
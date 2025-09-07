import jwt from "jsonwebtoken"
import { envVars } from "../config/env.js";
import { client } from "../config/database.js";

export const generateToken = (user) => {
  return jwt.sign(user, envVars.accessTokenKey, { expiresIn: "5h" });
};
export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, envVars.accessTokenKey, function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.decoded = decoded;
    next();
  });
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const usersCollection = client.db("medicineSelling").collection("users");
    const query = { email: req.decoded.email };
    const result = await usersCollection.findOne(query);

    const role = result?.role;
    if (role !== "admin") {
      return res.status(401).send({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const verifySeller = async (req, res, next) => {
  try {
    const usersCollection = client.db("medicineSelling").collection("users");
    const query = { email: req.decoded.email };
    const result = await usersCollection.findOne(query);

    const role = result?.role;
    if (role !== "seller") {
      return res.status(401).send({ message: "Seller access required" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};


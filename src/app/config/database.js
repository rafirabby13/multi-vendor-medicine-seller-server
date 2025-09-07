import { MongoClient, ServerApiVersion } from "mongodb";
import { envVars } from "./env.js";


export const client = new MongoClient(envVars.uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
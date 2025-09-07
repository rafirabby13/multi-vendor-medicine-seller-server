import { MongoClient, ServerApiVersion } from "mongodb";
import { envVars } from "./env.js";

const uri = `mongodb+srv://${envVars.dbUser}:${envVars.dbPass}@cluster0.bbiovs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
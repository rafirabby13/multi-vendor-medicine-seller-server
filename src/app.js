import express from "express";
import cors from "cors";  // ✅ must include extension
import { router } from "./app/routes/index.js";
// import { router } from "./app/routes.js";
// import router from "./app/routes/index.js";

 const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", router);

// Root route
app.get("/", (req, res) => {
  res.send("Medicine vendor selling medicines...haha");
});
export default app; // ✅ export for serverless



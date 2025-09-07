
import { client } from "./app/config/database.js";
async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");

    // Start server
    // app.listen(envVars.port, () => {
    //   console.log(`🚀 Server running on port ${envVars.port}`);
    // });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  // process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("🔄 SIGTERM received, shutting down gracefully");
  await client.close();
  // process.exit(0);
});

await run();

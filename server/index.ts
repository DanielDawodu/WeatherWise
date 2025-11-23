import dotenv from "dotenv";
dotenv.config(); // loads variables from .env

import { app, setupErrorHandling } from "./app";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";

(async () => {
  const server = await registerRoutes(app);

  setupErrorHandling(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const PORT = process.env.PORT || 5500;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
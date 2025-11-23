import { app, setupErrorHandling } from "../server/app";
import { registerRoutes } from "../server/routes";

// Register routes
// Note: registerRoutes is async but we don't await it here because
// 1. It doesn't actually await anything inside (it just registers routes synchronously)
// 2. Vercel requires a synchronous export or a promise that resolves to the app, 
//    but we want to export the app instance directly which has routes attached.
registerRoutes(app);

setupErrorHandling(app);

export default app;

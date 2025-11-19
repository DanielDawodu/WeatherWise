import type { Express } from "express"; 
import { createServer, type Server } from "http";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather API proxy endpoint
  // This proxies requests to OpenWeather API to keep the API key secure on the server
  app.get("/api/weather", async (req, res) => {
    try {
      const { city } = req.query;

      if (!city || typeof city !== "string") {
        return res.status(400).json({ 
          message: "City parameter is required" 
        });
      }

      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          message: "Weather API key not configured" 
        });
      }

      // Fetch weather data from OpenWeather API
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: apiKey
          }
        }
      );

      // Return the weather data to the client
      return res.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Failed to fetch weather data";
        return res.status(status).json({ message });
      }

      return res.status(500).json({ 
        message: "An unexpected error occurred" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

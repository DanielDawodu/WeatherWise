// api/weather.ts
// Removed dependency on @vercel/node types (not installed)
import axios from 'axios';

// Next.js API route that proxies requests to OpenWeather (keeps API key on server)
export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const { city } = req.query;
      if (!city || typeof city !== 'string') {
        return res.status(400).json({ error: 'City is required' });
      }

      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Weather API key not configured' });
      }

      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: city, appid: apiKey }
      });

      return res.status(200).json(response.data);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status || 500;
      const message = err.response?.data?.message || err.message || 'Failed to fetch weather data';
      return res.status(status).json({ error: message });
    }

    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}

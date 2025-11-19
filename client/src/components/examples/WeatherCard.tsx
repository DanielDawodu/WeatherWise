import WeatherCard from '../WeatherCard';
import type { WeatherData } from '@/types/WeatherTypes';

const mockWeatherData: WeatherData = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 293.15,
    feels_like: 292.5,
    temp_min: 291.15,
    temp_max: 295.15,
    pressure: 1013,
    humidity: 65
  },
  visibility: 10000,
  wind: {
    speed: 4.5,
    deg: 250
  },
  clouds: {
    all: 0
  },
  dt: 1633024800,
  sys: {
    type: 2,
    id: 2019646,
    country: 'GB',
    sunrise: 1632981234,
    sunset: 1633023456
  },
  timezone: 3600,
  id: 2643743,
  name: 'London',
  cod: 200
};

export default function WeatherCardExample() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500">
      <WeatherCard weather={mockWeatherData} />
    </div>
  );
}

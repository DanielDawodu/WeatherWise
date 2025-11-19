import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';
import { Wind, Droplets } from 'lucide-react';
import type { WeatherData, WeatherCondition } from '@/types/WeatherTypes';

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const iconProps = { className: "w-32 h-32 md:w-40 md:h-40" };
  
  switch (condition) {
    case 'Clear':
      return <WiDaySunny {...iconProps} />;
    case 'Clouds':
      return <WiCloudy {...iconProps} />;
    case 'Rain':
    case 'Drizzle':
      return <WiRain {...iconProps} />;
    case 'Thunderstorm':
      return <WiThunderstorm {...iconProps} />;
    case 'Snow':
      return <WiSnow {...iconProps} />;
    case 'Mist':
    case 'Fog':
    case 'Haze':
      return <WiFog {...iconProps} />;
    default:
      return <WiDaySunny {...iconProps} />;
  }
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  const tempCelsius = Math.round(weather.main.temp - 273.15);
  const condition = weather.weather[0].main as WeatherCondition;
  const description = weather.weather[0].description;

  return (
    <div 
      className="w-full max-w-2xl mx-auto rounded-3xl p-8 md:p-12 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl"
      data-testid="card-weather"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="text-white" data-testid="icon-weather">
          {getWeatherIcon(condition)}
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-city-name">
            {weather.name}, {weather.sys.country}
          </h1>
          
          <p className="text-6xl md:text-7xl font-extrabold text-white" data-testid="text-temperature">
            {tempCelsius}°C
          </p>
          
          <p className="text-xl md:text-2xl font-medium text-white/90 capitalize" data-testid="text-weather-condition">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full mt-8">
          <div className="rounded-2xl p-6 backdrop-blur-sm bg-white/5 flex flex-col items-center" data-testid="card-humidity">
            <Droplets className="w-8 h-8 text-white mb-2" />
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Humidity</p>
            <p className="text-2xl md:text-3xl font-semibold text-white mt-1" data-testid="text-humidity">
              {weather.main.humidity}%
            </p>
          </div>

          <div className="rounded-2xl p-6 backdrop-blur-sm bg-white/5 flex flex-col items-center" data-testid="card-wind-speed">
            <Wind className="w-8 h-8 text-white mb-2" />
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Wind Speed</p>
            <p className="text-2xl md:text-3xl font-semibold text-white mt-1" data-testid="text-wind-speed">
              {Math.round(weather.wind.speed * 3.6)} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
